import Box from '@mui/material/Box'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'
import img from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { Typography } from '@mui/material'
import { languagesMock } from '../subjects-step/constants'
import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppChipList from '~/components/app-chips-list/AppChipList'
import AddLanguageBtn from './AddLanguageBtn'
import { student } from '~/constants'

const LanguageStep = ({
  userRole,
  btnsBox,
  data,
  errors,
  handleNonInputValueChange,
  handleBlur
}) => {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('')
  const langOptions = useMemo(() => languagesMock.map((lang) => lang.label), [])

  const handleChange = (_, selectedValue) => {
    setLanguage(selectedValue)
  }

  const handleDeleteLanguage = (label) => {
    const filteredLanguages = data.languages.filter((lang) => lang !== label)
    handleNonInputValueChange('languages', filteredLanguages)
  }

  const addLanguage = () => {
    if (language && !data.languages.includes(language)) {
      handleNonInputValueChange('languages', [...data.languages, language])
    }
    setLanguage('')
  }

  const LanguageStepContent = ({ title }) => (
    <Box>
      <Typography>{title}</Typography>
      <AppAutoComplete
        errorMsg={t(errors.languages)}
        isOptionEqualToValue={(option, value) =>
          option === value || value === ''
        }
        onBlur={handleBlur('languages')}
        onChange={handleChange}
        options={langOptions}
        required
        sx={{ mt: '20px' }}
        textFieldProps={{
          label: t('becomeTutor.languages.autocompleteLabel')
        }}
        value={language}
      />
      <AddLanguageBtn addLanguage={addLanguage} />
      <AppChipList
        defaultQuantity={3}
        handleChipDelete={handleDeleteLanguage}
        items={data.languages}
      />
    </Box>
  )

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        <LanguageStepContent
          title={t(
            `becomeTutor.languages.${userRole === student ? 'studentTitle' : 'tutorTitle'}`
          )}
        />
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep