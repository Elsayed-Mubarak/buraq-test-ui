import { Handle, Position } from "@xyflow/react";

type branchingNodeProps = {
    data: { label?: string; conditions: string[] , defaultCondition:any };
    id :any
  };
const BranchingNode = ({ data, id }:branchingNodeProps) => {
  return (
    <div
      style={{
        padding: "10px",
        background: "#fef7e0", // Light yellow background
        border: "2px solid #f4c236", // Yellow border
        borderRadius: "8px",
        width: "200px",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Node label */}
      <div style={{ fontWeight: "bold", fontSize: "14px", marginBottom: "10px" }}>
        {data.label || "Condition"}
      </div>

      {/* Warning or info icon */}
      <div
        style={{
          position: "absolute",
          top: "-5px",
          right: "-5px",
          background: "#f4c236",
          color: "white",
          width: "20px",
          height: "20px",
          fontSize: "14px",
          fontWeight: "bold",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        !
      </div>

      {/* Handles and conditions */}
      <div style={{ marginTop: "10px" }}>
        {data.conditions.map((condition, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              margin: "5px 0",
            }}
          >
            {/* Output handle */}
            <Handle
              type="source"
              position={Position.Right}
              id={`branch-${index}`}
              style={{
                background: "#555",
                top: "auto",
                height: "10px",
                width: "10px",
                marginRight: "5px",
              }}
            />
            {/* Condition label */}
            <span style={{ fontSize: "12px", color: "#555" }}>{condition}</span>
          </div>
        ))}
      </div>

      {/* Default condition */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Handle
          type="source"
          position={Position.Right}
          id="default"
          style={{
            background: "#007bff", // Blue for default
            height: "10px",
            width: "10px",
          }}
        />
        <span style={{ fontSize: "12px", color: "#007bff" }}>
          {data.defaultCondition || "Default condition"}
        </span>
      </div>

      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          top: "-10px",
          background: "#555",
        }}
      />
    </div>
  );
};

export default BranchingNode;
