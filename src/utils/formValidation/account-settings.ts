import { z } from "zod"

export const AccountSettingsSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'The name has to be a min character length of 3' }),

    timezone: z
        .string()
        .min(1, { message: 'timezone is required' }),

    currency: z
        .string()
        .min(1, { message: 'This is required' }),

    businessValue: z
        .number()
        .min(1, { message: 'This value is required' }),

    hourlyCost: z
        .number()
        .min(1, { message: "This value is required" }),

    enable2FA: z
        .boolean()
        .optional()
});
