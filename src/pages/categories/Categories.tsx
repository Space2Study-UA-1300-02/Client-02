import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, TextField, Button, Link, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styles } from '~/pages/categories/Categories.styles'
import CategoriesList from '~/components/categories-list/CategoriesList'

const Categories = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

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
  const { t } = useTranslation()

  return (
    <Box sx={styles.container}>
      <Typography gutterBottom sx={styles.heading} variant='h4'>
        {t('common.categoriestitle')}
      </Typography>
      <Typography gutterBottom sx={styles.subtitle} variant='subtitle1'>
        {t('common.description')}
      </Typography>
      <Box sx={styles.linkWrapper}>
        <Link
          component='button'
          onClick={() => navigate('/find-offers')}
          variant='body2'
        >
          {t('common.showAllOffers')} &rarr;
        </Link>
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
      <CategoriesList />
    </Box>
  )
}

export default Categories
