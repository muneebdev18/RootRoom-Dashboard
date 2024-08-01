import { MdSupervisedUserCircle, MdAccountBalanceWallet, MdTrendingUp } from "react-icons/md";
import ProgressBar from '../components/progressBar';
import { FaUserCheck,FaUserAltSlash  } from "react-icons/fa";
import { GiPostStamp } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoBook } from "react-icons/io5";




const dashboarddata = [
    {
        heading: "Total Users",
        subheading: "Won from 18 Deals",
        icon: <MdSupervisedUserCircle style={{ fontSize: '40px', paddingTop: '10px', color: '#04A7EA' }} />,
        bar: <ProgressBar bgColor='#04A7EA' progress='67' />,
        total: "67"
    },
    {
        heading: "Total Verified User",
        subheading: "Daily average income",
        icon: <FaUserCheck style={{ fontSize: '34px', paddingTop: '10px', color: '#06d001' }} />,
        bar: <ProgressBar bgColor='#06d001' progress='18' />,
        total: "18"
    },
    {
        heading: "Total Unverified User",
        subheading: "Lead coversation",
        icon: <FaUserAltSlash style={{ fontSize: '32px', paddingTop: '10px', color: '#FF0000' }} />,
        bar: <ProgressBar bgColor='#FF0000' progress='78' />,
        total: "78"
    },
    {
        heading: "Total Groups",
        subheading: "Won from 18 Deals",
        icon: <FaPeopleGroup style={{ fontSize: '40px', paddingTop: '10px', color: '#070029' }} />,
        bar: <ProgressBar bgColor='#070029' progress='67' />,
        total: "67"
    },
    {
        heading: "Total Posts",
        subheading: "Daily average income",
        icon: <IoBook style={{ fontSize: '40px', paddingTop: '10px', color: '#F9837C' }} />,
        bar: <ProgressBar bgColor='#F9837C' progress='18' />,
        total: "18"
    },
]

// export const seconddashboarddata = [
//     {
//         heading: "Total Groups",
//         subheading: "Won from 18 Deals",
//         icon: <MdSupervisedUserCircle style={{ fontSize: '40px', paddingTop: '10px', color: '#04A7EA' }} />,
//         bar: <ProgressBar bgColor='#04A7EA' progress='67' />,
//         percent: "67"
//     },
//     {
//         heading: "Total Posts",
//         subheading: "Daily average income",
//         icon: <MdAccountBalanceWallet style={{ fontSize: '40px', paddingTop: '10px', color: '#F9837C' }} />,
//         bar: <ProgressBar bgColor='#F9837C' progress='18' />,
//         percent: "18"
//     },
    
// ]
export default dashboarddata;