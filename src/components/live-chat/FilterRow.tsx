import ReusableCombobox from "@/components/shared/ReusableCombobox"
type Props = {}

export default function FilterRow({ }: Props) {
    return (
        <div className="grid items-center gap-4 text-sm text-secondary-50 min-h-[45px] grid-cols-[100px_155px_160px_199px] mb-4">
            <div>
                <ReusableCombobox />
            </div>
            <div>
                <ReusableCombobox />
            </div>
            <div>
                <ReusableCombobox />
            </div>
            <div>
                <ReusableCombobox />
            </div>
        </div>
    )
}