import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AppContentSwitcher from '~/components/app-content-switcher/AppContentSwitcher'

const mockSwitchOptions = {
  left: {
    text: 'Option Left',
    tooltip: 'Tooltip Left'
  },
  right: {
    text: 'Option Right',
    tooltip: 'Tooltip Right'
  }
}

describe('AppContentSwitcher', () => {
  it('should render with the correct props', () => {
    render(
      <AppContentSwitcher
        active={false}
        onChange={() => {}}
        styles={{}}
        switchOptions={mockSwitchOptions}
        typographyVariant='h6'
      />
    )

    expect(screen.getByText('Option Left')).toBeInTheDocument()
    expect(screen.getByText('Option Right')).toBeInTheDocument()
    expect(screen.getByTestId('switch')).toBeInTheDocument()
  })

  it('should call the onChange function when the switch is clicked', () => {
    const mockOnChange = vi.fn()

    render(
      <AppContentSwitcher
        active={false}
        onChange={mockOnChange}
        styles={{}}
        switchOptions={mockSwitchOptions}
        typographyVariant='h6'
      />
    )

    const switchElement = screen.getByTestId('switch')
    fireEvent.click(switchElement.querySelector('input'))

    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('should render tooltips when tooltip props are passed', async () => {
    render(
      <AppContentSwitcher
        active={false}
        onChange={() => {}}
        styles={{}}
        switchOptions={mockSwitchOptions}
        typographyVariant='h6'
      />
    )

    const leftOption = screen.getByText('Option Left')
    const rightOption = screen.getByText('Option Right')

    fireEvent.mouseOver(leftOption)
    expect(await screen.findByText('Tooltip Left')).toBeInTheDocument()

    fireEvent.mouseOver(rightOption)
    expect(await screen.findByText('Tooltip Right')).toBeInTheDocument()
  })
})
