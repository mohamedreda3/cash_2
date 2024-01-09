import axios from 'axios';
import ImageViewer from 'react-simple-image-viewer';
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import Skeleton from 'react-loading-skeleton'
import './userdata.css'
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
const UserData = () => {
  const navigate=useNavigate();
  const location=useLocation();
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  console.log(location.state)
  const [userData,setUserData]=useState({});
  const [pageLoading,setPageLoading]=useState(true);
  const getUserData=()=>{
    // const data_send={
    //   user_id:location?.state?.userData?.user_id
    // }
    // console.log(data_send)
    // axios.post("https://ahmed-cash.com/ahmed_cash/user/select_user_info.php",JSON.stringify(data_send))
    // .then((res)=>{
    //   console.log(res.data.message);
    //   setUserData(res.data.message)
    // }).catch(e=>console.log(e))
    // .finally(()=>{
    //   setPageLoading(false)
    // })
    setUserData(location?.state?.userData)
  }
  const openImageViewer = useCallback((index) => {
    // console.log(index)
    setCurrentImage(index);
    console.log(index)
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(()=>{
    getUserData()
  },[]);
  if(location?.state?.UserData){
    navigate(-1)
  }
  return (
    <div className='user_data_page'>
      <div className="user_data_comp">
        <div style={{display:'flex',justifyContent:'center'}}>
            <div style={{cursor:'pointer'}} onClick={()=>{
            openImageViewer(0);
          }} >
              <TransformWrapper>
      <TransformComponent>
        <img style={{ width:'200px',height:'100px',margin:'auto',display:'block' }} src={userData.confirm_identity_front} alt="test" />
      </TransformComponent>
    </TransformWrapper>
          </div>
        </div>
        <>
          <div>
            <h4>إسم الشخص: </h4>
            <p>{userData.full_name}</p>
          </div>
          <div>
            <h4>البريد الإلكترونى: </h4>
            <p>{userData.email}</p>
          </div>
          <div>
            <h4>تاريخ الإنضمام: </h4>
            <p>{userData.join_date}</p>
          </div>
          <div>
            <h4>رقم الهاتف: </h4>
            <p>{userData.phone}</p>
          </div>
          <div>
            <h4>الرقم القومى: </h4>
            <p>{userData.n_id}</p>
          </div>
        </>
      </div>
      {isViewerOpen && (
        <ImageViewer
          src={[userData.confirm_identity_front]}
          currentIndex={ currentImage }
          disableScroll={ false }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
        />
      )}
    </div>
  )
}

export default UserData
