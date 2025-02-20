import React, { useState } from 'react';
import { EdgeLabelRenderer, EdgeProps, getBezierPath } from '@xyflow/react';
import { MdDeleteOutline } from "react-icons/md";
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd = 'url(#custom-arrow)', // Default custom marker
  data,
}: EdgeProps) => {
  // Generate a Bezier path for the edge
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });


  // const [hovered, setHovered] = useState<boolean>(false);

  return (
    <g >
      {/* Main edge path */}
      <path
        id={id}
        d={edgePath}
        style={
          {
            stroke: '#afb2b3',
            strokeWidth: 4,
            cursor: 'default',
            fill: 'transparent',
            ...style,
          }
        }
      />
{/* 
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            background: '#ffff',
            padding: 5,
            borderRadius: 5,
            fontSize: 22,
            fontWeight: 50,
            // color: hovered ? "red" : 'black',
            cursor: 'pointer',


          }}
          className="nodrag nopan hover:text-red-700"
          onMouseEnter={() => setHovered(true)} // Trigger hover state
          onMouseLeave={() => setHovered(false)} // Reset hover state
        >
          {<MdDeleteOutline  />}
        </div>
      </EdgeLabelRenderer> */}
    </g>
  );
};

export default CustomEdge;
