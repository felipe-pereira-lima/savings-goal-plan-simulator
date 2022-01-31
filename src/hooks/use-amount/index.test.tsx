import { renderHook } from '@testing-library/react-hooks'
import { act } from '@testing-library/react'
import { useAmount, AmountProvider, AmountProviderProps } from '.'
import moment from 'moment'

const mockCurrentDate = (testDate: string) => {
  jest.useFakeTimers('modern')
  jest.setSystemTime(moment(new Date(testDate)).startOf('month').toDate())
}

describe('useAmount', () => {
  beforeEach(() => {
    jest.useRealTimers()
  })

  it('Should return the amount default value.', () => {
    const wrapper = ({ children }: AmountProviderProps) => (
      <AmountProvider>{children}</AmountProvider>
    )

    const { result } = renderHook(() => useAmount(), {
      wrapper,
    })

    expect(result.current.amount).toBe(0)
  })

  it('Should return the monthly amount default value.', () => {
    const wrapper = ({ children }: AmountProviderProps) => (
      <AmountProvider>{children}</AmountProvider>
    )

    const { result } = renderHook(() => useAmount(), {
      wrapper,
    })

    expect(result.current.monthlyAmount).toBe(0)
  })

  it('Should update the amount value.', () => {
    const wrapper = ({ children }: AmountProviderProps) => (
      <AmountProvider>{children}</AmountProvider>
    )

    const { result } = renderHook(() => useAmount(), {
      wrapper,
    })

    act(() => {
      result.current.updateAmount(20000)
    })

    expect(result.current.amount).toBe(20000)
  })

  it('Should set reachDate with month being subsequent to the current date month.', () => {
    mockCurrentDate('2022-12-25')

    const wrapper = ({ children }: AmountProviderProps) => (
      <AmountProvider>{children}</AmountProvider>
    )

    const { result } = renderHook(() => useAmount(), {
      wrapper,
    })

    expect(result.current.reachDate?.getMonth()).toBe(0) //January
    expect(result.current.reachDate?.getFullYear()).toBe(2023)
  })

  it('Should set reachDate with month being subsequent to the current date month, when is leap year', () => {
    mockCurrentDate('2024-01-31')

    const wrapper = ({ children }: AmountProviderProps) => (
      <AmountProvider>{children}</AmountProvider>
    )

    const { result } = renderHook(() => useAmount(), {
      wrapper,
    })

    expect(result.current.reachDate?.getMonth()).toBe(1) //February
    expect(result.current.reachDate?.getFullYear()).toBe(2024)
  })
})
