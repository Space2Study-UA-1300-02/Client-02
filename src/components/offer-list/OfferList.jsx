import { Box } from '@mui/material'
import OfferCard from '~/components/offer-card/OfferCard'
import { styles } from '~/components/offer-list/OfferList.styles'

const OfferCardList = ({ offers }) => {
  return (
    <Box sx={{ ...styles.container, ...styles['container--list'] }}>
      {offers?.map((offer) =>
          <OfferCard key={offer._id} offer={offer} />
      )}
    </Box>
  )
}

export default OfferCardList
