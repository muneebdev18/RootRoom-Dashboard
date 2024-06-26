import React from 'react';
import { useSelector } from 'react-redux';
import { MdTimeline } from 'react-icons/md';

import { selectLogout } from '../../features/modal'
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import docsData from '../../utils/docData';

const Document = () => {
    const logOut = useSelector(selectLogout);

    return (
        <div className='doc-div'>
            <Sidebar />
            <Header heading="Documents" content="With all of the styling tool options available in today's market" />
            <div className='lg:w-[calc(100%-280px)] md:w-full xsm:w-full float-right pt-24 pl-4'>
                <ol className={`${logOut ? '' : 'relative'} border-l border-gray-200`}>
                    {
                        docsData.map((item, i) => {
                            return (
                                <li className="mb-10 ml-6" key={i}>
                                    <span className={`${logOut ? 'relative right-[40px] -z-50' : 'absolute -left-4'} flex items-center justify-center w-8 h-8 bg-blue-200 rounded-full`}>
                                        <MdTimeline size={20} />
                                    </span>
                                    <h3 className="flex items-center mb-1 text-lg font-semibold text-blue-400">
                                        {item.heading}
                                        {
                                            item?.new ? (
                                                <span className="ml-8 bg-blue-100 text-blue-400 text-sm font-medium mr-2 px-4 py-[2px] rounded-lg ml-3">{item?.new}</span>
                                            ) : (<></>)
                                        }
                                    </h3>
                                    <time className="block mb-2 text-sm font-normal leading-none text-gray-600">{item.date}</time>
                                    <p className="mb-4 text-base font-normal text-gray-500">{item.details}</p>
                                    <button className='bg-[#3B5998] text-white px-8 py-4 rounded-xl'>Download Zip</button>
                                </li>
                            )
                        })
                    }
                </ol>

            </div>
        </div>
    )
}

export default Document;