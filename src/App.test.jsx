/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('renders find button', () => {
  render(<App />)
  const linkElement = screen.getByText(/Найти/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders find by login label', () => {
  render(<App />)
  const linkElement = screen.getByText(/Поиск по логину/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders search field', () => {
  render(<App />)
  const linkElement = screen.getByLabelText(/Поиск по логину/i)
  expect(linkElement).toBeInTheDocument()
})

test('search field contain character', () => {
  render(<App />)
  const input = screen.getByLabelText(/Поиск по логину/i)
  userEvent.type(input, 'g')
  expect(input.value).toBe('g')
})

test('button to be disabled when input is empty', () => {
  render(<App />)
  expect(screen.getByRole('button')).toBeDisabled()
})

test('button not to be disabled when input is not empty', () => {
  render(<App />)
  const input = screen.getByLabelText(/Поиск по логину/i)
  userEvent.type(input, 'test')
  expect(screen.getByText(/Найти/i).getAttribute('disabled')).toBe('')
})
