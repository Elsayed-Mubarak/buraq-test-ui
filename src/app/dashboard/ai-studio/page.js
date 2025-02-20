import AiStudioEmpty from "./AiStudioEmpty";
import AiStudioList from "./AiStudioList";
export default function AiStudioPage() {
  const knowledgeBases = ["asdsd"];
  return (
    <div className="w-full">
      <div className="mx-auto my-0 h-full w-[750px] py-12">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-[#092445]">AI Studio</h2>
          <button className="flex h-9 min-w-36 items-center rounded-lg bg-[#343de6] px-5 py-2 text-white transition-all duration-300 hover:bg-[#040ecc]">
            <span className="mr-2">
              <svg
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path
                  fill="#fff"
                  d="M64 448h896c35.346 0 64 28.654 64 64s-28.654 64-64 64H64c-35.346 0-64-28.654-64-64s28.654-64 64-64z"
                ></path>
                <path
                  fill="#fff"
                  d="M576 64v896c0 35.346-28.654 64-64 64s-64-28.654-64-64V64c0-35.346 28.654-64 64-64s64 28.654 64 64z"
                ></path>
              </svg>
            </span>
            <span>Knowledge base</span>
          </button>
        </header>
        <p className="mb-5 font-medium">
          Build knowledge bases using your data sources.
        </p>
        <div className="mb-4 flex items-center justify-between">
          <div className="relative flex h-9 w-[400px] items-center gap-1 rounded-lg border border-[#e4e4e4] transition-all duration-300 focus-within:border-[#343de6] focus-within:shadow-[0_0_4px_0_rgba(52,61,230)] hover:border-[#343de6]">
            <input
              className="peer flex-1 border-none bg-transparent pl-8 outline-0"
              type="text"
              placeholder="Search..."
            />
            <span className="absolute left-0 ml-[6px] peer-focus:text-[rgba(52,61,230)]">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0257 12.8474L17.5946 16.4163L16.4161 17.5948L12.8472 14.0259C11.5639 15.0526 9.9365 15.6667 8.1665 15.6667C4.0265 15.6667 0.666504 12.3067 0.666504 8.16675C0.666504 4.02675 4.0265 0.666748 8.1665 0.666748C12.3065 0.666748 15.6665 4.02675 15.6665 8.16675C15.6665 9.93675 15.0523 11.5642 14.0257 12.8474ZM12.3538 12.2291C13.3728 11.1789 13.9998 9.74642 13.9998 8.16675C13.9998 4.94383 11.3894 2.33341 8.1665 2.33341C4.94359 2.33341 2.33317 4.94383 2.33317 8.16675C2.33317 11.3897 4.94359 14.0001 8.1665 14.0001C9.74617 14.0001 11.1787 13.373 12.2288 12.354L12.3538 12.2291Z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#0f0f0f]">
            <span>0</span>
            <p>knowledge bases created</p>
          </div>
        </div>
        {!knowledgeBases.length > 0 && <AiStudioEmpty />}
        {knowledgeBases.length > 0 && <AiStudioList />}
      </div>
    </div>
  );
}
