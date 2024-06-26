import React, { useEffect } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import Heart from '../../assets/images/red-heart-icon.svg'
import Profile from '../../assets/images/sampleProfile.webp'
import { FaThumbsUp } from "react-icons/fa";

const LikeCommentModal = ({ likeData, setModalActive, commentData,modalActive }) => {
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

    return (
        <div className="fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-noti z-[9999]">
            <div className={` flex flex-col h-[500px] w-[500px] overflow-y-auto bg-white sm:p-5 xsm:p-4 mx-2 relative shadow rounded-xl`}>
                <p className="text-black font-semibold text-[23px] text-center">
                    {
                        likeData && likeData?.length > 0 ? 'Posts Likes' : 'Posts Comments'
                    }
                </p>
                <AiOutlineClose
                    onClick={() => setModalActive(false)}
                    className="fixed right-[430px] p-2 top-[80px] text-black z-50 cursor-pointer sm:text-[40px] xsm:text-[30px]"
                />

                {/* ------Likes------- */}
                <>
                    {
                        likeData && likeData?.map((item) => {
                            return (
                                <div className='flex w-full my-1 items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <img src={item?.profile} className='w-10 h-10 rounded-full' alt="" />
                                        <p className='font-medium'>{item?.name}</p>
                                    </div>
                                    {/* <img className='w-[20px] h-[20px]' src={Heart} alt="" /> */}
                                    <FaThumbsUp color='blue' size={18}/>
                                </div>
                            )
                        })
                    }

                    {/* ------Comments------- */}
                    {commentData && commentData?.map((item) => {
                        return (
                            <div className='w-full items-start'>
                                <div className='flex items-center gap-3 my-2'>
                                    <img src={item?.profile} className='w-10 h-10 rounded-full' alt="" />
                                    <p className='font-medium'>{item?.name}</p>
                                </div>
                                <p className='bg-[#f3f3f3] p-2 w-full h-fit rounded-lg'>{item?.comments}</p>
                            </div>
                        )
                    })}

                </>
            </div>
        </div>
    )
}

export default LikeCommentModal