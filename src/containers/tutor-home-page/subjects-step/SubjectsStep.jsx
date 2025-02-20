import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import studyImg from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import Typography from '@mui/material/Typography'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AppButton from '~/components/app-button/AppButton'
import AppChipList from '~/components/app-chips-list/AppChipList'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import { URLs } from '~/constants/request'

const SubjectsStep = ({
  btnsBox,
  handleNonInputValueChange,
  data,
  userRole
}) => {
  const { t } = useTranslation()

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [loadingSubjects, setLoadingSubjects] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${URLs.interests.categories}`)
        if (!response.ok) throw new Error('Failed to fetch categories')
        const categoriesData = await response.json()
        setCategories(
          categoriesData.data.map((category) => ({
            id: category.id,
            label: category.name
          }))
        )
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoadingCategories(false)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    if (!selectedCategory) return

    const fetchSubjects = async () => {
      if (!selectedCategory?.id) {
        console.error('selectedCategory.id undefined')
        return
      }

      setLoadingSubjects(true)

      const url = `${URLs.interests.subjects}${selectedCategory.id}`

      try {
        const response = await fetch(url)
        const data = await response.json()
        if (!response.ok) {
          throw new Error(`Failed to fetch subjects: ${response.status}`)
        }
        const items = data.items ?? []
        if (!Array.isArray(items)) {
          throw new Error('Is not array')
        }
        const subjects = items.map((item) => ({
          id: item._id,
          label: item.name
        }))
        setSubjects(subjects)
      } catch (error) {
        console.error('Error fetching subjects:', error)
      } finally {
        setLoadingSubjects(false)
      }
    }

    fetchSubjects()
  }, [selectedCategory])

  const handleInputCategory = (event, value) => {
    setSelectedCategory(value)
    setSubjects([])
    setSelectedSubject(null)
  }

  const handleInputSubject = (event, value) => {
    setSelectedSubject(value)
  }

  const handleClick = () => {
    if (selectedSubject && !data.subjects.includes(selectedSubject)) {
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
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            loading={loadingCategories}
            onChange={handleInputCategory}
            options={categories}
            sx={{ flex: 1 }}
            textFieldProps={{
              label: t(
                `becomeTutor.categories.${userRole === 'student' ? 'categoryStudentLabel' : 'categoryTutorLabel'}`
              )
            }}
            value={selectedCategory}
          />
          <AppAutoComplete
            fullWidth
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) =>
              option.label === value?.label
            }
            loading={loadingSubjects}
            onChange={handleInputSubject}
            options={subjects}
            sx={{ flex: 1 }}
            textFieldProps={{ label: t('becomeTutor.categories.subjectLabel') }}
            value={selectedSubject}
          />
          <AppButton onClick={handleClick} variant='tonal'>
            {t('becomeTutor.categories.btnText')}
          </AppButton>
          <AppChipList
            defaultQuantity={2}
            handleChipDelete={handleChipDelete}
            items={data.subjects.map((item) => item.label)}
          />
        </Box>
        {btnsBox}
      </Box>
    </Box>
  )
}

export default SubjectsStep
