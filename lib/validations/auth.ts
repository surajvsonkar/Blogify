import z, { email } from 'zod'

export const RegsitrationSchema = z.object({
    username: z.string().min(6, "username at least have 6 characters"),
    email: z.email("invalid email address"),
    password: z.string().min(8, "password atleast have 8 characters")
})
