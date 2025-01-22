import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import AppChipList from '~/components/app-chips-list/AppChipList'

vi.mock('~/components/app-chip/AppChip', () => ({
  default: ({ children, handleDelete, icon }) => (
    <div data-testid='chip'>
      {icon && <span data-testid='chip-icon' />}
      {children}
      {handleDelete && (
        <button data-testid='delete-chip' onClick={handleDelete}>
          Delete
        </button>
      )}
    </div>
  )
}))

vi.mock('~/components/app-popover/AppPopover', () => ({
  default: ({ initialItems, showMoreElem, children }) => (
    <div>
      <div data-testid='initial-items'>{initialItems}</div>
      {showMoreElem && <div data-testid='show-more'>{showMoreElem}</div>}
      <div data-testid='popover-content'>{children}</div>
    </div>
  )
}))

describe('AppChipList', () => {
  const mockHandleChipDelete = vi.fn()
  const defaultProps = {
    items: [
      'Chip 1',
      'Chip 2',
      'Chip 3',
      'Chip 4',
      'Chip 5',
      'Chip 6',
      'Chip 7',
      'Chip 8',
      'Chip 9',
      'Chip 10',
      'Chip 11'
    ],
    defaultQuantity: 7,
    handleChipDelete: mockHandleChipDelete
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should show chips', () => {
    render(<AppChipList {...defaultProps} />)
    const initialItemsContainer = screen.getByTestId('initial-items')
    const chips = initialItemsContainer.querySelectorAll('[data-testid="chip"]')
    expect(chips.length).toBe(defaultProps.defaultQuantity)
  })

  it('should show chip with +3', () => {
    render(<AppChipList {...defaultProps} />)
    const showMore = screen.getByTestId('show-more')
    expect(showMore).toHaveTextContent(
      +`${defaultProps.items.length - defaultProps.defaultQuantity}`
    )
  })

  it('should show only 7 chips', () => {
    render(<AppChipList {...defaultProps} />)
    const initialItems = screen.getByTestId('initial-items')
    expect(initialItems.querySelectorAll('[data-testid="chip"]').length).toBe(7)
  })

  it('should show only 10 chips', () => {
    const updatedProps = { ...defaultProps, defaultQuantity: 10 }
    render(<AppChipList {...updatedProps} />)
    const initialItems = screen.getByTestId('initial-items')
    expect(initialItems.querySelectorAll('[data-testid="chip"]').length).toBe(
      10
    )
  })

  it('should delete 1 chip', () => {
    render(<AppChipList {...defaultProps} />)
    const deleteButtons = screen.getAllByTestId('delete-chip')
    fireEvent.click(deleteButtons[0])
    expect(mockHandleChipDelete).toHaveBeenCalledWith('Chip 1')
    expect(mockHandleChipDelete).toHaveBeenCalledTimes(1)
  })
})
