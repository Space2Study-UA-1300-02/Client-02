import { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '~/hooks/use-redux'
import { markFirstLoginComplete } from '~/redux/reducer'
import StepWrapper from '~/components/step-wrapper/StepWrapper'
import useForm from '~/hooks/use-form'
import { firstName, lastName } from '~/utils/validations/login'
import { languages } from '~/utils/validations/stepper'
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
  userRole: string
}

const UserStepsWrapper: FC<UserStepsWrapperProps> = ({ userRole }) => {
  const [isUserFetched, setIsUserFetched] = useState(false)
  const dispatch = useAppDispatch()
  const {
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit,
    handleBlur,
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

  const childrenArr = [
    <GeneralInfoStep
      data={data}
      errors={errors}
      handleBlur={handleBlur}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputValueChange}
      isUserFetched={isUserFetched}
      key='1'
      setIsUserFetched={setIsUserFetched}
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
    <AddPhotoStep key='4' />
  ]

  const stepLabels = userRole === student ? studentStepLabels : tutorStepLabels

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
