import React, { useEffect, useState } from 'react'
import * as S from './styles'
import moment from 'moment'

import { useSavingsGoal } from 'hooks/use-savings-goal'
import { useKeyPress } from 'hooks/use-key-press'

import { ReactComponent as LeftArrowIcon } from 'assets/icons/left-arrow.svg'
import { ReactComponent as RightArrowIcon } from 'assets/icons/right-arrow.svg'

const getMonthName = (date: Date | null) => {
  return date?.toLocaleString('en-us', { month: 'long' })
}

const ReachDateInput = () => {
  const { reachDate, updateReachDate } = useSavingsGoal()
  const [isMinimumDate, setIsMinimumDate] = useState(true)

  const jumpToNextMonth = () => {
    const nextMonthDate = moment(reachDate).add(1, 'month').toDate()
    updateReachDate(nextMonthDate)
  }

  const jumpToPreviousMonth = () => {
    const previousMonthDate = moment(reachDate).subtract(1, 'month').toDate()
    updateReachDate(previousMonthDate)
  }

  const handleLeftKey = () => {
    if (isMinimumDate) {
      return
    } else {
      jumpToPreviousMonth()
    }
  }

  useKeyPress('ArrowRight', jumpToNextMonth)
  useKeyPress('ArrowLeft', handleLeftKey)

  useEffect(() => {
    const currentDate = moment()
    const previousDateToReachDate = moment(reachDate).subtract(1, 'month')

    if (previousDateToReachDate.isSame(currentDate, 'month')) {
      setIsMinimumDate(true)
    } else {
      setIsMinimumDate(false)
    }
  }, [reachDate])

  return (
    <S.ReachDateInput>
      <label htmlFor="reach-date">Reach goal by</label>
      <S.Container id="reach-date" tabIndex={0}>
        <button
          aria-label="previous month button"
          onClick={jumpToPreviousMonth}
          disabled={isMinimumDate}
          tabIndex={-1}
        >
          <LeftArrowIcon />
        </button>
        <S.Text>
          <S.Month data-testid="month">{getMonthName(reachDate)}</S.Month>
          <S.Year data-testid="year">{reachDate?.getFullYear()}</S.Year>
        </S.Text>
        <button
          aria-label="next month button"
          onClick={jumpToNextMonth}
          tabIndex={-1}
        >
          <RightArrowIcon />
        </button>
      </S.Container>
    </S.ReachDateInput>
  )
}

export default ReachDateInput
