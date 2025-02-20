import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { SuccessFailureNodesEnum } from "@/types/enums/SuccessFailureNodes";

interface AddButtonsProps {
    type?: string;
    setShowSuccessPopup: (value: boolean) => void;
    setShowFailurePopup: (value: boolean) => void;
    setShowPopup: (value: boolean) => void;
    showSuccessPopup: boolean;
    showFailurePopup: boolean;
    showPopup: boolean;
    removeFailurePlus?: boolean;
    removeSuccessPlus?: boolean;
    outGoers: any;
}

const HOLD_THRESHOLD = 100; // Time in milliseconds to detect a "hold"

const AddButtons: React.FC<AddButtonsProps> = ({
    type,
    setShowSuccessPopup,
    setShowFailurePopup,
    setShowPopup,
    showSuccessPopup,
    showFailurePopup,
    showPopup,
    outGoers,
}) => {
    const [isHolding, setIsHolding] = useState(false); // Tracks if the button is being held
    const holdTimer = useRef<NodeJS.Timeout | null>(null); // Timer reference
    const isMouseUpHandled = useRef(false); // Prevent redundant mouseup handling

    // Dynamic refs for buttons
    const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    const resetHoldState = useCallback(() => {

        if (holdTimer.current) {
            clearTimeout(holdTimer.current); // Clear the timer
            holdTimer.current = null;
        }

        setIsHolding(false); // Reset holding state
        isMouseUpHandled.current = false; // Allow next interaction

        // Re-enable pointer-events for all buttons
        Object.values(buttonRefs.current).forEach((ref) => {
            if (ref) ref.style.pointerEvents = "auto";
        });
    }, []);

    const dispatchMousedownToUnderlyingElement = useCallback((e: React.MouseEvent, buttonKey: string) => {
        const underlyingElement = document.elementFromPoint(e.clientX, e.clientY); // Get the element under the cursor
        if (underlyingElement && underlyingElement !== buttonRefs.current[buttonKey]) {
            console.log("Dispatching mousedown to underlying element:", underlyingElement);
            const mousedownEvent = new MouseEvent("mousedown", {
                bubbles: true,
                cancelable: true,
                clientX: e.clientX,
                clientY: e.clientY,
            });
            underlyingElement.dispatchEvent(mousedownEvent); // Dispatch the mousedown event
        }
    }, []);

    const handleMouseDown = useCallback(
        (e: React.MouseEvent, buttonKey: string) => {
            console.log(`Mouse Down for button ${buttonKey}`);

            resetHoldState(); // Ensure previous state is cleared

            holdTimer.current = setTimeout(() => {
                console.log(`Hold detected for button ${buttonKey}`);
                setIsHolding(true); // Mark as holding

                // Temporarily disable pointer-events for the button
                const buttonRef = buttonRefs.current[buttonKey];
                if (buttonRef) {
                    buttonRef.style.pointerEvents = "none";
                    dispatchMousedownToUnderlyingElement(e, buttonKey); // Dispatch mousedown to the element under the button
                }
            }, HOLD_THRESHOLD);
        },
        [resetHoldState, dispatchMousedownToUnderlyingElement]
    );

    const handleMouseUp = useCallback(
        (e: React.MouseEvent, buttonKey: string) => {
            if (isMouseUpHandled.current) {
                console.log(`Mouse Up already handled for button ${buttonKey}`);
                return; // Prevent redundant handling
            }
            isMouseUpHandled.current = true; // Mark mouseup as handled

            console.log(`Mouse Up for button ${buttonKey}`);

            if (holdTimer.current) {
                clearTimeout(holdTimer.current); // Clear the timer
                holdTimer.current = null;
            }

            if (isHolding) {
                console.log(`Hold action completed for button ${buttonKey}.`);
                resetHoldState(); // Reset state after the hold
                return; // Skip click logic
            }

            console.log(`Click detected. Opening popup for button ${buttonKey}.`);
            setShowPopup(!showPopup); // Toggle the popup menu
        },
        [isHolding, resetHoldState, setShowPopup, showPopup]
    );

    const handleClick = useCallback(
        (e: React.MouseEvent, buttonKey: string) => {
            console.log(`Click detected for button ${buttonKey}`);
            e.stopPropagation();
            setShowPopup(!showPopup);
        },
        [setShowPopup, showPopup]
    );

    useEffect(() => {
        const handleGlobalMouseUp = () => {
            resetHoldState(); // Reset state if mouse is released outside the button
        };

        document.addEventListener("mouseup", handleGlobalMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleGlobalMouseUp);
        };
    }, [resetHoldState]);

    if (Object.values(SuccessFailureNodesEnum).includes(type as SuccessFailureNodesEnum)) {
        return (
            <div className="flex justify-evenly">
                {outGoers.success && (
                    <button
                        ref={(el) => {
                            buttonRefs.current["success"] = el;
                        }}
                        className="nodrag absolute top-full left-1/4 translate-y-[-50%] z-10 w-6 h-6 text-white rounded-full bg-green-500 font-semibold text-lg flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, "success")}
                        onMouseUp={(e) => handleMouseUp(e, "success")}
                        onClick={(e) => {
                            e.stopPropagation(); //
                            setShowSuccessPopup(!showSuccessPopup); // / Toggle the popup menu
                        }} 
                         >
                        <FiPlus
                            className={`text-white w-4 h-4 transition-all ease-in-out ${showSuccessPopup ? "rotate-45" : "rotate-0"
                                }`}
                            strokeWidth="3px"
                        />
                    </button>
                )}

                {outGoers.failure && (
                    <button
                        ref={(el) => {
                            buttonRefs.current["failure"] = el;
                        }}
                        className="nodrag absolute top-full right-1/4 translate-y-[-50%] z-10 w-6 h-6 text-white rounded-full bg-red-700 font-semibold text-lg flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, "failure")}
                        onMouseUp={(e) => handleMouseUp(e, "failure")}
                        onClick={(e) => {
                            e.stopPropagation(); //
                            setShowFailurePopup(!showFailurePopup); // / Toggle the popup menu
                        }}      
                        >
                        <FiPlus
                            className={`text-white w-4 h-4 transition-all ease-in-out ${showFailurePopup ? "rotate-45" : "rotate-0"
                                }`}
                            strokeWidth="3px"
                        />
                    </button>
                )}
            </div>
        );
    }

    return (
        <button
            ref={(el) => {
                buttonRefs.current["default"] = el;
            }}
            data-drag="drag"
            className="nodrag absolute top-full left-1/2 translate-x-[-50%] translate-y-[-50%] z-10 w-6 h-6 text-white rounded-full bg-blue-700 font-semibold text-lg flex items-center justify-center"
            onMouseDown={(e) => handleMouseDown(e, "default")}
            onMouseUp={(e) => handleMouseUp(e, "default")}
            onClick={(e) => {
                e.stopPropagation(); //
            }}
        >
            <FiPlus
                className={`text-white w-4 h-4 transition-all ease-in-out ${showPopup ? "rotate-45" : "rotate-0"
                    }`}
                strokeWidth="3px"
            />
        </button>
    );
};

export default React.memo(AddButtons);
