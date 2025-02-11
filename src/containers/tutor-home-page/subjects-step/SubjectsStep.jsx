import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import studyImg from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { Typography } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'
import { categoriesMock, subjectsMock } from './constants'
import useForm from '~/hooks/use-form'
import { useState } from 'react'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { handleNonInputValueChange, data } = useForm({
    initialValues: {
      subjects: []
    }
  })
  const [selectedCategory, setSelectedCategory] = useState('')
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState('')
  const handleInputCategory = (value) => {
    const newValue = value ? value.label : ''
    setSelectedCategory(newValue)
    value ? setSubjects(subjectsMock[newValue]) : setSubjects([])
    setSelectedSubject('')
  }
  const handleInputSubject = (value) => {
    const newValue = value ? value.label : ''
    setSelectedSubject(newValue)
  }
  const handleClick = () => {
    if (!data.subjects.includes(selectedSubject) && selectedSubject) {
      handleNonInputValueChange('subjects', [...data.subjects, selectedSubject])
    }
  }
  const handleChipDelete = (subject) => {
    const filteredSubjects = data.subjects.filter((item) => item !== subject)
    handleNonInputValueChange('subjects', filteredSubjects)
  }
  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='A girl is studying'
          component='img'
          src={studyImg}
          sx={styles.img}
        />
      </Box>
      <Box sx={styles.rigthBox}>
        <Typography sx={{ mb: { md: '20px', sm: '16px' } }}>
          {t('becomeTutor.categories.title')}
        </Typography>
        <Box sx={styles.fieldContainer}>
          <AppAutoComplete
            fullWidth
            isOptionEqualToValue={(option, value) =>
              option.label === value || value === ''
            }
            onChange={(ev, value) => handleInputCategory(value)}
            options={categoriesMock}
            sx={{ flex: 1, mb: { md: '20px', xs: '16px' } }}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={selectedCategory}
          />
          <AppAutoComplete
            fullWidth
            isOptionEqualToValue={(option, value) =>
              option.label === value || value === ''
            }
            onChange={(ev, value) => handleInputSubject(value)}
            options={subjects}
            sx={{ flex: 1, mb: { md: '20px', xs: '16px' } }}
            textFieldProps={{ label: t('becomeTutor.categories.subjectLabel') }}
            value={selectedSubject}
          />
          <AppButton onClick={handleClick} variant='tonal'>
            {t('becomeTutor.categories.btnText')}
          </AppButton>
          <AppChipList
            defaultQuantity={2}
            handleChipDelete={handleChipDelete}
            items={data.subjects}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
