import * as yup from 'yup'

export const fechaValidationSchema = yup.object().shape({
    fechaInicio: yup
        .string()
        .required('la fecha inicial es obligatoria'),
    fechaFin: yup
        .string()
        .required('la fecha final es obligatoria')
})