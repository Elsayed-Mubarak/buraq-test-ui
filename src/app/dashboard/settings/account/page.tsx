import { redirect } from "next/navigation"

type Props = {}

export default function Page({ }: Props) {
    return redirect("/dashboard/settings/account/settings")
}