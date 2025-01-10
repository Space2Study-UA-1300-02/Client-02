import { NavigateFunction } from 'react-router-dom'
import { ItemsWithCount, GetResourcesParams } from '~/types'
import { TFunction } from 'i18next'

export type ResourcesTableData<T> = {
  response: ItemsWithCount<T>
  getData: (params?: GetResourcesParams) => Promise<void>
}

export interface AdditionalPropsInterface {
  t: TFunction
  navigate: NavigateFunction
}
