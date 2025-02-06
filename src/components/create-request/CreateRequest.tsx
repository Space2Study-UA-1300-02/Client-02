import React, { useState } from 'react'
import s from './CreateRequest.module.css'
import createRequestImg from '~/assets/img/create-request/subject_icon.png'

interface CreateRequest {
  userRole: 'student' | 'tutor'
}

export const CreateRequest: React.FC<CreateRequest> = ({ userRole }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const isStudent = userRole === 'student'

  return (
    <div className={s.container}>
      <div className={s.content}>
        <h2>
          {isStudent
            ? 'Tutors for private lessons'
            : 'Students for private lessons'}
        </h2>
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
        </p>
        <button className={s.button} onClick={() => setIsOpen(true)}>
          {isStudent ? 'Create request' : 'Create offer'}
        </button>
      </div>

      <div className={s.image}>
        <img alt='Tutoring' src={createRequestImg} />
      </div>
    </div>
  )
}
