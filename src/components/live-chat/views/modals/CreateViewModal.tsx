import Portal from "@/components/shared/Portal"
import { Plus, X } from "lucide-react"
import ReusableButton from "@/components/shared/ReusableButton"
import ReusableCombobox from "@/components/shared/ReusableCombobox"
import { useOutsideClick } from "@/hooks/useOutsideClick"
import FilterRow from "../../FilterRow"
import { useQuery } from "@tanstack/react-query"
import { getViewsFields } from "@/service/viewsServices"
import { useEffect, useState } from "react"
import FieldAndOperator from "../FieldAndOperator"
import ViewValue from "../ViewValue"

export interface IView {
    key: string;
    type: string;
    operators: string[]
}

type Props = {
    openAddView: boolean;
    setOpenAddView: React.Dispatch<React.SetStateAction<boolean>>
}


export default function CreateViewModal({ openAddView, setOpenAddView }: Props) {
    const createViewRef = useOutsideClick(() => setOpenAddView(false))
    const [field, setField] = useState<string>('Assignee')
    const [operator, setOperator] = useState<string>('equals')
    const [operatorArray, setOperatorArray] = useState<any>([])
    const [value, setValue] = useState<string>('')

    const { data: viewsFields } = useQuery<IView[] | []>({
        queryKey: ['views-fields'],
        queryFn: getViewsFields,
    })

    useEffect(() => {
        if (viewsFields && viewsFields.length > 0) {
            const defaultField = viewsFields.find((item) => item.key === 'Assignee')
            setField(defaultField?.key || '')
            setOperatorArray(defaultField?.operators || [])
            setOperator(defaultField?.operators[0] || '')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [viewsFields])
    if (!openAddView) return null;
    return (
        <Portal>
            <div className="fixed z-[999] flex items-center justify-center top-0 left-0 right-0 bottom-0 w-full h-full bg-[rgba(0,0,0,0.16)]">
                <div className="bg-white max-w-[750px] w-full rounded-xl relative">
                    <div className="flex items-center justify-between py-5 px-6 border-b border-primary-50">
                        <div className="text-[#3a3a3a] text-xl font-semibold">Create View</div>
                        <button onClick={() => setOpenAddView(false)}>
                            <span>
                                <X className="text-[#6d6d6d]" size={24} />
                            </span>
                        </button>
                    </div>
                    <div className="group relative pt-3 pb-8 px-6 border-b border-dashed border-primary-50">
                        <label className="group-focus-within:text-primary-500 text-sm text-secondary-50 block w-full mb-1" htmlFor="search">Name</label>

                        <input type="text" placeholder="E.g:Chats from NY" className="hover:border-primary-500 focus:border-primary-500 focus:shadow-[#e9e9fd_0px_0px_0px_2px] w-full p-[7px] text-sm text-black rounded-lg border border-[#e4e4e4] bg-white outline-none" />

                        <span className="text-[11px] text-[#f00] absolute left-6 bottom-[12px]">This filed cannot be empty</span>
                    </div>
                    <div className="py-4 px-6 border-b border-primary-50">
                        <div className="text-[13px] text-secondary-50 pb-2">Add conditions to filter chats to this view</div>
                        <div className="grid items-center gap-4 text-sm text-secondary-50 min-h-[45px] grid-cols-[100px_335px_199px]">
                            <div className="text-end">Where</div>
                            <FieldAndOperator
                                viewsFields={viewsFields}
                                field={field}
                                setField={setField}
                                operator={operator}
                                setOperator={setOperator}
                                operatorArray={operatorArray}
                                setOperatorArray={setOperatorArray}
                            />
                            <ViewValue
                                value={value}
                                setValue={setValue}
                                field={field}
                            />
                        </div>
                        <button className="flex items-center gap-2 text-primary-500 text-sm">
                            <span><Plus size={12} /></span>
                            <span>Add condition</span>
                        </button>
                    </div>
                    <div className="py-4 px-6 flex items-center justify-end">
                        <ReusableButton onClick={() => { }} disabled={true}>Create view</ReusableButton>
                    </div>
                </div>
            </div>
        </Portal>
    )
}