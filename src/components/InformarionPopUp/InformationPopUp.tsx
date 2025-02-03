import React, { MouseEvent, useCallback, useEffect, useRef } from 'react'
import s from './InformationPopUp.module.css'
import emailConfirmationImage from '~/assets/img/email-confirmation-modals/email-conf.svg'

interface PopupProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  data: {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }
}

const Popup: React.FC<PopupProps> = ({ isOpen, setIsOpen, data }) => {
  const closePopup = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const popupRef = useRef<HTMLDivElement>(null)
  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>): void => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      closePopup()
    }
  }

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closePopup()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closePopup])

  return (
    isOpen && (
      <div className={s.overlay} onClick={handleOverlayClick}>
        <div
          aria-describedby='popup-description'
          aria-labelledby='popup-title'
          aria-modal='true'
          className={s.popup}
          ref={popupRef}
          role='dialog'
        >
          <button
            aria-label='Close popup'
            className={s.close_btn}
            onClick={closePopup}
          >
            &times;
          </button>
          <div className={s.img_container}>
            <img alt='Email confirmation popup' src={emailConfirmationImage} />
          </div>
          <h2 id='popup-title'>Your email address needs to be verified</h2>
          <p>
            We sent a confirmation email to: <strong>{data.email}. </strong>
            Check your email and click on the confirmation button to continue.
          </p>
          <button className={s.btn_ok} onClick={closePopup}>
            OK
          </button>
        </div>
      </div>
    )
  )
}

export default Popup
