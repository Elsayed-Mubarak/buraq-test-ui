const WebIcon = () => {
  return (
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="50"
      height="50"
      className="bg-gray-100 p-2 rounded-full transition duration-300 group"
    >
      {/* Outer Circle */}
      <circle
        cx="12"
        cy="12"
        r="10"
        className="stroke-gray-500 group-hover:stroke-blue-700"
        strokeWidth="2"
        fill="none"
      />
      {/* Horizontal Line */}
      <path
        d="M2 12h20"
        className="stroke-gray-500 group-hover:stroke-blue-700"
        strokeWidth="2"
        fill="none"
      />
      {/* Vertical Line */}
      <path
        d="M12 2v20"
        className="stroke-gray-500 group-hover:stroke-blue-700"
        strokeWidth="2"
        fill="none"
      />
      {/* Globe Latitudes */}
      <path
        d="M12 2c3.5 2 5.5 5 5.5 10s-2 8-5.5 10m0-20c-3.5 2-5.5 5-5.5 10s2 8 5.5 10"
        className="stroke-gray-500 group-hover:stroke-blue-700"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

export default WebIcon;
