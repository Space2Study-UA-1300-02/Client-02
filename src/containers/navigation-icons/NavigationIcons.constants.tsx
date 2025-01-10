import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import { IconButtonProps } from '@mui/material/IconButton'

import { styles } from '~/containers/navigation-icons/NavigationIcons.styles'

type ButtonProps = (props: {
  openLoginDialog?: () => void
  openMenu?: () => void
  setSidebarOpen?: () => void
  openNotifications?: () => void
}) => IconButtonProps

type BadgeContent = (props: { notifications: number }) => number

interface NavigationIconButton {
  disabled?: boolean
  tooltip: string
  icon: React.ReactElement
  buttonProps: ButtonProps
  badgeContent?: BadgeContent
}

const languageIcon = {
  disabled: true,
  tooltip: 'iconsTooltip.language',
  icon: <LanguageIcon color='disabled' />,
  buttonProps: () => ({ sx: styles.studentIcons })
}

const menuIcon: NavigationIconButton = {
  tooltip: 'iconsTooltip.menu',
  icon: <MenuIcon />,
  buttonProps: ({ setSidebarOpen }) => ({
    onClick: setSidebarOpen,
    sx: styles.showOnlyOnMobile
  })
}

export const guestIcons: NavigationIconButton[] = [
  languageIcon,
  {
    tooltip: 'iconsTooltip.login',
    icon: <LoginIcon />,
    buttonProps: ({ openLoginDialog }) => ({
      onClick: openLoginDialog,
      sx: styles.showOnlyOnMobile
    })
  },
  menuIcon
]

export const userIcons: NavigationIconButton[] = [
  languageIcon,
  {
    tooltip: 'iconsTooltip.account',
    icon: <AccountCircleOutlinedIcon />,
    buttonProps: ({ openMenu }) => ({
      onClick: openMenu,
      sx: styles.studentIcons
    })
  },
  menuIcon
]
