import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { useTranslation } from 'react-i18next'
import '@testing-library/jest-dom'

vi.mock('react-i18next', () => ({
  useTranslation: vi.fn()
}))

describe('SearchAutocomplete', () => {
  const mockSetSearch = vi.fn()
  const options = ['apple', 'banana', 'apricot']

  const defaultProps = {
    search: '',
    setSearch: mockSetSearch,
    textFieldProps: {}
  }

  beforeEach(() => {
    useTranslation.mockReturnValue({ t: (key) => key })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render autocomplete with search input', () => {
    render(<SearchAutocomplete {...defaultProps} />)

    const input = screen.getByRole('combobox')
    expect(input).toBeInTheDocument()
  })

  it('should updates search input on typing', () => {
    render(<SearchAutocomplete {...defaultProps} />)

    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(input.value).toBe('test')
  })

  it('should filter options on typing', () => {
    render(<SearchAutocomplete {...defaultProps} options={options} />)

    const input = screen.getByRole('combobox')
    fireEvent.change(input, { target: { value: 'ap' } })

    expect(screen.getByText('apple')).toBeInTheDocument()
    expect(screen.queryByText('banana')).not.toBeInTheDocument()
  })

  it('should select an option on click', () => {
    render(<SearchAutocomplete {...defaultProps} options={options} />)

    const input = screen.getByRole('combobox')
    fireEvent.mouseDown(input)

    const option = screen.getByText('apple')
    expect(option).toBeInTheDocument()

    fireEvent.click(option)

    expect(mockSetSearch).toHaveBeenCalledWith('apple')
  })

  it('should clears search input on clear icon click', () => {
    render(<SearchAutocomplete {...defaultProps} search='test' />)

    const input = screen.getByRole('combobox')

    const button = screen.getByTestId('clear-search')
    fireEvent.click(button)

    expect(input.value).toBe('')
    expect(mockSetSearch).toHaveBeenCalledWith('')
  })

  it('should triggers search on search button click', () => {
    render(<SearchAutocomplete {...defaultProps} search='test' />)

    const button = screen.getByTestId('search')
    fireEvent.click(button)

    expect(mockSetSearch).toHaveBeenCalledWith('test')
  })
})
