
const MainLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
      <div className="relative w-[60px] h-[100px] animate-[rotate_1s_infinite]">
        <div className="absolute top-1/2 left-1/2 w-[30px] h-[30px] border-4 border-primary-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-[moveRightLeft_1s_infinite_ease-in-out]"></div>
        <div className="absolute top-1/2 left-1/2 w-[30px] h-[30px] border-4 border-primary-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-[moveLeftRight_1s_infinite_ease-in-out]"></div>
      </div>
      <style jsx>{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-360deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }

        @keyframes moveRightLeft {
          0%, 100% {
            transform: translate(-50%, -50%);
          }
          25%, 75% {
            transform: translate(calc(-50% + 13px), -50%);
          }
        }

        @keyframes moveLeftRight {
          0%, 100% {
            transform: translate(-50%, -50%);
          }
          25%, 75% {
            transform: translate(calc(-50% - 13px), -50%);
          }
        }
      `}</style>
    </div>
  );
};

export default MainLoader;
