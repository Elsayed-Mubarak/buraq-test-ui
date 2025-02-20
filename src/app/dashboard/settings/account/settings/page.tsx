import AccountSettingsForm from "@/components/settings/forms/AccountSettingsForm";

export default function Page() {
    return (
        <div className="py-4 px-12">
            <h3 className='text-2xl font-bold text-secondary-50 mb-12'>Account Settings</h3>
            <AccountSettingsForm />
        </div>
    )
}