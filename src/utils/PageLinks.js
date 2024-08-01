import {
  MdDashboard,
  MdDomain,
  MdMedicalServices,
  MdAccountBox,
  MdAssignment,
  MdEventNote,
  MdMail,
  MdDescription,
} from "react-icons/md";

const pagelinks = [
  {
    // User Management
    page: "home",
    icon: <MdDashboard color="#898989" size={24} />,
    name: "Dashboard",
  },
  // {
  //   // User Management
  //   page: "adminmanagement",
  //   icon: <MdDomain color="#898989" size={24} />,
  //   name: "Admin Management",
  // },
  {
    // Players Management
    page: "interest",
    icon: <MdMedicalServices color="#898989" size={24} />,
    name: "Interest",
  },
  {
    // Subscription Management
    page: "language",
    icon: <MdAccountBox color="#898989" size={24} />,
    name: "Language",
  },
  {
    // Reports Management
    page: "usermanagement",
    icon: <MdAssignment color="#898989" size={24} />,
    name: "User Management",
  },
  
  {
    page:"groupmanagement",
    icon: <MdEventNote color="#898989" size={24} />,
    name: "Group Management",
  },

  // {
  //     // Payment Logs
  //     page: "paymentlogs",
  //     icon: <MdEventNote color="#898989" size={24} />,
  //     name: "Payment Logs"
  // },
  // {
  //     // Feedbacks Management
  //     page: "feedbacksmanagement",
  //     icon: <MdMail color="#898989" size={24} />,
  //     name: "Feedbacks Management"
  // },
  // {
  //     // Documents
  //     page: "documents",
  //     icon: <MdDescription color="#898989" size={24} />,
  //     name: "Documents"
  // }
];

export default pagelinks;
