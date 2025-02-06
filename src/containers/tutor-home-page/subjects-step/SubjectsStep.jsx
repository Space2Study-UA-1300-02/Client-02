import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import studyImg from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { Typography } from '@mui/material'
import { categoriesMock, subjectsMock } from './constants'
import useForm from '~/hooks/use-form'
import { useState } from 'react'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()
  const { handleNonInputValueChange, data } = useForm({
    initialValues: {
      category: '',
      subject: ''
    }
  })
  const [subjects, setSubjects] = useState([])
  const handleInput = (input, value) => {
    const newValue = value ? value.label : ''
    handleNonInputValueChange(input, newValue)
    if (input === 'category') {
      value ? setSubjects(subjectsMock[newValue]) : setSubjects([])
      handleNonInputValueChange('subject', '')
    }
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
            onChange={(ev, value) => handleInput('category', value)}
            options={categoriesMock}
            sx={{ flex: 1, mb: { md: '20px', xs: '16px' } }}
            textFieldProps={{
              label: t('becomeTutor.categories.mainSubjectsLabel')
            }}
            value={data.category}
          />
          <AppAutoComplete
            fullWidth
            isOptionEqualToValue={(option, value) =>
              option.label === value || value === ''
            }
            onChange={(ev, value) => handleInput('subject', value)}
            options={subjects}
            sx={{ flex: 1, mb: { md: '20px', xs: '16px' } }}
            textFieldProps={{ label: t('becomeTutor.categories.subjectLabel') }}
            value={data.subject}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
