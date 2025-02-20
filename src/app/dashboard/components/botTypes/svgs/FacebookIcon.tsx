const FacebookIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="50"
      height="50"
      className="bg-gray-100  rounded-full transition duration-300 group"
    >
      {/* Circle Background */}
      <circle
        cx="12"
        cy="12"
        r="10"
        className="fill-gray-500 group-hover:fill-blue-700"
      />
      {/* Facebook "F" Logo */}
      <path
        d="M13 8h-1.5v-1c0-.4.3-.7.7-.7H13V4.5h-1.8A2.7 2.7 0 008.5 7v1H7v2h1.5v6H11v-6h1.5l.5-2H11V8z"
        className="fill-white"
        transform="translate(2, 2)"
      />
    </svg>
  );
};

export default FacebookIcon;
