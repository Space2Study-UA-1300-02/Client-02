import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import loginImg from '~/assets/img/login-dialog/login.svg'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import { Typography } from '@mui/material'
import { countriesMock, citiesMock } from './constans'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const GeneralInfoStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='login' component='img' src={loginImg} sx={styles.img} />
      </Box>
      <Box
        component='form'
        // onSubmit={handleSubmit}
        sx={styles.rigthBox}
      >
        <Typography sx={{ mb: { md: '20px', sm: '16px' } }}>
          {t('becomeTutor.generalInfo.title')}
        </Typography>
        <Box sx={styles.fieldContainer}>
          <AppTextField
            autoFocus
            data-testid={'firstName'}
            // errorMsg={t(errors.email)}
            // onBlur={handleBlur('email')}
            // onChange={handleChange('email')}
            label={t('common.labels.firstName')}
            required
            size='large'
            sx={{ mb: { md: '5px', xs: '0' } }}
            type='text'
            // value={data.email}
          />
          <AppTextField
            data-testid={'lastName'}
            label={t('common.labels.lastName')}
            required
            size='large'
            sx={{ mb: { md: '5px', xs: '0' } }}
            type='text'
          />
        </Box>
        <Box sx={styles.fieldContainer}>
          <AppAutoComplete
            options={countriesMock}
            sx={{ flex: 1, mb: { md: '20px', xs: '16px' } }}
            textFieldProps={{ label: t('common.labels.country') }}
          />
          <AppAutoComplete
            options={citiesMock}
            sx={{ flex: 1, mb: { md: '20px', xs: '16px' } }}
            textFieldProps={{ label: t('common.labels.city') }}
          />
        </Box>

        <AppTextArea
          fullWidth
          label={t('becomeTutor.generalInfo.textFieldLabel')}
          maxLength={200}
          sx={{ mb: '5px' }}
          value=''
        />
        <Typography sx={{ fontSize: '12px' }}>
          {t('becomeTutor.generalInfo.helperText')}
        </Typography>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
