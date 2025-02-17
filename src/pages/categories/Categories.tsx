import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, TextField, Button, Link, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styles } from '~/pages/categories/Categories.styles'
import useAxios from '~/hooks/use-axios'
import { categoryService } from '~/services/category-service'
import { CategoryInterface, SizeEnum } from '~/types'
import CardWithLink from '~/components/card-with-link/CardWithLink'
import { authRoutes } from '~/router/constants/authRoutes'
import CardsList from '~/components/cards-list/CardsList'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import DirectionLink from '~/components/direction-link/DirectionLink'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import OfferRequestBlock from '~/containers/find-offer/offer-request-block/OfferRequestBlock'

const Categories = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const { t } = useTranslation()

  const { response: categories, loading } = useAxios({
    service: categoryService.getCategories,
    defaultResponse: []
  })

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/find-offers?search=${encodeURIComponent(query)}`)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const cards = useMemo(
    () =>
      categories.map((item: CategoryInterface) => {
        return (
          <CardWithLink
            description={`235 ${t('categoriesPage.offers')}`}
            img={item.appearance.icon}
            key={item._id}
            link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [categories, t]
  )

  return (
    <PageWrapper>
      <OfferRequestBlock />

      <TitleWithDescription
        description={t('common.description')}
        style={styles.titleWithDescription}
        title={t('common.categoriestitle')}
      />

      <Box sx={styles.navigation}>
        <DirectionLink
          after={<ArrowForwardIcon fontSize={SizeEnum.Small} />}
          linkTo={authRoutes.findOffers.path}
          title={t('subjectsPage.subjects.showAllOffers')}
        />
      </Box>

      <Box sx={styles.searchBox}>
        <SearchIcon sx={styles.searchIcon} />
        <TextField
          InputProps={{ disableUnderline: true }}
          fullWidth
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={t('common.learningLabel')}
          sx={styles.searchInput}
          value={query}
          variant='standard'
        />
        <Button
          onClick={handleSearch}
          sx={styles.searchButton}
          variant={styles.searchButton.variant}
        >
          {t('common.search')}
        </Button>
      </Box>

      <Typography sx={styles.infoText} variant='body2'>
        Can&apos;t find what you&apos;re looking for? Request a new{' '}
        <Link component='button'>{t('common.category')}</Link>
        or
        <Link component='button'>{t('common.subject')}</Link>!
      </Typography>

      <CardsList
        btnText={t('categoriesPage.viewMore')}
        cards={cards}
        isExpandable
        loading={loading}
        onClick={() => {}}
      />
    </PageWrapper>
  )
}

export default Categories
