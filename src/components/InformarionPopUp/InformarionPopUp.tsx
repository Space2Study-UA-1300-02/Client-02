import React, { MouseEvent } from 'react'
import s from './InformarionPopUp.module.css'

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
  const closePopup = (): void => {
    setIsOpen(false)
  }

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>): void => {
    const popup = document.getElementById('popup')
    if (popup && !popup.contains(event.target as Node)) {
      event.stopPropagation()
    }
  }

  return (
    isOpen && (
      <div className={s.overlay} onClick={handleOverlayClick}>
        <div className={s.popup} id='popup'>
          <button className={s.close_btn} onClick={closePopup}>
            &times;
          </button>
          <div className={s.img_container}>
            <img
              alt='email-popup'
              src='../../assets/img/email-confirmation-modals/email-conf.svg'
            />
          </div>
          <h2>Your email address needs to be verified</h2>
          <p>
            We sent a confirmation email to: <strong>{data.email}. </strong>
            Check your email and click on the confirmation button to continue.
          </p>
        </div>
      </div>
    )
  )
}

export default Popup
