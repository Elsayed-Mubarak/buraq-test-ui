import React from "react";

const renderList = [
    { id: "reply_btn", name: "Reply button", value: "reply-button" },
    { id: "options", name: "Options", value: "options" },
    { id: "list", name: "List", value: "list" },
];

interface Props {
    data: typeof renderList;
    triggerName: string;
    label?: string;
    onChange: (val: string) => void;
    className?: string;
}

const CheckboxView: React.FC<Props> = ({
    data,
    triggerName,
    label,
    onChange,
    className,
}) => {
    return (
        <div className={`custom-checkbox-select ${className || ""}`}>
            {label && <p className="text-sm text-nodeSettings mb-1">{label}</p>}
            <div className="flex border border-black w-fit rounded">
                {data.map((item) => (
                    <label
                        key={item.id}
                        htmlFor={item.id}
                        className={`flex items-center uppercase cursor-pointer px-3 py-1 ${triggerName === item.value
                            ? "bg-blue-600 text-white"
                            : "bg-white text-black"
                            }`}
                    >
                        <input
                            type="checkbox"
                            id={item.id}
                            checked={triggerName === item.value}
                            onChange={() => onChange(item.value)}
                            className="hidden"
                        />
                        {item.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default CheckboxView;
