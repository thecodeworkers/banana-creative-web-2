import { fetchUserData, setUserData } from '@store/actions'
import { useFormik as UseFormik } from 'formik'
import { emailRegex, onlyNumbersRegex, onlyLettersRegex } from '@utils'
import * as Yup from 'yup'

export const formikConfig = (dispatch: any, setShowPayment: any, showPayment, isLoading: boolean, setIsLoading: any) => (UseFormik({
  initialValues: {
    name: '',
    lastname: '',
    document: '',
    address: '',
    email: '',
    phone: '',
  },

  validationSchema: Yup.object({
    name: Yup.string()
      .required()
      .min(2)
      .matches(onlyLettersRegex),
    lastname: Yup.string()
      .min(2)
      .required(),
    document: Yup.string()
      .min(6)
      .max(10)
      .matches(onlyNumbersRegex)
      .required(),
    address: Yup.string()
      .required(),
    email: Yup.string()
      .required()
      .matches(emailRegex),
    phone: Yup.string()
      .required()
      .min(6)
      .max(12)
      .matches(onlyNumbersRegex),
  }),

  onSubmit: values => {
    if (!showPayment) {
      dispatch(setUserData({ userData: { ...values, ...{ paymentMethod: 'Zelle', delivery:'Pick-up: Torre IASA, La Castellana, Caracas' } } }))
      setShowPayment(true)
      return
    }

    if (!isLoading) {
      setIsLoading(true)
      dispatch(fetchUserData(values))
    }
  }
}))
