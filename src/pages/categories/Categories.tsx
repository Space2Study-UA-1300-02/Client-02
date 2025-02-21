import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, TextField, Button, Link, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styles } from '~/pages/categories/Categories.styles'
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
import { useLocation, useNavigate } from 'react-router-dom'
import NotFoundResults from '~/components/not-found-results/NotFoundResults'

const Categories = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(location.search)
    return params.get('search') || ''
  })
  const [categories, setCategories] = useState<CategoryInterface[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (query) {
      params.set('search', query)
    } else {
      params.delete('search')
    }
    params.set('page', page.toString())
    navigate({ search: params.toString() }, { replace: true })
  }, [page, query, navigate])

  useEffect(() => {
    setPage(1)
    setHasMore(true)

    if (query.trim() === '') {
      fetchCategories(1)
    } else {
      fetchCategories(1, query)
    }
  }, [query])

  const fetchCategories = async (pageNum: number, searchQuery = '') => {
    if (!hasMore && pageNum !== 1) return
    setLoading(true)

    try {
      const response = await categoryService.getCategories({
        page: pageNum,
        search: searchQuery,
        limit: 6
      })

      console.log('Fetched data:', response.data)
      console.log('Pagination:', response.data.pagination)

      setCategories(
        pageNum === 1
          ? response.data.data
          : (prev) => [...prev, ...response.data.data]
      )
      setHasMore(response.data.pagination.hasMore)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setCategories([])
    setPage(1)
    setHasMore(true)
    fetchCategories(1, query)
  }

  const handleViewMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchCategories(nextPage, query)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const cards = useMemo(
    () =>
      categories.map((item: CategoryInterface) => (
        <CardWithLink
          description={`235 ${t('categoriesPage.offers')}`}
          img={item.appearance?.icon}
          key={item._id}
          link={`${authRoutes.subjects.path}?categoryId=${item._id}`}
          title={item.name}
        />
      )),
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
          onChange={handleInputChange}
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
        Can&apos;t find what you&apos;re looking for? Request a new&nbsp;
        <Link component='button'>{t('common.category')}</Link>&nbsp; or&nbsp;
        <Link component='button'>{t('common.subject')}</Link>!
      </Typography>
      <CardsList
        btnText={t('categoriesPage.viewMore')}
        cards={cards}
        isExpandable={hasMore}
        loading={loading}
        onClick={handleViewMore}
      />
      {query.trim() !== '' && !loading && categories.length === 0 && (
        <NotFoundResults description={t('errorMessages.resultsNotFound')} />
      )}
    </PageWrapper>
  )
}

export default Categories
