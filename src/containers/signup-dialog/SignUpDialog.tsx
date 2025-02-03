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

const SignUpDialog: FC<SignUpDialogProps> = ({ initialRole }) => {
  const { t } = useTranslation()

  const { handleSubmit, handleInputChange, handleBlur, data, errors } =
    useForm<FormData>({
      // eslint-disable-next-line @typescript-eslint/require-await
      onSubmit: async (data?: FormData): Promise<void> => {
        console.log('Sign-up data', data)
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
            buttonWidth={styles.form}
            role={initialRole}
            type='signup'
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignUpDialog
