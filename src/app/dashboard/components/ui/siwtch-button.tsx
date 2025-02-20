export function SwitchButton({value}: {value: string}) {
    return (
        <label
            htmlFor={value}
            className="switch cursor-pointer" >
            <input
                type="checkbox"
                id={value}
            />
            <span className="slider round" />
        </label>
    )
}