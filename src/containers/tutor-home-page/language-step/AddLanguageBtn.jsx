import AppButton from '~/components/app-button/AppButton'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { styles } from './LanguageStep.styles'

const AddLanguageBtn = ({ addLanguage }) => {
  const { t } = useTranslation()
  return (
    <Box sx={styles}>
      <AppButton onClick={addLanguage} sx={styles.addButton} variant='outlined'>
        {t('becomeTutor.languages.btnText')}
      </AppButton>
    </Box>
  )
}

export default AddLanguageBtn
