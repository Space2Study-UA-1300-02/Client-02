import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import SearchInput from '~/components/search-input/SearchInput'
import '@testing-library/jest-dom'

describe('SearchInput component', () => {
  const mockSetSearch = vi.fn()

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should call setSearch when search icon is clicked', () => {
    render(<SearchInput search='' setSearch={mockSetSearch} />)

    const searchIcon = screen.getByTestId('search-icon')
    fireEvent.click(searchIcon)

    expect(mockSetSearch).toHaveBeenCalled()
  })

  it('should call setSearch with an empty string when delete icon is clicked', () => {
    render(<SearchInput search='test' setSearch={mockSetSearch} />)

    const deleteIcon = screen.getByTestId('delete-icon')
    fireEvent.click(deleteIcon)

    expect(mockSetSearch).toHaveBeenCalledWith('')
  })

  it('should call setSearch when enter is pressed', () => {
    render(<SearchInput search='' setSearch={mockSetSearch} />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'new value' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 })

    expect(mockSetSearch).toHaveBeenCalledWith('new value')
  })

  it('should have hidden class if search is empty', () => {
    render(<SearchInput search='' setSearch={mockSetSearch} />)

    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('hidden')
  })

  it('should have visible class if search is not empty', () => {
    render(<SearchInput search='test' setSearch={mockSetSearch} />)

    const deleteIcon = screen.getByTestId('delete-icon')
    expect(deleteIcon).toHaveClass('visible')
  })

  it('should render text correctly', () => {
    render(<SearchInput search='initial text' setSearch={mockSetSearch} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('initial text')
  })
})
