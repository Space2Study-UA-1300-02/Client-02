import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'
import EnhancedTablePagination from '~/components/enhanced-table/enhanced-table-pagination/EnhancedTablePagination'

const paginationProps = {
  page: 1,
  pageInput: '1',
  rowsPerPage: 5,
  pageCount: 20,
  itemsCount: 100,
  handleChangePage: vi.fn(),
  handleChangeRowsPerPage: vi.fn(),
  handleChangePageInput: vi.fn(),
  handlePageSubmit: vi.fn()
}
describe('EnhancedTablePagination component', () => {
  beforeEach(() => {
    render(<EnhancedTablePagination pagination={paginationProps} />)
  })
  it('should render first page', () => {
    const input = screen.getByTestId('pagination-page-input')
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('1')
  })
  it('should change page from 1 to 2', async () => {
    const input = screen.getByTestId('pagination-page-input')
    userEvent.clear(input)
    userEvent.type(input, '2')
    expect(paginationProps.handleChangePageInput).toHaveBeenCalledTimes(1)
    const nextPageButton = screen.getByLabelText('Go to next page')
    await userEvent.click(nextPageButton)
    expect(paginationProps.handleChangePage).toHaveBeenCalledTimes(1)
  })
})
