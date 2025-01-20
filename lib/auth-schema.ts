import { z } from "zod";

export const formSchema = z.object({
    name: z
    .string()
    .min(2, { message: 'O Nome tem que ser maior que 2 caracteres'})
    .max(50, {message: 'O Nome tem que ser menor que 50 caracteres'}),

    email: z
    .string()
    .email({ message: 'Introduza o endereço de email valido'})
    .min(2)
    .max(50),

    password: z
    .string()
    .min(8, { message: "Password deve ter pelo menos 8 caracteres"})
    .max(50, { message: "Password não pode exceder 50 caracteres"})
})


export const signInFromSchema = formSchema.pick({
    email: true,
    password: true
})