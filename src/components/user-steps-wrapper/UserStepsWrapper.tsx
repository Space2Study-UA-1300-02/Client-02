import { FC, useEffect, useState, useCallback } from 'react'
import { useAppDispatch } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import useForm from '~/hooks/use-form'
import { firstName, lastName } from '~/utils/validations/login'
import { languages } from '~/utils/validations/stepper'
import { useAppSelector } from '~/hooks/use-redux'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'
import { UserRole } from '~/types'
import { StepProvider } from '~/context/step-context'

import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'
import AddPhotoStep from '~/containers/tutor-home-page/add-photo-step/AddPhotoStep'
import SubjectsStep from '~/containers/tutor-home-page/subjects-step/SubjectsStep'
import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

import {
  studentStepLabels,
  tutorStepLabels,
  initialValues
} from '~/components/user-steps-wrapper/constants'
import { student } from '~/constants'

interface UserStepsWrapperProps {
  userRole: UserRole
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useAppDispatch()
  const {
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit,
    handleBlur,
    handleDataChange,
    data,
    errors,
    isValid
  } = useForm({
    initialValues: initialValues,
    validations: { firstName, lastName, languages }
  })
  useEffect(() => {
    dispatch(markFirstLoginComplete())
  }, [dispatch])

  const { userId } = useAppSelector((state) => state.appMain)
  const getUserName = useCallback(
    () => userService.getUserById(userId, userRole),
    [userId, userRole]
  )

  const { response } = useAxios({
    service: getUserName,
    fetchOnMount: true,
    defaultResponse: {} as typeof data
  })

  useEffect(() => {
    if (Object.keys(response).length !== 0 && !isUserFetched) {
      handleDataChange({
        ...initialValues,
        firstName: response.firstName,
        lastName: response.lastName
      })
      setIsUserFetched(true)
    }
  }, [handleDataChange, isUserFetched, response])
  const childrenArr = [
    <GeneralInfoStep
      data={data}
      errors={errors}
      handleBlur={handleBlur}
      handleDataChange={handleDataChange}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputValueChange}
      key='1'
    />,
    <SubjectsStep
      data={data}
      handleNonInputValueChange={handleNonInputValueChange}
      key='2'
      userRole={userRole}
    />,
    <LanguageStep
      data={data}
      errors={errors}
      handleBlur={handleBlur}
      handleNonInputValueChange={handleNonInputValueChange}
      key='3'
      userRole={userRole}
    />,
    <AddPhotoStep
      data={data}
      handleDataChange={handleDataChange}
      key='4'
      userRole={userRole}
    />
  ]

  const stepLabels =
    userRole === (student as UserRole) ? studentStepLabels : tutorStepLabels

  return (
    <StepProvider initialValues={initialValues} stepLabels={stepLabels}>
      <StepWrapper
        errors={errors}
        handleSubmitForm={handleSubmit}
        isValid={isValid}
        stepData={data}
        steps={stepLabels}
      >
        {childrenArr}
      </StepWrapper>
    </StepProvider>
  )
}

export default UserStepsWrapper
