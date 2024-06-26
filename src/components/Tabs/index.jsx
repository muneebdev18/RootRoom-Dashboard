import React from 'react';
import { Link } from 'react-router-dom';

import "./style.css";

const Tabs = ({ active, onChange, children }) => {
    return (
        <>
            <div className='flex bg-[#FBF7F4] pl-4 pb-4'>
                {
                    children.map((c, index) => (
                        <Link
                            key={index}
                            onClick={() => onChange(index)}
                            className={`${active === index ? "activeTab" : "normalTab"} sm:text-[16px] xsm:text-[12px]`}
                        >
                            {c.props.title}
                        </Link>
                    ))
                }
            </div>
            <div>{children[active]}</div>
        </>
    )
}

export default Tabs;