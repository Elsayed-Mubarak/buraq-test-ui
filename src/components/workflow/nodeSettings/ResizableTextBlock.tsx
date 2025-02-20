import { ReactNode, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface Props {
    label?: string;
    footerMsg?: string;
    className?: string;
    children: ReactNode;
}


function ResizableTextBlock({ label, className, footerMsg, children }: Props) {
    const [isResized, setIsResized] = useState<boolean>(false);

    const handleResize = () => {
        setIsResized(prev => !prev);
    }

    return (
        <div className={`${className} ${isResized && 'fixed top-[50px] right-0 w-[600px] h-full bg-white p-1 rounded z-[100] border'}`}>
            <div className={`flex items-center justify-between mb-1`}>
                {label && <h3 className="text-sm text-nodeSettings mb-2">{label}</h3>}
                {isResized
                    ? (
                        <button type="button" onClick={handleResize} className="text-gray-500">
                            <IoMdClose />
                        </button>
                    ) : (
                        <button type="button" onClick={handleResize}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#808080" d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3z"></path></svg>
                        </button>
                    )
                }
            </div>
            <div className={`${!isResized ? 'h-[208px]' : 'h-full'}`}>
                {children}
            </div>
            {footerMsg && <p className="text-xs text-gray-500">{footerMsg}</p>}
        </div>
    )
}

export default ResizableTextBlock