import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import QuestionEditor from '~/components/question-editor/QuestionEditor'

const sampleQuestion = {
  title: 'About Mathematics',
  text: 'What is the value of pi?',
  answers: [
    { id: '1', text: '3.14', isCorrect: true },
    { id: '2', text: '2.71', isCorrect: false }
  ],
  type: 'oneAnswer',
  category: { _id: 'math-question-id-001', name: 'Mathematics' }
}

const questionWithOpenAnswer = {
  type: 'openAnswer',
  text: 'What is the value of pi?',
  answers: [],
  openAnswer: 'Approximately 3.14'
}

const mockHandleInputChange = vi.fn()
const mockHandleNonInputChange = vi.fn()

beforeEach(() => {
  vi.clearAllMocks() // Очищення моків перед кожним тестом
})

describe('QuestionEditor Component Tests', () => {
  it('renders the question input field correctly', () => {
    render(
      <QuestionEditor
        data={sampleQuestion}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputChange}
      />
    )

    const questionInputField = screen.getByRole('textbox', {
      name: /question/i
    })
    expect(questionInputField).toBeInTheDocument()
    expect(questionInputField).toHaveValue(sampleQuestion.text)
  })

  it('renders the open answer input field properly', () => {
    render(
      <QuestionEditor
        data={questionWithOpenAnswer}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputChange}
      />
    )

    const openAnswerField = screen.getByRole('textbox', { name: /answer/i })
    expect(openAnswerField).toBeInTheDocument()
    expect(openAnswerField).toHaveValue(questionWithOpenAnswer.openAnswer)
  })

  it('handles question type changes correctly', () => {
    render(
      <QuestionEditor
        data={sampleQuestion}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputChange}
      />
    )

    const questionTypeSelector = screen.getByTestId('app-select')
    fireEvent.change(questionTypeSelector, {
      target: { value: 'multipleChoice' }
    })

    expect(mockHandleNonInputChange).toHaveBeenCalledWith(
      'type',
      'multipleChoice'
    )
  })

  it('handles changes in the question input field', () => {
    render(
      <QuestionEditor
        data={sampleQuestion}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputChange}
      />
    )

    const questionInputField = screen.getByRole('textbox', {
      name: /question/i
    })
    fireEvent.change(questionInputField, {
      target: { value: "What is Euler's number?" }
    })

    expect(mockHandleInputChange).toHaveBeenCalledWith('text')
  })

  it('handles changes in the open answer input field', () => {
    render(
      <QuestionEditor
        data={questionWithOpenAnswer}
        handleInputChange={mockHandleInputChange}
        handleNonInputValueChange={mockHandleNonInputChange}
      />
    )

    const openAnswerField = screen.getByRole('textbox', { name: /answer/i })
    fireEvent.change(openAnswerField, {
      target: { value: 'Approximately 2.71' }
    })

    expect(mockHandleInputChange).toHaveBeenCalledWith('openAnswer')
  })
})
