import React, { useState, MouseEvent } from 'react'
import s from './InformarionPopUp.module.css'

const Popup: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

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
          <button className={s.closeBtn} onClick={closePopup}>
            &times;
          </button>
          <h2>Your email address needs to be verified</h2>
          <p>
            We sent a confirmation email to: <strong>eb5oio0p@kzccv.com</strong>
          </p>
          <p>
            Check your email and click on the confirmation button to continue.
          </p>
          <button onClick={closePopup}>OK</button>
        </div>
      </div>
    )
  )
}

export default Popup
