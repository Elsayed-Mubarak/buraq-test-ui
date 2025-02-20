
type Props = {}


export default function Page({ }: Props) {
    return (
        <div className="py-4 px-12">
            <div className="text-2xl font-semibold text-secondary-50 mb-3">Calendar</div>
            <p className="text-base text-secondary-50">Connect your calendar account to book meetings on your chatbot</p>
            <div className="mt-8">
                <button className="h-[40px] text-black hover:text-white transition-all duration-300  hover:bg-[#4285f4] w-fit flex items-center gap-2 shadow-md p-[1px]">
                    <div className="h-[38px] ml-[1px] w-[38px] bg-white flex items-center justify-center">
                        <svg viewBox="0 0 18.926 19.313" xmlns="http://www.w3.org/2000/svg" width="16" height="16" ><path data-name="Path 3011" d="M18.926 9.871a8.274 8.274 0 0 0-.2-1.974h-9.07v3.584h5.322a4.719 4.719 0 0 1-1.974 3.133l-.018.12 2.867 2.221.2.02a9.441 9.441 0 0 0 2.875-7.1" fill="#4285f4"></path><path data-name="Path 3012" d="M9.656 19.313a9.2 9.2 0 0 0 6.395-2.339l-3.046-2.361a5.715 5.715 0 0 1-3.347.966 5.813 5.813 0 0 1-5.493-4.013l-.113.01-2.981 2.307-.039.108a9.649 9.649 0 0 0 8.626 5.322" fill="#34a853"></path><path data-name="Path 3013" d="M4.163 11.563a5.945 5.945 0 0 1-.322-1.91 6.247 6.247 0 0 1 .311-1.91l-.005-.128-3.018-2.34-.1.047a9.636 9.636 0 0 0 0 8.669l3.134-2.428" fill="#fbbc05"></path><path data-name="Path 3014" d="M9.656 3.734a5.352 5.352 0 0 1 3.734 1.438l2.725-2.661A9.278 9.278 0 0 0 9.656 0 9.649 9.649 0 0 0 1.03 5.322l3.122 2.425a5.837 5.837 0 0 1 5.5-4.013" fill="#eb4335"></path></svg>
                    </div>
                    <span className="pe-2">Sign in with Google</span>
                </button>
            </div>
        </div>
    )
}