// import React from "react";
// import * as FaIcons from "react-icons/fa"; // You can change this to another pack like `react-icons/io` or `react-icons/md`
// const IconList = () => {
//   const iconComponents = Object.keys(FaIcons).map((iconName) => {
//     const IconComponent = FaIcons[iconName];
//     return (
//       <div
//         key={iconName}
//         style={{ display: "inline-block", margin: "10px", textAlign: "center" }}
//       >
//         <IconComponent size={32} />
//         <div>{iconName}</div>
//       </div>
//     );
//   });
//   return (
//     <div style={{ display: "flex", flexWrap: "wrap" }}>{iconComponents}</div>
//   );
// };

// export default IconList;

import React, { useState } from "react";
import * as FaIcons from "react-icons/fa"; // You can change this to another pack like `react-icons/io` or `react-icons/md`

const IconList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [iconState, seticonState] = useState("");
  const iconComponents = Object.keys(FaIcons)
    .filter((iconName) =>
      iconName.toLowerCase().includes(searchTerm.toLowerCase())
    )

    .map((iconName) => {
      const IconComponent = FaIcons[iconName];
      return (
        <div
          key={iconName}
          style={{
            display: "inline-block",
            margin: "10px",
            textAlign: "center",
          }}
        >
          <IconComponent size={22} />
          <div style={{ fontSize: "11px" }}>{iconName}</div>
        </div>
      );
    });
  console.log(iconComponents);

  return (
    <div>
      <input
        type="text"
        placeholder="Search icons"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          marginBottom: "20px",
          //   padding: "5px",
          width: "500px",
          boxSizing: "border-box",
        }}
        className="py-3 px-3 w-[500px] border-2 border-gray-500 outline-none rounded-md "
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "500px",
          height: "100px",
          overflowY: "auto",
        }}
      >
        {searchTerm.length > 0 ? iconComponents : ""}
      </div>
    </div>
  );
};

export default IconList;
