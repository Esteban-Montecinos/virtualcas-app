import * as yup from 'yup'

export const resetPasswordValidationSchema = yup.object().shape({
    emailReset: yup
        .string()
        .email('Escribe un correo valido.')
        .required('El correo es obligatorio.')
})