import { useCallback, useState } from 'react'

import useAxios from '~/hooks/use-axios'
import { useAppSelector } from '~/hooks/use-redux'

import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { userService } from '~/services/user-service'
import { snackbarVariants } from '~/constants'
import { useTranslation } from 'react-i18next'

const useSteps = ({ steps, stepData, errors, handleSubmitForm, isValid }) => {
  const [activeStep, setActiveStep] = useState(0)
  const { closeModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const { t } = useTranslation()
  const { userId } = useAppSelector((state) => state.appMain)
  const updateUser = useCallback(
    (data) => userService.updateUser(userId, data),
    [userId]
  )

  const handleResponseError = (error) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'becomeTutor.successMessage'
    })
    closeModal()
  }

  const { loading, fetchData } = useAxios({
    service: updateUser,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })
  const fields = {
    firstName: 1,
    lastName: 1,
    country: 1,
    city: 1,
    professionalSummary: 1,
    subjects: 2,
    languages: 3,
    photo: 4
  }
  function generateErrorStepNumbers(errors, fields) {
    const stepErrors = [null, null, null, null]
    for (const field in errors) {
      if (errors[field]) {
        const step = fields[field]
        if (!stepErrors.includes(step)) {
          stepErrors[step - 1] = step
        }
      }
    }
    return stepErrors
  }

  const stepErrors = generateErrorStepNumbers(errors, fields)
  const next = () => {
    setActiveStep((prev) => prev + 1)
  }

  const back = () => {
    setActiveStep((prev) => prev - 1)
  }

  const isLastStep = activeStep === steps.length - 1

  const handleSubmit = (e) => {
    handleSubmitForm(e)
    if (!isValid) {
      setAlert({
        severity: snackbarVariants.error,
        message: t('becomeTutor.fixErrorsMessage')
      })
      return
    }
    const { firstName, lastName, country, city, professionalSummary } = stepData
    const data = {
      photo: stepData.photo,
      firstName,
      lastName,
      address: {
        country: country ?? '',
        city: city ?? ''
      },
      professionalSummary: professionalSummary,
      mainSubjects: stepData.subjects.map((item) => item.id),
      nativeLanguages: stepData.languages
    }
    isValid && fetchData(data)
  }
  const stepOperation = {
    next,
    back,
    handleSubmit,
    setActiveStep
  }

  return {
    activeStep,
    stepErrors,
    isLastStep,
    stepOperation,
    loading
  }
}

export default useSteps
