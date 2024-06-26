import { MdSupervisedUserCircle, MdAccountBalanceWallet, MdTrendingUp } from "react-icons/md";
import ProgressBar from '../components/progressBar';

const dashboarddata = [
    {
        heading: "Total Users",
        subheading: "Won from 18 Deals",
        icon: <MdSupervisedUserCircle style={{ fontSize: '40px', paddingTop: '10px', color: '#04A7EA' }} />,
        bar: <ProgressBar bgColor='#04A7EA' progress='67' />,
        percent: "67"
    },
    {
        heading: "Total Players",
        subheading: "Daily average income",
        icon: <MdAccountBalanceWallet style={{ fontSize: '40px', paddingTop: '10px', color: '#F9837C' }} />,
        bar: <ProgressBar bgColor='#F9837C' progress='18' />,
        percent: "18"
    },
    {
        heading: "Total Post",
        subheading: "Lead coversation",
        icon: <MdTrendingUp style={{ fontSize: '40px', paddingTop: '10px', color: '#70B6C1' }} />,
        bar: <ProgressBar bgColor='#70B6C1' progress='78' />,
        percent: "78"
    }
]

export default dashboarddata;