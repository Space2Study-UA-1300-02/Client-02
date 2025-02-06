import React, { MouseEvent, useCallback, useEffect, useRef } from 'react'
import s from './InformationPopUp.module.css'
import emailConfirmationImage from '~/assets/img/email-confirmation-modals/email-conf.svg'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

interface PopupProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  data: {
    firstName: string
    lastName: string
    email: string
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
    if (isOpen) {
      if (popupRef.current) {
        disableBodyScroll(popupRef.current)
      }
      const closeButton = popupRef.current?.querySelector('button')
      closeButton?.focus()
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closePopup()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      if (popupRef.current) {
        enableBodyScroll(popupRef.current)
      }
    }
  }, [isOpen, closePopup])

  return (
    isOpen && (
      <div className={s.overlay} onClick={handleOverlayClick}>
        <div
          aria-describedby='popup-description'
          aria-labelledby='popup-title'
          aria-live='polite'
          aria-modal='true'
          className={s.popup}
          ref={popupRef}
          role='dialog'
          tabIndex={-1}
        >
          <button
            aria-label='Close popup'
            className={s.close_btn}
            onClick={closePopup}
          >
            <svg aria-hidden='true' height='24' viewBox='0 0 24 24' width='24'>
              <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
            </svg>
          </button>
          <div className={s.img_container}>
            <img alt='Email confirmation popup' src={emailConfirmationImage} />
          </div>
          <h2 id='popup-title'>Your email address needs to be verified</h2>
          <p>
            We sent a confirmation email to:
            <br />
            <strong>{data.email}</strong>
            <br />
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
