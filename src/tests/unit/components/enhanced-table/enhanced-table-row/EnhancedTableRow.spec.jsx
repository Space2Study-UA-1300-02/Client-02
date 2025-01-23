import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, vi } from 'vitest'
import EnhancedTableRow from '~/components/enhanced-table/enhanced-table-row/EnhancedTableRow'

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn()
}))
const columnsMock = [
  {
    label: 'Name',
    field: 'name',
    dataType: 'string'
  },
  {
    label: 'Email',
    field: 'email',
    dataType: 'string'
  }
]
const rowActionsMock = [
  { label: 'Delete', func: vi.fn() },
  { label: 'Add', func: vi.fn() }
]
const mockedCommonProps = {
  columns: columnsMock,
  isSelection: true,
  item: { _id: '1', name: 'John Doe', email: 'john30@gmail.com' },
  refetchData: vi.fn(),
  rowActions: rowActionsMock,
  onRowClick: vi.fn(),
  select: { isSelected: vi.fn(), handleSelectClick: vi.fn() },
  selectedRows: []
}

describe('EnhancedTableRow component', () => {
  beforeEach(() => {
    render(
      <table>
        <tbody>
          <EnhancedTableRow {...mockedCommonProps} />
        </tbody>
      </table>
    )
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should render table row with correct data', () => {
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john30@gmail.com')).toBeInTheDocument()
  })
  it('should call handleSelectClick when checkbox is clicked', async () => {
    const checkbox = screen.getByRole('checkbox')
    await userEvent.click(checkbox)
    expect(mockedCommonProps.select.handleSelectClick).toHaveBeenCalledTimes(1)
  })
  it('should render action menu when menu icon is clicked', async () => {
    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)
    const actionMenu = screen.getByRole('menu')
    expect(actionMenu).toBeInTheDocument()
  })
  it('should call onAction function when clicking on the menu item', async () => {
    await userEvent.click(screen.getByTestId('menu-icon'))
    const menuItem = screen.getByText('Delete')
    await userEvent.click(menuItem)
    expect(rowActionsMock[0].func).toHaveBeenCalledWith(
      mockedCommonProps.item._id
    )
  })
  it('should close menu when "escape" is pressed', async () => {
    const menuIcon = screen.getByTestId('menu-icon')
    await userEvent.click(menuIcon)
    await userEvent.keyboard('{Esc}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
