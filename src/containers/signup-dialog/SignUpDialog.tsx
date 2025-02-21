import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import useForm from '~/hooks/use-form'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import { UserRoleEnum } from '~/types'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import {
  email,
  password,
  confirmPassword,
  lastName,
  firstName
} from '~/utils/validations/signUp'
import { styles } from '~/containers/signup-dialog/SignUpDialog.styles'
import SignUpForm from '~/containers/signup-form/SignUpForm'
import {
  FormData,
  SignUpDialogProps
} from '~/types/common/interfaces/common.interfaces'
import { useSignUpMutation } from '~/services/auth-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import { signup } from '~/constants'

export interface ErrorResponse {
  code?: string
  message?: string
  status?: number
}

const SignUpDialog: FC<SignUpDialogProps> = ({ initialRole }) => {
  const { t } = useTranslation()
  const [signUp] = useSignUpMutation()
  const { setAlert } = useSnackBarContext()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } =
    useForm<FormData>({
      onSubmit: async (data?: FormData): Promise<void> => {
        if (!data) return
        try {
          await signUp({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            confirmPassword: data.confirmPassword,
            role:
              initialRole === UserRoleEnum.Tutor
                ? UserRoleEnum.Tutor
                : UserRoleEnum.Student
          }).unwrap()
        } catch (err: unknown) {
          const errorResponse = err as ErrorResponse

          let errorMessage = t('errors.UNKNOWN_ERROR')

          if (errorResponse?.code) {
            errorMessage = t(`errors.${errorResponse.code}`, {
              defaultValue: t('errors.UNKNOWN_ERROR')
            })
          } else if (errorResponse?.status === 409) {
            errorMessage = t('errors.ALREADY_REGISTERED')
          }

          setAlert({
            severity: 'error',
            message: errorMessage
          })

          console.error('Registration error:', err)
        }
      },
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      validations: { email, password, confirmPassword, lastName, firstName }
    })

  const roleText =
    initialRole === UserRoleEnum.Tutor
      ? t('signup.head.tutor')
      : t('signup.head.student')

  const imageSrc = initialRole === UserRoleEnum.Tutor ? tutorImg : studentImg

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='signup' component='img' src={imageSrc} sx={styles.img} />
      </Box>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {roleText}
        </Typography>
        <Box sx={styles.form}>
          <SignUpForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <GoogleLogin
            buttonWidth={styles.btn.maxWidth}
            role={initialRole}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpDialog
