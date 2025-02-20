import EventsSettingsForm from "@/components/settings/forms/EventsSettingsForm";

export default function page() {

    return (
        <section className="px-5 py-2">
            <div>
                <h2 className="text-nodeSettings text-2xl font-bold">Events</h2>
                <p className="text-sm text-gray-500">We attempt to send the list of Buraq events to your webhook endpoints.</p>
            </div>
            <div className="mt-3">
                <EventsSettingsForm />
            </div>
        </section>
    )
}