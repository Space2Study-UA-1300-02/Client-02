import { useTranslation } from 'react-i18next'
import { Avatar, Box, Typography } from '@mui/material'

import AppCard from '../app-card/AppCard'
import AppRating from '../app-rating/AppRating'
import AppButton from '../app-button/AppButton'
import SubjectLevelChips from '../subject-level-chips/SubjectLevelChips'

import { styles } from '~/components/offer-card/OfferCard.styles'
import { ButtonVariantEnum } from '~/types'
import LanguageIcon from '@mui/icons-material/Language'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined'

const OfferCard = ({ offer }) => {
  const { t } = useTranslation()

  return (
    <AppCard sx={styles.card}>
      <Box sx={styles.authorContainer}>
        <AppButton
          onClick={() => {}}
          sx={styles.imageButton}
          variant={ButtonVariantEnum.Text}
        >
          <Avatar src={offer.author.photo} sx={styles.image} />
        </AppButton>
        <Typography sx={styles.fullName} variant={'h6'}>
          {offer.author.firstName} {offer.author.lastName.slice(0, 1)}.
        </Typography>
        <Typography sx={styles.fullName} variant={'h6'}></Typography>
        <AppRating showNumber sx={styles.rating} value={3.3} />
        <Typography sx={styles.reviews} variant={'body2'}>
          {t('tutorProfilePage.reviews.reviewsCount', { count: 0 })}
        </Typography>
      </Box>
      <Box sx={styles.infoContainer}>
        <Typography variant={'h5'}>{offer.title}</Typography>
        <Box sx={styles.subjectInfo}>
          <SubjectLevelChips
            // color={offer.category.appearance.color}
            proficiencyLevel={offer.proficiencyLevel}
            subject={offer.subject.name}
          />
        </Box>
        <Typography variant={'body2'}>{offer.description}</Typography>
        <Box sx={styles.languages}>
          <LanguageIcon sx={{ marginRight: '8px' }} />
          {offer.languages.map((language) => (
            <Typography key={language}>{language}</Typography>
          ))}
        </Box>
      </Box>
      <Box sx={styles.actionsContainer}>
        <Box sx={styles.currencyBlock}>
          <Box>
            <Typography variant={'h6'}>
              {offer.price} {t('findOffers.currency')}
            </Typography>
            <Typography variant={'body2'}>/{t('findOffers.hour')}</Typography>
          </Box>
          <BookmarkBorderOutlinedIcon sx={{ cursor: 'pointer' }} />
        </Box>
        <AppButton>{t('button.showDetails')}</AppButton>
        <AppButton variant={'tonal'}>{t('button.sendMessage')}</AppButton>
      </Box>
    </AppCard>
  )
}

export default OfferCard
