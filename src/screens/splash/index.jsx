import React, { useEffect } from "react";
import DotLoader from "../../components/dotLoader";

import Logo from "../../assets/images/LogoRootRoom.png";

const Splash = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/login";
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col bg-[#070029] bg-center items-center justify-center text-center h-screen text-white gap-6">
      <img
        src={Logo}
        alt="Logo"
        // className="sm:w-60 xsm:w-32 sm:h-36 xsm:h-22"
      />
      <DotLoader />
    </div>
  );
};

export default Splash;
