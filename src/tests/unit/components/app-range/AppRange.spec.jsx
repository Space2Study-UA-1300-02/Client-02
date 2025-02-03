import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, vi } from 'vitest'
import AppRange from '~/components/app-range/AppRange'

describe('AppRange Component', () => {
  const mockOnChange = vi.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('should render correctly', () => {
    render(<AppRange max={100} min={0} onChange={mockOnChange} />)

    const sliders = screen.getAllByRole('slider')

    expect(sliders).toHaveLength(2)
    expect(screen.getByText('common.from')).toBeInTheDocument()
    expect(screen.getByText('common.to')).toBeInTheDocument()
  })

  it('should call onChange when slider is moved', async () => {
    render(<AppRange max={100} min={0} onChange={mockOnChange} />)

    const sliders = screen.getAllByRole('slider')

    fireEvent.change(sliders[0], { target: { value: 20 } })

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([20, 100])
    })
  })

  it('should call onChange when input is changed', async () => {
    render(<AppRange max={100} min={0} onChange={mockOnChange} />)

    const inputs = screen.getAllByRole('textbox')

    fireEvent.change(inputs[0], { target: { value: '30' } })
    fireEvent.blur(inputs[0])

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([30, 100])
    })
  })

  it('should not call onChange when input is changed with a non-number', async () => {
    render(<AppRange max={100} min={0} onChange={mockOnChange} />)

    const inputs = screen.getAllByRole('textbox')

    fireEvent.change(inputs[0], { target: { value: 'abc' } })
    fireEvent.blur(inputs[0])

    await waitFor(() => {
      expect(mockOnChange).not.toHaveBeenCalled()
    })
  })

  it('should call onChange with min number if input is empty', async () => {
    render(<AppRange max={100} min={0} onChange={mockOnChange} />)

    const inputs = screen.getAllByRole('textbox')

    fireEvent.change(inputs[0], { target: { value: '' } })
    fireEvent.blur(inputs[0])

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith([0, 100])
    })
  })

  it('should not update prices when input is blurred and value in input has not changed', async () => {
    render(
      <AppRange max={100} min={0} onChange={mockOnChange} value={[20, 80]} />
    )

    const inputs = screen.getAllByRole('textbox')

    fireEvent.blur(inputs[0])

    await waitFor(() => {
      expect(mockOnChange).not.toHaveBeenCalled()
    })
  })
})
