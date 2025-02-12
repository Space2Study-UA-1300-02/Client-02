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
import { student, tutor } from '~/constants'

const LanguageStep = ({ userRole, btnsBox }) => {
  const { t } = useTranslation()
  const [language, setLanguage] = useState('')
  const [languagesList, setLanguagesList] = useState([])
  const langOptions = useMemo(() => languagesMock.map((lang) => lang.label), [])

  const handleChange = (_, selectedValue) => {
    if (selectedValue && !languagesList.includes(selectedValue)) {
      setLanguagesList((prev) => [...prev, selectedValue]);
    }
    setLanguage(selectedValue);
  }

  const handleDeleteLanguage = (label) => {
    setLanguagesList(languagesList.filter((lang) => lang !== label))
  }

  const addLanguage = () => {
    if (!language || languagesList.includes(language)) {
      return
    }
    setLanguagesList([...languagesList, language])
    setLanguage('')
  }

  const StudentLangStep = () => {
    return (
      <Box>
        <Typography>{t('becomeTutor.languages.studentTitle')}</Typography>
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
        <AppChipList
          handleChipDelete={handleDeleteLanguage}
          items={languagesList}
        />
      </Box>
    )
  }

  const TutorLangStep = () => {
    return (
      <Box>
        <Typography>{t('becomeTutor.languages.tutorTitle')}</Typography>
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
        <AppChipList
          handleChipDelete={handleDeleteLanguage}
          items={languagesList}
        />
      </Box>
    )
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={img} sx={styles.img} />
      </Box>
      <Box sx={styles.rigthBox}>
        {userRole === student && <StudentLangStep />}
        {userRole === tutor && <TutorLangStep />}
        {btnsBox}
      </Box>
    </Box>
  )
}

export default LanguageStep
