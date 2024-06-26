import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ImageGallery from "react-image-gallery";
import Gimage1 from '../../assets/images/image-gallery-2.jpg'
import Gimage2 from '../../assets/images/image-gallery-3.jpg'
import Gimage3 from '../../assets/images/image-gallery-5.jpg'
import Gimage4 from '../../assets/images/image-gallery-4.jpg'
import Card from '../../assets/images/groupCardImg1.png'
import Profile from '../../assets/images/sampleProfile.webp'
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import './style.css';
import LikeCommentModal from '../../components/modal/LikeCommentModal';
// # IMAGE GALLERY CSS
// import "~react-image-gallery/styles/css/image-gallery.css";
const GroupDetails = () => {
    const PostData = [
        {
            id: 1,
            image: Card,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likes: 32,
            comments: 41
        },
        {
            id: 2,
            image: Card,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likes: 52,
            comments: 39
        },
        {
            id: 3,
            image: Card,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likes: 62,
            comments: 10
        },
        {
            id: 4,
            image: Card,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likes: 52,
            comments: 53
        },
        {
            id: 5,
            image: Card,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likes: 88,
            comments: 91
        },
        {
            id: 6,
            image: Card,
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likes: 72,
            comments: 41
        },
    ]
    const likeData = [
        {
            id: 1,
            profile: Profile,
            name: "Lilly Colins"
        },
        {
            id: 2,
            profile: Profile,
            name: "Alexendra Dadario"
        },
        {
            id: 3,
            profile: Profile,
            name: "Madam De Mauban"
        }
    ]
    const commentData = [
        {
            id: 1,
            profile: Profile,
            name: "Lilly Colins",
            comments: "Today and every day you are enough. Today and every day you are enough. Today and every day you are enough."
        },
        {
            id: 2,
            profile: Profile,
            name: "Alexendra Dadario",
            comments: "So many things become beautiful when you really look’"
        },
        {
            id: 3,
            profile: Profile,
            name: "Madam De Mauban",
            comments: "Success is a series of small wins"
        },
        {
            id: 1,
            profile: Profile,
            name: "Lilly Colins",
            comments: "Today and every day you are enough."
        },
        {
            id: 2,
            profile: Profile,
            name: "Alexendra Dadario",
            comments: "So many things become beautiful when you really look’"
        },
        {
            id: 3,
            profile: Profile,
            name: "Madam De Mauban",
            comments: "Success is a series of small wins"
        },
        {
            id: 1,
            profile: Profile,
            name: "Lilly Colins",
            comments: "Today and every day you are enough."
        },
        {
            id: 2,
            profile: Profile,
            name: "Alexendra Dadario",
            comments: "So many things become beautiful when you really look’"
        },
        {
            id: 3,
            profile: Profile,
            name: "Madam De Mauban",
            comments: "Success is a series of small wins"
        },
        {
            id: 1,
            profile: Profile,
            name: "Lilly Colins",
            comments: "Today and every day you are enough."
        },
        {
            id: 2,
            profile: Profile,
            name: "Alexendra Dadario",
            comments: "So many things become beautiful when you really look’"
        },
        {
            id: 3,
            profile: Profile,
            name: "Madam De Mauban",
            comments: "Success is a series of small wins"
        },
        {
            id: 1,
            profile: Profile,
            name: "Lilly Colins",
            comments: "Today and every day you are enough."
        },
        {
            id: 2,
            profile: Profile,
            name: "Alexendra Dadario",
            comments: "So many things become beautiful when you really look’"
        },
        {
            id: 3,
            profile: Profile,
            name: "Madam De Mauban",
            comments: "Success is a series of small wins"
        },
        {
            id: 1,
            profile: Profile,
            name: "Lilly Colins",
            comments: "Today and every day you are enough."
        },
        {
            id: 2,
            profile: Profile,
            name: "Alexendra Dadario",
            comments: "So many things become beautiful when you really look’"
        },
        {
            id: 3,
            profile: Profile,
            name: "Madam De Mauban",
            comments: "Success is a series of small wins"
        },
    ]
    const [modalActive, setModalActive] = useState({
        likes: false,
        comments: false
    })

    //  --- NEW PAGE ALWAYS RENDER FROM TOP(1st Section) ------
    useEffect(() => {
        window.scroll(0, 0);
    }, []);


    // ------ Gallery Images Data -------
    // const images = [
    //     {
    //         original: "https://picsum.photos/id/1018/1000/600/",
    //         thumbnail: "https://picsum.photos/id/1018/250/150/",
    //     },
    //     {
    //         original: "https://picsum.photos/id/1015/1000/600/",
    //         thumbnail: "https://picsum.photos/id/1015/250/150/",
    //     },
    //     {
    //         original: "https://picsum.photos/id/1019/1000/600/",
    //         thumbnail: "https://picsum.photos/id/1019/250/150/",
    //     },
    // ];
    const images = [
        {
            original: Gimage1,
            thumbnail:Gimage1,
        },
        {
            original: Gimage2,
            thumbnail:Gimage2,
        },
        {
            original: Gimage3,
            thumbnail: Gimage3,
        },
        {
            original: Gimage4,
            thumbnail: Gimage4,
        }
    ];
    return (
        <div className='feedback-details'>
            <Sidebar />
            <Header heading="Group Details" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-220px)] md:w-full xsm:w-full float-right'>
                <div className='animate-div'>
                    <div className='py-10 rounded-[11px]'>
                        <div className='flex flex-col justify-between gap-3 2xl:pl-8 xl:pl-8 lg:pl-0 xsm:pl-0 pt-8'>
                            <div className='xl:p-12 lg:p-12 xsm:p-2 bg-white'>
                                <h1 className='text-[20px] font-medium pb-8'>Group Details</h1>
                                {/* ------- Lables &  Details of Dashboard --------*/}
                                <div className="grid grid-cols-3">
                                    <div>
                                        <p className="opacity-60 text-[16px] mb-2">Group Name:</p>
                                        <p className="opacity-60 text-[16px] mb-2">Owner of Group:</p>
                                        <p className="opacity-60 text-[16px] mb-2">Total Members:</p>
                                        <p className="opacity-60 text-[16px] mb-2">Total Posts:</p>
                                    </div>
                                    <div>
                                        <p className="text-[16px] mb-2 font-semibold ">Education Studies</p>
                                        <p className="text-[16px] mb-2 font-semibold ">Alexendra Dadario</p>
                                        <p className="text-[16px] mb-2 font-semibold ">90k</p>
                                        <p className="text-[16px] mb-2 font-semibold ">42</p>
                                    </div>
                                    <div>
                                        <ImageGallery autoPlay={false} showNav={false} showPlayButton={false} showFullscreenButton={false} showBullets={false} items={images} />
                                    </div>
                                </div>
                                {/* ------ Posts ------- */}
                                <div className='mt-10'>
                                    <p className='text-[20px] font-medium'>Group Posts</p>
                                    <div className='grid mt-8 3xl:gap-4 2xl:grid-cols-4 xl:grid-cols-3 gap-4 md:grid-cols-2'>
                                        {PostData?.map((item) => {
                                            return (
                                                <>
                                                    <div key={item?.id} class="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                                        <div class="relative   h-full overflow-hidden rounded-xl  bg-clip-border text-white ">
                                                            <img className='w-full object-cover' src={item?.image} alt="" />
                                                        </div>
                                                        <div class="p-6">
                                                            <p class="block  text-base font-light leading-relaxed text-inherit antialiased">
                                                                {item?.content.slice(0, 150)}
                                                            </p>
                                                            <p className='flex gap-3 items-center mt-5' >
                                                                <span onClick={() => setModalActive({ likes: true, comments: false })} className='border cursor-pointer border-black font-medium rounded-lg py-1 px-2'>Likes: {item?.likes}</span>
                                                                <span onClick={() => setModalActive({ comments: true, likes: false })} className='border cursor-pointer border-black font-medium rounded-lg py-1 px-2'>Comments: {item?.comments}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                        {
                                            modalActive.likes && (
                                                <LikeCommentModal likeData={likeData} modalActive={modalActive} setModalActive={setModalActive} />
                                            )
                                        }
                                        {
                                            modalActive?.comments && (
                                                <LikeCommentModal commentData={commentData} modalActive={modalActive} setModalActive={setModalActive} />

                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupDetails;