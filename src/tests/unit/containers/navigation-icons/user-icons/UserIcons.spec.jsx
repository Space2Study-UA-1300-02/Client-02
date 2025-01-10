import { screen, fireEvent } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import UserIcons from '~/containers/navigation-icons/user-icons/UserIcons'
import { vi } from 'vitest'

const openLoginDialog = vi.fn()
const setIsSidebarOpen = vi.fn()

describe('test with user role', () => {
  beforeEach(() => {
    renderWithProviders(
      <UserIcons
        openLoginDialog={openLoginDialog}
        setSidebarOpen={setIsSidebarOpen}
      />
    )
  })

  it('should render click menu icon', () => {
    const menuIcon = screen.getByTestId('MenuIcon')
    fireEvent.click(menuIcon)

    expect(setIsSidebarOpen).toBeCalled()
  })

  it('should open account menu', async () => {
    const accountMenuIcon = screen.getByTestId('AccountCircleOutlinedIcon')
    fireEvent.click(accountMenuIcon)
    const accountMenuLogout = await screen.findByText('header.logout')

    expect(accountMenuLogout).toBeInTheDocument()
  })
})
