import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

describe('SliderWithInput', () => {
  const mockOnChange = vi.fn()

  it('should render correctly', () => {
    render(
      <SliderWithInput
        defaultValue={50}
        max={100}
        min={0}
        onChange={mockOnChange}
        title='Price Range'
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    const slider = screen.getByRole('slider')
    expect(slider).toBeInTheDocument()

    const title = screen.getByText('Price Range')
    expect(title).toBeInTheDocument()
  })

  it('should call onChange when slider is moved', async () => {
    render(
      <SliderWithInput
        defaultValue={50}
        max={100}
        min={0}
        onChange={mockOnChange}
        title='Price Range'
      />
    )

    const slider = screen.getByRole('slider')
    fireEvent.input(slider, { target: { value: 70 } })

    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith(70))
  })

  it('should update inputValue correctly when input value is empty', () => {
    render(
      <SliderWithInput
        defaultValue={50}
        max={100}
        min={0}
        onChange={mockOnChange}
        title='Price Range'
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '' } })

    expect(input.value).toBe('')
  })

  it('should update prices when input is blurred and input is greater than max value', async () => {
    render(
      <SliderWithInput
        defaultValue={50}
        max={100}
        min={0}
        onChange={mockOnChange}
        title='Price Range'
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '150' } })
    fireEvent.blur(input)

    await waitFor(() => expect(input.value).toBe('100'))
  })

  it('should not update prices when input is blurred and value in input has not changed', async () => {
    render(
      <SliderWithInput
        defaultValue={50}
        max={100}
        min={0}
        onChange={mockOnChange}
        title='Price Range'
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: '50' } })
    fireEvent.blur(input)

    await waitFor(() => expect(input.value).toBe('50'))
  })
})
