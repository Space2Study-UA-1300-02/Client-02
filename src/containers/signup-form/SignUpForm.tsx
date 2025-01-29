import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import useInputVisibility from '~/hooks/use-input-visibility'
import Box from '@mui/material/Box'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/containers/signup-form/SignUpForm.styles'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import { SignUpFormProps } from '~/types/common/interfaces/common.interfaces'

const SignUpForm: FC<SignUpFormProps> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  data,
  errors
}) => {
  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)

  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  const { t } = useTranslation()

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.nameFieldsContainer}>
        <AppTextField
          autoFocus
          errorMsg={errors.firstName ? t(errors.firstName) : ''}
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          sx={styles.halfWidth}
          value={data.firstName}
        />
        <AppTextField
          errorMsg={errors.lastName ? t(errors.lastName) : ''}
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          sx={styles.halfWidth}
          value={data.lastName}
        />
      </Box>

      <AppTextField
        errorMsg={errors.email ? t(errors.email) : ''}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={errors.password ? t(errors.password) : ''}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={errors.confirmPassword ? t(errors.confirmPassword) : ''}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />
      <Box sx={styles.checkbox}>
        <Checkbox required />
        <Typography variant='body2'>
          {t('signup.iAgree')}{' '}
          <a href='#' style={styles.link}>
            {t('common.terms')}
          </a>{' '}
          {t('signup.and')}{' '}
          <a href='#' style={styles.link}>
            {t('common.privacyPolicy')}
          </a>
        </Typography>
      </Box>
      <AppButton fullWidth sx={styles.submitButton} type='submit'>
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignUpForm
