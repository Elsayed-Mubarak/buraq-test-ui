import React from 'react';
import { ConnectionLineComponentProps, useConnection } from '@xyflow/react';
import useFlowStore from '../../reactflowstate/store';

// interface ConnectionLineProps {
//   fromX: number;
//   fromY: number;
//   toX: number;
//   toY: number;
//   connectionLineStyle : 
// }

const ConnectionLine: React.FC<ConnectionLineComponentProps> = ({ fromX, fromY, toX, toY ,connectionLineStyle , connectionLineType } ) => {
  // const { fromHandle } = useConnection();
  // const {hoverdNode} = useFlowStore()
  

  return (

    

    <g>
      {/* Connection line */}
      <path
        fill="none" // Ensure the path is only a line
        stroke={`${connectionLineStyle?.color}`} // Set the stroke color to blue
        strokeWidth={3} // Line thickness
        height={20}
      

        // className={`${hoverdNode ?  "animated" : ""}  `} // Add any animation or style class
        d={`M${fromX},${fromY} C ${fromX} ${(fromY + toY) / 2} ${toX} ${(fromY + toY) / 2} ${toX},${toY}`}
      />
    </g>

    

  );
};

export default ConnectionLine;

