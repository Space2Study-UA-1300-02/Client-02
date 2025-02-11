import { FC, useState, useRef } from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { PaperProps } from '@mui/material'
import { useModalContext } from '~/context/modal-context'
import { isValidElement } from 'react'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'
import InformationPopUp from '~/components/InformarionPopUp/InformationPopUp'
import useBreakpoints from '~/hooks/use-breakpoints'
import { styles } from '~/components/popup-dialog/PopupDialog.styles'
import ConfirmDialog from '~/components/confirm-dialog/ConfirmDialog'

interface PopupDialogProps {
  content: React.ReactNode
  paperProps: PaperProps
  timerId: NodeJS.Timeout | null
  closeModalAfterDelay: (delay?: number) => void
}

const PopupDialog: FC<PopupDialogProps> = ({
  content,
  paperProps,
  timerId,
  closeModalAfterDelay
}) => {
  const { isMobile } = useBreakpoints()
  const { closeModal } = useModalContext()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)

  const handleCloseClick = () => {
    if (
      isValidElement(content) &&
      (content.type === LoginDialog ||
        content.type === EmailConfirmModal ||
        content.type === InformationPopUp)
    ) {
      closeModal()
    } else {
      setIsConfirmDialogOpen(true)
    }
  }

  const handleConfirmClose = () => {
    closeModal()
    setIsConfirmDialogOpen(false)
  }

  const handleCancelClose = () => {
    setIsConfirmDialogOpen(false)
  }

  const handleMouseOver = () => timerId && clearTimeout(timerId)
  const handleMouseLeave = () => timerId && closeModalAfterDelay()

  return (
    <Dialog
      PaperProps={paperProps}
      data-testid='popup'
      disableRestoreFocus
      fullScreen={isMobile}
      maxWidth='xl'
      onClick={(e) => {
        if (
          dialogRef.current &&
          !dialogRef.current.contains(e.target as Node)
        ) {
          setIsConfirmDialogOpen(false)
        }
      }}
      open
    >
      <Box
        data-testid='popupContent'
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleMouseOver}
        ref={dialogRef}
        sx={styles.box}
      >
        <IconButton onClick={handleCloseClick} sx={styles.icon}>
          <CloseIcon />
        </IconButton>
        <Box sx={styles.contentWraper}>{content}</Box>
      </Box>

      {isConfirmDialogOpen && (
        <ConfirmDialog
          message='questions.unsavedChanges'
          onConfirm={handleConfirmClose}
          onDismiss={handleCancelClose}
          open={isConfirmDialogOpen}
          title='titles.confirmTitle'
        />
      )}
    </Dialog>
  )
}

export default PopupDialog
