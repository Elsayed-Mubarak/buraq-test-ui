import ProfileSettingsForm from "@/components/settings/forms/ProfileSettingsForm";
export default function ProfilePage() {
    return (
        <div className="py-4 px-12">
            <h1 className='text-2xl font-semibold text-secondary-50'>
                Profile
            </h1>
            <ProfileSettingsForm />
        </div>
    )
}