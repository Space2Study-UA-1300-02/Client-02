import { Offer, UserResponse, UserRoleEnum } from '~/types'
import { ChangeEvent, FocusEvent, FormEvent } from 'react'

interface Pagination {
  total: number
  currentPage: number
  totalPages: number
  hasMore: boolean
}

export interface ItemsWithCount<T> {
  count: number
  items: T[]
  data: T[]
  total: number
  pagination: Pagination
}
export interface CommonEntityFields {
  _id: string
  createdAt: string
  updatedAt: string
}

export interface CategoryAppearance {
  icon: string
  color: string
}

export interface DataByRole<T> {
  [UserRoleEnum.Student]: T
  [UserRoleEnum.Tutor]: T
}

export interface CategoryInterface {
  _id: string
  name: string
  appearance: CategoryAppearance
  totalOffers: DataByRole<number>
  createdAt: string
  updatedAt: string
}

export interface CategoryNameInterface {
  _id: string
  name: string
}

export interface SubjectInterface {
  _id: string
  name: string
  category: string
  totalOffers: DataByRole<number>
  createdAt: string
  updatedAt: string
}

export interface SubjectNameInterface {
  _id: string
  name: string
}

export interface ReviewInterface {
  offer: Offer
  author: UserResponse
  comment: string
  rating: number
  createdAt: string
}

export interface Faq {
  _id?: string
  question: string
  answer: string
}
export interface OutletContext {
  pageRef: React.RefObject<HTMLDivElement> | null
}

export interface Breakpoints {
  isDesktop: boolean
  isLaptopAndAbove: boolean
  isLaptop: boolean
  isTablet: boolean
  isMobile: boolean
}
export interface RouteItem {
  route: string
  path: string
}

export interface AddDocuments {
  maxFileSize: number
  maxAllFilesSize: number
  filesTypes: string[]
  fileSizeError: string
  allFilesSizeError: string
  typeError: string
  maxQuantityFiles: number
}

export interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface SignUpFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  handleChange: (
    field: keyof FormData
  ) => (event: ChangeEvent<HTMLInputElement>) => void
  handleBlur: (
    field: keyof FormData
  ) => (event: FocusEvent<HTMLInputElement>) => void
  data: FormData
  errors: Partial<FormData>
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface SignUpDialogProps {
  initialRole: UserRoleEnum
}
