import { render, screen } from '@testing-library/react'
import App from './App'
import { describe, it, expect } from 'vitest'

describe('App', () => {
  it('renders main heading text', () => {
    render(<App />)
    const heading = screen.getByText(/Sistema de Gestión de Quejas para Cines/i)
    expect(heading).toBeInTheDocument()
  })
})
