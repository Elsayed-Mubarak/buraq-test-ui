import React, { forwardRef, useImperativeHandle, useRef, HTMLAttributes } from "react";
import useSyncedInput from "@/hooks/useSyncedInput";

interface SyncedInputProps extends HTMLAttributes<HTMLInputElement> {
    initialValue: string;
    onExternalChange: (value: string) => void;
    placeholder?: string;
}

const SyncedInput = forwardRef<HTMLInputElement, SyncedInputProps>(
    ({ initialValue, onExternalChange, ...props }, forwardedRef) => {
        // Use the custom hook
        const { value, handleChange, inputRef } =
            useSyncedInput<HTMLInputElement>({
                initialValue,
                onChange: onExternalChange,
            });


        useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

        return (
            <input
                {...props} // Pass additional props
                ref={inputRef} // Attach the internal ref
                value={value}
                onChange={handleChange} // Handle change events
                // onBlur={triggerExternalChange} // Sync external state on blur
            />
        );
    }
);

SyncedInput.displayName = "SyncedInput";

export default SyncedInput;
