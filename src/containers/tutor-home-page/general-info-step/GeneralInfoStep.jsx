import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import loginImg from '~/assets/img/login-dialog/login.svg'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import { Typography } from '@mui/material'
import { countriesMock, citiesMock } from './constants'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { useState } from 'react'

const GeneralInfoStep = ({
  btnsBox,
  handleInputChange,
  handleNonInputValueChange,
  handleBlur,
  data,
  errors
}) => {
  const { t } = useTranslation()
  const [cities, setCities] = useState([])
  const handleInput = (input, value) => {
    const newValue = value ? value.label : ''
    handleNonInputValueChange(input, newValue)
    if (input === 'country') {
      value ? setCities(citiesMock[newValue]) : setCities([])
      handleNonInputValueChange('city', '')
    }
  }
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box alt='login' component='img' src={loginImg} sx={styles.img} />
      </Box>
      <Box component='form' sx={styles.rigthBox}>
        <Typography sx={{ mb: { md: '20px', sm: '16px' } }}>
          {t('becomeTutor.generalInfo.title')}
        </Typography>
        <Box sx={styles.fieldContainer}>
          <AppTextField
            autoFocus
            data-testid={'firstName'}
            errorMsg={t(errors.firstName)}
            label={t('common.labels.firstName')}
            onBlur={handleBlur('firstName')}
            onChange={handleInputChange('firstName')}
            required
            size='large'
            sx={{ mb: { md: '5px', xs: '0' } }}
            type='text'
            value={data.firstName}
          />
          <AppTextField
            data-testid={'lastName'}
            errorMsg={t(errors.lastName)}
            label={t('common.labels.lastName')}
            onBlur={handleBlur('lastName')}
            onChange={handleInputChange('lastName')}
            required
            size='large'
            sx={{ mb: { md: '5px', xs: '0' } }}
            type='text'
            value={data.lastName}
          />
        </Box>
        <Box sx={styles.fieldContainer}>
          <AppAutoComplete
            isOptionEqualToValue={(option, value) =>
              option.label === value || value === ''
            }
            onChange={(ev, value) => handleInput('country', value)}
            options={countriesMock}
            sx={{ flex: 1, mb: { md: '20px', xs: '16px' } }}
            textFieldProps={{ label: t('common.labels.country') }}
            value={data.country}
          />
          <AppAutoComplete
            isOptionEqualToValue={(option, value) =>
              option.label === value || value === ''
            }
            onChange={(ev, value) => handleInput('city', value)}
            options={cities}
            sx={{ flex: 1, mb: { md: '20px', xs: '16px' } }}
            textFieldProps={{ label: t('common.labels.city') }}
            value={data.city}
          />
        </Box>
        <AppTextArea
          fullWidth
          label={t('becomeTutor.generalInfo.textFieldLabel')}
          maxLength={200}
          onChange={handleInputChange('professionalSummary')}
          sx={{ mb: '5px' }}
          value={data.professionalSummary || ''}
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
