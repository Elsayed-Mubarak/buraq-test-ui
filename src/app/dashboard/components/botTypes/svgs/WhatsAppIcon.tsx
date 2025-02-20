// components/WhatsAppIcon.js

import React from 'react';

const WhatsAppIcon = () => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      width="40px"
      height="50"
      fill="#808080" // Use fill instead of color for SVG
      className="transition duration-300 hover:fill-blue-700" // Tailwind CSS classes for hover effect
    >
      <g>
        <path
          className="st0"
          d="M22,11.4c0,1.5-0.3,2.9-1,4.2c-1.6,3.2-4.9,5.2-8.4,5.2c-1.5,0-2.9-0.3-4.2-1L2,22l2.1-6.3
          c-0.7-1.3-1-2.8-1-4.2c0-3.6,2-6.8,5.2-8.4c1.3-0.7,2.8-1,4.2-1h0.6c4.8,0.3,8.6,4.1,8.9,8.9V11.4z"
        ></path>
        <path className="st1" fill='#f3f3f3' d="M16.9,14.2c0.3,0.1,0.5,0.2,0.5,0.3c0.1,0.1,0,0.7-0.2,1.3c-0.2,0.6-1.4,1.2-1.9,1.2s-0.5,0.4-3.3-0.8
                c-2.8-1.2-4.4-4.2-4.6-4.4c-0.1-0.2-1.1-1.5-1-2.9c0.1-1.4,0.8-2,1.1-2.3c0.3-0.3,0.6-0.3,0.8-0.3h0.5c0.2,0,0.4-0.1,0.6,0.5
                L10.2,9c0.1,0.1,0.1,0.3,0,0.5L9.9,10l-0.4,0.5c-0.1,0.1-0.3,0.3-0.1,0.6c0.1,0.3,0.7,1.2,1.5,2c1,1,1.9,1.3,2.2,1.4
                c0.3,0.2,0.4,0.1,0.6,0l0.9-1c0.2-0.3,0.4-0.2,0.6-0.1L16.9,14.2"></path>
      </g>
    </svg>
  );
};

export default WhatsAppIcon;