import { useState, useRef, useEffect } from "react";

interface UseSyncedInputProps<T extends HTMLInputElement | HTMLTextAreaElement> {
  initialValue: string; 
  onChange: (value: string) => void; 
}

const useSyncedInput = <T extends HTMLInputElement | HTMLTextAreaElement>({
  initialValue,
  onChange,
}: UseSyncedInputProps<T>) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<T>(null);

  const handleChange = (e: React.ChangeEvent<T>) => {
    const newValue = e.target.value;
    setValue(newValue); // Update local state
    onChange(newValue); // Trigger external sync
  };


  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    handleChange,
    inputRef,
  };
};

export default useSyncedInput;
