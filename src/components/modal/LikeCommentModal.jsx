import React, { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FaThumbsUp } from "react-icons/fa";
import useSWR from 'swr';
import { BASE_URL } from '../../app/constants';
import Loader from '../loader';

const LikeCommentModal = ({ setModalActive, modalActive }) => {
  useEffect(() => {
    // Disable scrolling on the body element when the modal is active
    if (modalActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Clean up function to restore scrolling when component unmounts or modal is closed
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalActive]); // Ensure this effect runs when modalActive changes

  const { likeId, commentId } = modalActive
  // ------ GET ALL LIKES --------

  const adminData = JSON.parse(localStorage.getItem('admin_user'))
  const token = adminData?.token
  const fetcherWithToken = async (url, ...args) => {
    const response = await fetch(url, {
      ...args,
      headers: {
        ...args.headers,
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  };

  const { data, isLoading } = useSWR([`${BASE_URL}admin/getPostLikeDetails/${likeId}`], fetcherWithToken);
  const { data: commentDatas, isLoading: commentLoading } = useSWR([`${BASE_URL}admin/getPostCommentsDetails/${commentId}`], fetcherWithToken);
  const likeDatas = data?.data?.likes
  const cData = commentDatas?.data?.comments


  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  }
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-noti z-[9999]">
      <div className="relative flex flex-col h-[500px] w-[500px] bg-white mx-2 shadow rounded-xl">
        <div className="sticky top-0 bg-white p-4 shadow z-50 flex justify-between items-center">
          <p className="text-black text-center font-semibold text-[23px]">
            {likeId ? 'Posts Likes' : 'Posts Comments'}
          </p>
          <AiOutlineClose
            onClick={() => setModalActive(false)}
            className="text-black cursor-pointer sm:text-[30px] xsm:text-[30px]"
          />
        </div>
        <div className="flex flex-col h-full overflow-y-auto sm:p-5 xsm:p-4">
          {/* ------Likes------- */}
          {likeId && (
            <>
              {isLoading ? (
                <Loader loaderStyle={loaderStyle} />
              ) : likeDatas?.length > 0 ? (
                likeDatas?.map((item) => (
                  <div key={item?.id} className="flex w-full my-1 items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={item?.user?.profile}
                        className="w-10 h-10 rounded-full"
                        alt=""
                      />
                      <p className="font-medium">{item?.user?.fullname}</p>
                    </div>
                    <FaThumbsUp color="blue" size={18} />
                  </div>
                ))
              ) : (
                <p className="text-[18px]">No Likes To Show</p>
              )}
            </>
          )}

          {/* ------Comments------- */}
          {commentId && (
            <>
              {commentLoading ? (
                <Loader loaderStyle={loaderStyle} />
              ) : cData?.length > 0 ? (
                cData?.map((item) => (
                  <div key={item?.id} className="w-full items-start">
                    <div className="flex items-center gap-3 my-2">
                      <img
                        src={item?.user?.profile}
                        className="w-10 h-10 rounded-full"
                        alt=""
                      />
                      <p className="font-medium">{item?.user?.fullname}</p>
                    </div>
                    <p className="bg-[#f3f3f3] p-2 w-full h-fit rounded-lg">
                      {item?.comment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-[18px]">No Comments To Show</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default LikeCommentModal