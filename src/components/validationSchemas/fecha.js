import * as yup from 'yup'

export const fechaValidationSchema = yup.object().shape({
    fechaInicio: yup
        .string()
        .required('error')
        .min(9)
        .max(10),
    fechaFin: yup
        .string()
        .required('error')
        .min(9)
        .max(10)
})