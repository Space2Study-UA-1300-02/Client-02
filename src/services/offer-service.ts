import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { Offer, ItemsWithCount} from '~/types'

export const offerService = {
  getOffers: (
  ): Promise<AxiosResponse<ItemsWithCount<Offer>>> => {
    return axiosClient.get(URLs.offers.get)
  }
}
