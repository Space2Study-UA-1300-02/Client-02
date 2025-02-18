import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import loginImg from '~/assets/img/login-dialog/login.svg'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import { Typography } from '@mui/material'
import { useState, useCallback } from 'react'
import { countriesMock } from './constants'
import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'
import { debounce } from 'lodash'
import { URLs } from '~/constants/request'

const GeneralInfoStep = ({
  btnsBox,
  handleInputChange,
  handleNonInputValueChange,
  handleBlur,
  data,
  errors
}) => {
  const { t } = useTranslation()
  const [countries, setCountries] = useState(countriesMock || [])
  const [cities, setCities] = useState([])
  const [loadingCountries, setLoadingCountries] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)

  const fetchCountries = async (search) => {
    if (search.length < 3) {
      setCountries([])
      return
    }

    setLoadingCountries(true)
    try {
      const response = await fetch(
        `${URLs.location.countries}?search=${search}`
      )
      const result = await response.json()

      if (!response.ok) {
        throw new Error(`HTTP error Code: ${response.status}`)
      }

      if (!result || result.error || !Array.isArray(result.data)) {
        throw new Error('Incorrect server response (countries)')
      }

      setCountries(result.data.map((country) => ({ label: country })))
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingCountries(false)
    }
  }

  const fetchCities = async (country, search) => {
    if (search.length < 3) {
      setCities([])
      return
    }

    setLoadingCities(true)
    try {
      const response = await fetch(
        `${URLs.location.cities}/${country}?search=${search}`
      )
      const result = await response.json()

      if (!response.ok) {
        throw new Error(`HTTP error! Code: ${response.status}`)
      }

      if (!result || result.error || !Array.isArray(result.data)) {
        throw new Error('Server error')
      }

      setCities(result.data.map((city) => ({ label: city })))
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingCities(false)
    }
  }

  const debouncedFetchCountries = useCallback(
    () => debounce(fetchCountries, 500),
    []
  )
  const debouncedFetchCities = useCallback(() => debounce(fetchCities, 500), [])

  const handleCountryInputChange = (event, value) => {
    handleNonInputValueChange('country', value || '')
    handleNonInputValueChange('city', '')
    setCities([])

    if (value.length >= 3) {
      debouncedFetchCountries(value)
    } else {
      setCountries([])
    }
  }

  const handleCityInputChange = (event, value) => {
    handleNonInputValueChange('city', value || '')

    if (value.length >= 3 && data.country) {
      debouncedFetchCities(data.country, value)
    } else {
      setCities([])
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
            loading={loadingCountries}
            onInputChange={handleCountryInputChange}
            options={countries}
            sx={{ flex: 1, mb: { md: '20px', xs: '16px' } }}
            textFieldProps={{ label: t('common.labels.country') }}
            value={data.country}
          />
          <AppAutoComplete
            isOptionEqualToValue={(option, value) =>
              option.label === value || value === ''
            }
            loading={loadingCities}
            onInputChange={handleCityInputChange}
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
