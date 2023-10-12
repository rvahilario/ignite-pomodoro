import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    markActiveCycleAsFinished,
    setTotalSecondsPassed,
  } = useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutesString = String(minutesAmount).padStart(2, '0')
  const secondsString = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const diffInSeconds = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )

        if (diffInSeconds < totalSeconds) {
          setTotalSecondsPassed(diffInSeconds)
        } else {
          markActiveCycleAsFinished()
          setTotalSecondsPassed(totalSeconds)
          clearInterval(interval)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesString}:${secondsString} - ${activeCycle.taskName}`
    } else {
      document.title = 'Pomodoro Timer'
    }
  }, [minutesString, secondsString, activeCycle])

  return (
    <TimerDiv>
      <span>{minutesString[0]}</span>
      <span>{minutesString[1]}</span>
      <span className="not-a-number">:</span>
      <span>{secondsString[0]}</span>
      <span>{secondsString[1]}</span>
    </TimerDiv>
  )
}

const TimerDiv = styled.div`
  display: flex;
  margin: 3.5rem auto;
  gap: 1rem;

  span {
    display: flex;
    width: 8rem;
    font-family: 'Roboto Mono', sans-serif;
    font-size: 10rem;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: ${({ theme }) => theme['gray-700']};
    color: ${({ theme }) => theme['gray-100']};
  }

  .not-a-number {
    width: auto;
    margin: auto -13px;
    background: none;
    color: ${({ theme }) => theme['green-500']};
  }
`
