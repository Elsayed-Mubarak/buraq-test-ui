"use server";

import { axiosInstance } from "@/lib/axios";
import { Currency } from "@/types/account-settings";
import { FormState } from "@/types/FormStateResponse";
import { AccountSettingsSchema } from "@/utils/formValidation/account-settings";

export async function AccountSettingsAction(prevState: any, formData: FormData) {
    let state: FormState;

    const validateFields = AccountSettingsSchema.safeParse({
        name: formData.get("name"),
        timezone: formData.get("timezone"),
        currency: formData.get("currency") as Currency,
        businessValue: Number(formData.get("businessValue")),
        hourlyCost: Number(formData.get("hourlyCost")),
        profilePicture: formData.get("profilePicture"),
        enable2FA: Boolean(formData.get("enable2FA"))
    });

    if (!validateFields.success) {
        state = {
            status: "error",
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Oops, I think there is a mistake with your inputs.',
        };
        return state;
    }

    try {
        const res = await axiosInstance.put('/account/settings', formData);
        if (res.status !== 200) {
            console.log(res);
            throw new Error();
        }
    } catch (error: any) {
        console.log(error)
        throw error;
    }

    state = {
        status: 'success',
        message: "Your Profile has been updated!",
    }

    return state;
}