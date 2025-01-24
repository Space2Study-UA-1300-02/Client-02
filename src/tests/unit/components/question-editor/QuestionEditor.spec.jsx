import { screen, render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import QuestionEditor from '~/components/question-editor/QuestionEditor'

const mockQuestion = {
  title: 'About Science',
  text: 'What is the boiling point of water?',
  answers: [
    {
      id: '1',
      text: '100°C',
      isCorrect: true
    },
    {
      id: '2',
      text: '212°F',
      isCorrect: false
    }
  ],
  type: 'oneAnswer',
  category: {
    _id: 'category-science-001',
    name: 'Science'
  }
}

const mockQuestionWithOpenAnswer = {
  type: 'openAnswer',
  text: 'What is the speed of light?',
  answers: [],
  openAnswer: '299,792 km/s'
}

const mockHandleInputChange = vi.fn()
const mockHandleNonInputValueChange = vi.fn()

describe('QuestionEditor Component', () => {
  it('should render the question input field with the initial value', () => {
    render(
      <QuestionEditor
        data={mockQuestion}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const questionInput = screen.getByRole('textbox', { name: /question/i })

    expect(questionInput).toBeInTheDocument()
    expect(questionInput).toHaveValue(mockQuestion.text)
  })

  it('should render the open answer input field with the initial value', () => {
    render(
      <QuestionEditor
        data={mockQuestionWithOpenAnswer}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const openAnswerInput = screen.getByRole('textbox', { name: /answer/i })

    expect(openAnswerInput).toBeInTheDocument()
    expect(openAnswerInput).toHaveValue(mockQuestionWithOpenAnswer.openAnswer)
  })

  it('should update the question type when changed', () => {
    render(
      <QuestionEditor
        data={mockQuestion}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const selectInput = screen.getByTestId('app-select')
    fireEvent.change(selectInput, { target: { value: 'multipleChoice' } })

    expect(mockHandleNonInputValueChange).toHaveBeenCalledWith(
      'type',
      'multipleChoice'
    )
  })

  it('should update the question text when changed', () => {
    render(
      <QuestionEditor
        data={mockQuestion}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const questionInput = screen.getByRole('textbox', { name: /question/i })
    fireEvent.change(questionInput, { target: { value: 'What is gravity?' } })

    expect(mockHandleInputChange).toHaveBeenCalledWith(
      'text',
      'What is gravity?'
    )
  })

  it('should update the open answer text when changed', () => {
    render(
      <QuestionEditor
        data={mockQuestionWithOpenAnswer}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputValueChange}
      />
    )

    const openAnswerInput = screen.getByRole('textbox', { name: /answer/i })
    fireEvent.change(openAnswerInput, { target: { value: '300,000 km/s' } })

    expect(mockHandleInputChange).toHaveBeenCalledWith(
      'openAnswer',
      '300,000 km/s'
    )
  })
})
