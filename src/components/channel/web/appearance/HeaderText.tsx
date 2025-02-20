import useAppearanceStore from "@/stores/useAppearanceStore";
import { useState } from "react";

type Props = {}

export default function HeaderText({ }: Props) {
    const { headerText, setHeaderText } = useAppearanceStore();
    return (
        <div className="group my-8">
            <label htmlFor="header-text" className="group-focus-within:text-primary-500 text-sm text-secondary-50">Header Text</label>
            <input value={headerText} onChange={(e) => setHeaderText(e.target.value)} type="text" className="block text-black h-[34px] w-full p-2 hover:border-primary-500 text-sm rounded-lg border border-[#e4e4e4] focus:outline-none focus:border-primary-500" id="header-text" />
        </div>
    )
}