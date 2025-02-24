// import { Handle, Position } from "reactflow";
// import { BsChatText } from "react-icons/bs";
// // Define a Node component that takes a data prop
// const Node = ({ data }) => {
//   return (
//     <div>
//       {/* Header section of the node */}
//       <div
//         style={{
//           backgroundColor: "#b2f0e3",
//           borderTopLeftRadius: 5,
//           borderTopRightRadius: 5,
//           fontWeight: "bold",
//           color: "black",
//           paddingLeft: 15,
//           paddingTop: 3,
//           paddingBottom: 3,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           width: 275,
//           boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
//         }}
//       >
//         {/* Container for icon and heading */}
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <BsChatText
//             style={{ fontSize: 13, paddingRight: 7, paddingTop: 5 }}
//           />
//           {data.heading} {/* Display heading from data prop */}
//         </div>
//         <div style={{ paddingRight: 15 }}>
//           <img src="whatsapp.svg" alt="whatsapp icon" height={15} />{" "}
//           {/* WhatsApp icon */}
//         </div>
//       </div>
//       {/* Content section of the node */}
//       <div
//         style={{
//           padding: 15,
//           borderBottomLeftRadius: 5,
//           borderBottomRightRadius: 5,
//           backgroundColor: "white",
//           boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
//         }}
//       >
//         <div
//           style={{
//             color: "black",
//           }}
//         >
//           {data.label} {/* Display label from data prop */}
//         </div>
//       </div>
//       {/* Source handle for connections */}
//       <Handle type="source" position={Position.Right} id="source" />
//       {/* Target handle for connections */}
//       <Handle type="target" position={Position.Left} id="target" />
//     </div>
//   );
// };

// export default Node;
