import React, { useState, useEffect } from "react";
import { onValue, push, ref, remove, update, get } from "firebase/database";
import { useInView } from "react-intersection-observer";
import "./adminPanel.css";
import { database } from "./firebase";

const AdminPanel = ({ isHeader, setIfUnRead, setUnReadCountChats }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [editMessageId, setEditMessageId] = useState(null);
  const [unreadCount, setUnreadCount] = useState({});
  const [lastMessageTimestamps, setLastMessageTimestamps] = useState({});
  const [initialLoad, setInitialLoad] = useState(true);
  // Effect to fetch chats and initialize unread counts
  useEffect(() => {
    const chatRef = ref(database, `chats`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      const newData = data
        ? Object.keys(data)
            .map((key) => {
              const chat = {
                id: key,
                name: null,
                unread: unreadCount[key] || 0,
              };
              if (data[key]?.messages) {
                const firstMessage = Object.values(data[key].messages)[0];
                chat.name = firstMessage.displayName;
              }
              return chat;
            })
            .filter((chat) => chat.name !== null)
        : [];

      setChats(newData);
    });

    return () => unsubscribe();
  }, [unreadCount]);

  // Effect to fetch messages for the selected chat
  useEffect(() => {
    if (selectedChatId) {
      const chatMessagesRef = ref(database, `chats/${selectedChatId}/messages`);

      const unsubscribe = onValue(chatMessagesRef, (snapshot) => {
        const data = snapshot.val();
        const newMessages = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }))
          : [];

        setMessages(newMessages);
      });

      return () => unsubscribe();
    }
  }, [selectedChatId]);

  // Effect to mark selected chat's messages as read when chat is selected
  useEffect(() => {
    if (selectedChatId && unreadCount[selectedChatId] !== undefined) {
      setUnreadCount((prev) => ({
        ...prev,
        [selectedChatId]: 0,
      }));
    }
  }, [selectedChatId]);

  // Effect to update unread message counts for all chats and play notification sound for new messages
  useEffect(() => {
    const chatRef = ref(database, `chats`);

    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        Object.keys(data).forEach((chatId) => {
          const chat = data[chatId];
          const messages = chat.messages ? Object.values(chat.messages) : [];

          let unreadMessages = 0;
          messages.forEach((msg) => {
            if (!msg.adminRead && msg.from !== "Admin") {
              unreadMessages++;
            }
          });

          // Check for new messages and play sound if there are any
          const lastTimestamp = lastMessageTimestamps[chatId] || 0;
          const latestMessage = messages[messages.length - 1];
          if (
            latestMessage &&
            new Date(latestMessage.createdAt).getTime() > lastTimestamp &&
            latestMessage?.from !== "Admin"
          ) {
            if (!initialLoad) {
              playNotificationSound();
            }
            setLastMessageTimestamps((prev) => ({
              ...prev,
              [chatId]: new Date(latestMessage.createdAt).getTime(),
            }));
          }

          setUnreadCount((prev) => ({
            ...prev,
            [chatId]: unreadMessages,
          }));
        });
        setInitialLoad(false); // Mark the initial load as complete
      }
    });

    return () => unsubscribe();
  }, [lastMessageTimestamps, initialLoad]);
  useEffect(() => {
    if (unreadCount) {
      try {
        if (setIfUnRead)
          setIfUnRead(
            Object.keys(unreadCount)
              ?.map((item) => item)
              ?.reduce((acc, cur) => unreadCount[cur] + acc, 0)
          );
        if (setUnReadCountChats)
          setUnReadCountChats(
            Object.keys(unreadCount)
              ?.map((item) => item)
              ?.filter((item) => unreadCount[item] > 0)?.length
          );
      } catch (e) {
        console.error(e);
      }
    }
  }, [unreadCount]);
  // Function to play notification sound
  const playNotificationSound = () => {
    const audioElement = document.getElementById("messageSound");
    if (audioElement) {
      audioElement.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  };

  // Function to mark a message as read by admin
  const markMessageAsAdminRead = async (messageId) => {
    try {
      const messageRef = ref(
        database,
        `chats/${selectedChatId}/messages/${messageId}`
      );
      await update(messageRef, { adminRead: true });
    } catch (error) {
      console.error("Error marking message as admin read:", error);
    }
  };

  // Function to mark multiple messages as read by admin
  const markMessagesAsRead = async (messages) => {
    if (!selectedChatId) return; // Exit early if no chat is selected

    const updates = {};
    messages.forEach((msg) => {
      if (!msg.adminRead && msg.from !== "Admin") {
        updates[`chats/${selectedChatId}/messages/${msg.id}/read`] = true;
      }
    });
    try {
      await update(ref(database), updates);
    } catch (error) {
      console.error("Error marking messages as read:", error);
    }
  };

  // Function to handle click on a chat item
  const handleClickChat = async (chatId) => {
    setSelectedChatId(chatId);
    setUnreadCount((prev) => ({
      ...prev,
      [chatId]: 0,
    }));

    try {
      const chatMessagesRef = ref(database, `chats/${chatId}/messages`);
      const snapshot = await get(chatMessagesRef);
      const newMessages = snapshot.val()
        ? Object.keys(snapshot.val()).map((key) => ({
            id: key,
            ...snapshot.val()[key],
          }))
        : [];
      setMessages(newMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      setMessages([]);
    }
  };

  // Function to handle sending or editing a message
  const handleSend = async () => {
    if (!selectedChatId || newMessage.trim() === "") return; // Exit early if no chat is selected or message is empty

    try {
      if (editMessageId) {
        const messageRef = ref(
          database,
          `chats/${selectedChatId}/messages/${editMessageId}`
        );
        await update(messageRef, {
          text: newMessage,
          editedAt: new Date().toISOString(),
        });
        setEditMessageId(null);
      } else {
        const messagesRef = ref(database, `chats/${selectedChatId}/messages`);
        await push(messagesRef, {
          text: newMessage,
          createdAt: new Date().toISOString(),
          from: "Admin",
          displayName: "Admin",
          read: false,
          adminRead: true,
        });
      }
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to handle deleting a message
  const handleDelete = async (chatId, messageId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) {
      return;
    }

    try {
      const messageRef = ref(database, `chats/${chatId}/messages/${messageId}`);
      await remove(messageRef);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Function to handle editing a message
  const handleEdit = (msg) => {
    setNewMessage(msg.text);
    setEditMessageId(msg.id);
  };

  // Function to cancel editing a message
  const handleCancelEdit = () => {
    setNewMessage("");
    setEditMessageId(null);
  };

  return (
    <div className={isHeader ? "admin-container hidden" : "admin-container"}>
      <audio id="messageSound" src={require("./message.mp3")}>
        Your browser does not support the audio tag.
      </audio>
      <div className="chats-list">
        {chats.length > 0 &&
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${
                chat.id === selectedChatId ? "selected" : ""
              }`}
              onClick={() => handleClickChat(chat.id)}
            >
              {chat.name}
              {chat.unread > 0 && (
                <span className="unread-count">{chat.unread}</span>
              )}
            </div>
          ))}
      </div>
      <div className="columnDiv">
        <div className="chat-messages">
          {messages.length > 0 &&
            messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                msg={msg}
                markMessageAsAdminRead={markMessageAsAdminRead}
                selectedChatId={selectedChatId}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="chat-input"
          />
          <button onClick={handleSend} className="chat-send-button">
            {editMessageId ? (
              <>&#9998;</>
            ) : (
              <i className="fa fa-paper-plane"></i>
            )}
          </button>
          {editMessageId && (
            <button onClick={handleCancelEdit} className="chat-cancel-button">
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({
  msg,
  markMessageAsAdminRead,
  selectedChatId,
  handleEdit,
  handleDelete,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView && !msg.adminRead) {
      markMessageAsAdminRead(msg.id);
    }
  }, [inView, msg.adminRead, msg.id, markMessageAsAdminRead]);

  return (
    <div
      ref={ref}
      className={`chat-message ${msg.from === "Admin" ? "own" : "other"} ${
        msg.adminRead ? "read" : "unread"
      }`}
    >
      <strong>{msg.displayName}</strong>
      <span>{new Date(msg.createdAt).toLocaleString()}</span>
      {msg.text}
      {msg.read && <span className="seen">Seen</span>}
      {msg.from === "Admin" && (
        <div className="message-actions">
          <button className="edit-button" onClick={() => handleEdit(msg)}>
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(selectedChatId, msg.id)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
