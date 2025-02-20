import LabelsTable from "@/components/settings/labels/LabelsTable"

type Props = {}

export default function SettingsLabelsPage({ }: Props) {
    return (
        <div className="py-4 px-12">
            <div className="text-2xl font-semibold text-secondary-50 mb-10 font-barlow">Labels</div>
            <LabelsTable />
        </div>
    )
}


