import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { useTranslation } from 'react-i18next'
import '@testing-library/jest-dom'

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}))

describe('SearchAutocomplete', () => {
  const mockSetSearch = vi.fn()
  // const mockOnSearchChange = vi.fn()

  beforeEach(() => {
    useTranslation.mockReturnValue({ t: (key) => key })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render autocomplete with search input', () => {
    render(
      <SearchAutocomplete
        search=''
        setSearch={mockSetSearch}
        textFieldProps={{}}
      />
    )

    const input = screen.getByRole('combobox')
    expect(input).toBeInTheDocument()
  })
})
