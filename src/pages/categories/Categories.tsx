import React, { useMemo, useState } from 'react'
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
  const [filteredCategories, setFilteredCategories] = useState<
    CategoryInterface[] | null
  >(null)

  const { t } = useTranslation()

  const { response: categories, loading } = useAxios({
    service: categoryService.getCategories,
    defaultResponse: []
  })

  const handleSearch = async () => {
    try {
      const response = await categoryService.searchCategories({ search: query })
      setFilteredCategories(response.data.data)
    } catch (error) {
      console.error('Search error:', error)
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      void handleSearch()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value === '') {
      setFilteredCategories(null)
    }
  }

  const displayedCategories =
    filteredCategories !== null ? filteredCategories : categories
  const cards = useMemo(
    () =>
      displayedCategories.map((item: CategoryInterface) => {
        return (
          <CardWithLink
            description={`235 ${t('categoriesPage.offers')}`}
            img={item.appearance?.icon}
            key={item._id}
            link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
            title={item.name}
          />
        )
      }),
    [displayedCategories, t]
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
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder={t('common.learningLabel')}
          sx={styles.searchInput}
          value={query}
          variant='standard'
        />
        <Button
          onClick={() => void handleSearch()}
          sx={styles.searchButton}
          variant={styles.searchButton.variant}
        >
          {t('common.search')}
        </Button>
      </Box>

      <Typography sx={styles.infoText} variant='body2'>
        Can&apos;t find what you&apos;re looking for? Request a new&nbsp;
        <Link component='button'>{t('common.category')}</Link>&nbsp; or&nbsp;
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
