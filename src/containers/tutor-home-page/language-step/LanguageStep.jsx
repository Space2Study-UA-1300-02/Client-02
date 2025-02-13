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

const LanguageStep = ({ userRole, btnsBox }) => {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('')
  const [languagesList, setLanguagesList] = useState([])
  const langOptions = useMemo(() => languagesMock.map((lang) => lang.label), [])

  const handleChange = (_, selectedValue) => {
    if (!selectedValue) return

    if (userRole === student) {
      setLanguagesList([selectedValue])
    } else if (!languagesList.includes(selectedValue)) {
      setLanguagesList((prev) => [...prev, selectedValue])
    }

    setLanguage(selectedValue)
  }

  const handleDeleteLanguage = (label) => {
    setLanguagesList(languagesList.filter((lang) => lang !== label))
  }

  const addLanguage = () => {
    if (!language) return

    if (userRole === student) {
      setLanguagesList([language])
    } else if (!languagesList.includes(language)) {
      setLanguagesList((prev) => [...prev, language])
    }

    setLanguage('')
  }

  const LanguageStepContent = ({ title }) => (
    <Box>
      <Typography>{title}</Typography>
      <AppAutoComplete
        onChange={handleChange}
        options={langOptions}
        sx={{ mt: '20px' }}
        textFieldProps={{
          label: t('becomeTutor.languages.autocompleteLabel')
        }}
        value={language}
      />
      <AddLanguageBtn addLanguage={addLanguage} />
      <Typography sx={{ fontSize: '12px', marginBottom: '15px' }}>
        {t('becomeTutor.generalInfo.helperText')}
      </Typography>
      <AppChipList
        handleChipDelete={handleDeleteLanguage}
        items={languagesList}
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
