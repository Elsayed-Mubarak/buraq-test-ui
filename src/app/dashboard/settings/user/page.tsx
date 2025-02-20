import { redirect } from 'next/navigation'
import React from 'react'

type Props = {}

export default function page({ }: Props) {
    return redirect("/dashboard/settings/user/profile")
}