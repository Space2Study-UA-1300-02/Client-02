import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'
import LoginForm from '~/containers/guest-home-page/login-form/LoginForm'
import useForm from '~/hooks/use-form'
import { useLoginMutation } from '~/services/auth-service'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { email, password } from '~/utils/validations/login'
import loginImg from '~/assets/img/login-dialog/login.svg'
import { login, snackbarVariants } from '~/constants'
import { useEffect } from 'react'

import styles from '~/containers/guest-home-page/login-dialog/LoginDialog.styles'

const LoginDialog = () => {
  const { t } = useTranslation()
  const { closeModal, setIsDirty } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const [loginUser] = useLoginMutation()

  const {
    handleSubmit,
    handleInputChange,
    handleBlur,
    data,
    errors,
    isDirty,
    isValid
  } = useForm({
    onSubmit: async () => {
      try {
        await loginUser(data).unwrap()
        closeModal()
      } catch (e) {
        setAlert({
          severity: snackbarVariants.error,
          message: `errors.${e.data.code}`
        })
      }
    },
    initialValues: { email: '', password: '' },
    validations: { email, password }
  })

  useEffect(() => {
    setIsDirty(isDirty)
  }, [isDirty, setIsDirty])

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box alt='login' component='img' src={loginImg} sx={styles.img} />
      </Box>

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h2'>
          {t('login.head')}
        </Typography>
        <Box sx={styles.form}>
          <LoginForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
            isValid={isValid}
          />
          <GoogleLogin buttonWidth={styles.form.maxWidth} type={login} />
        </Box>
      </Box>
    </Box>
  )
}

export default LoginDialog
