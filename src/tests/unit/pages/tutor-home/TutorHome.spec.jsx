import { screen, waitFor } from '@testing-library/react'
import { mockAxiosClient, renderWithProviders } from '~tests/test-utils'
import TutorHome from '~/pages/tutor-home/TutorHome'
import { URLs } from '~/constants/request'

const userId = '63f5d0ebb'
const userRole = 'tutor'
const userDataMock = { _id: userId, firstName: 'test', lastName: 'test' }

mockAxiosClient
  .onGet(`${URLs.users.get}/${userId}?role=${userRole}`)
  .reply(200, userDataMock)

describe('TutorHome component', () => {
  const secondLoginState = {
    appMain: { isFirstLogin: false, userRole, userId }
  }

  it("shouldn't render a BecomeATutor modal when logging in for the second time", () => {
    renderWithProviders(<TutorHome />, { preloadedState: secondLoginState })

    const titleToFind = screen.queryByText(/becomeTutor.generalInfo.title/i)

    waitFor(() => expect(titleToFind).not.toBeInTheDocument())
  })
})
