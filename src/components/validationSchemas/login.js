import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Escribe un correo valido.')
        .required('El correo es obligatorio.'),
    password: yup
        .string()
        .required('La contraseña es obligatoria.')
})