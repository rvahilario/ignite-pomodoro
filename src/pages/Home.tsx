import styled from 'styled-components'
import { Play } from '@phosphor-icons/react'

type Props = {}

export function Home({}: Props) {
  return (
    <FormContainer>
      <InputDiv>
        <label htmlFor="task-name">I'm going to work on</label>
        <input
          id="task-name"
          type="text"
          placeholder="Give a name to your project"
        />

        <label htmlFor="minutesAmount">for</label>
        <input id="minutesAmount" className="minutes-amount" type="number" />

        <span>minutes.</span>
      </InputDiv>

      <TimerDiv>
        <span>0</span>
        <span>0</span>
        <span className="not-a-number">:</span>
        <span>0</span>
        <span>0</span>
      </TimerDiv>

      <button type="submit">
        <Play size="1.5rem" />
        Start
      </button>
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 40.5rem;
  margin: 0 auto;
`

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4.625rem auto 0;

  color: ${({ theme }) => theme['gray-100']};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.6;
  gap: 0.5rem;

  input {
    padding: 0.5rem;
    background: transparent;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
    color: ${({ theme }) => theme['gray-100']};

    &:focus {
      border-bottom: 2px solid ${({ theme }) => theme['gray-100']};
    }
  }

  .minutes-amount {
    width: 4.625rem;
  }
`

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
