import useAxios from '~/hooks/use-axios'
import CardsList from '~/components/cards-list/CardsList'
import { categoryService } from '~/services/category-service'
import { useTranslation } from 'react-i18next'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { authRoutes } from '~/router/constants/authRoutes'

import icon from '../../assets/img/student-home-page/service_icon.png'

import { styles } from '~/components/categories-list/CategoriesList.styles'

const CategoriesList = () => {
  // const [limit, setLimit] = useState(12)

  const { t } = useTranslation()

  const { response, loading } = useAxios({
    service: categoryService.getCategories,
    defaultResponse: []
  })

  const navigate = useNavigate()

  const handleCategoryClick = (categoryId) => {
    navigate(`${authRoutes.subjects.path}?categoryId=${categoryId}`)
  }

  const categories = response.map((category) => (
    <Box
      key={category._id}
      onClick={() => handleCategoryClick(category._id)}
      sx={styles.card}
    >
      <Box sx={styles.iconContainer}>
        <img alt={category.name} height={62} src={icon} width={62} />
      </Box>

      <Box sx={styles.textContainer}>
        <Typography sx={styles.title}>{category.name}</Typography>
        <Typography sx={styles.subtitle}>234 Offers</Typography>
      </Box>
    </Box>
  ))

  return (
    <div style={{ marginTop: '30px', marginBottom: '100px' }}>
      <CardsList
        btnText={t('categoriesPage.viewMore')}
        cards={categories}
        isExpandable
        loading={loading}
      />
    </div>
  )
}

export default CategoriesList
