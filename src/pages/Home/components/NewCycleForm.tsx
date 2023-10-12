import { useContext } from 'react'
import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../contexts/CyclesContext'

const OPTION_LIST_MOCK = [
  'Web Development Project',
  'Task Management App',
  'Corporate Website Redesign',
  'Book Writing Project',
  'Language Learning App',
  'Scientific Research Project',
  'Financial Management App',
  'Digital Marketing Project',
  'Fitness Training App',
]

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <InputDiv>
      <label htmlFor="task-name">I'm going to work on</label>
      <input
        id="task-name"
        type="text"
        placeholder="Give a name to your project"
        disabled={!!activeCycle}
        list="task-suggestions"
        {...register('taskName')}
      />
      <datalist id="task-suggestions">
        {OPTION_LIST_MOCK.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>

      <label htmlFor="minutesAmount">for</label>
      <input
        id="minutesAmount"
        className="minutes-amount"
        type="number"
        placeholder="00"
        step={5}
        {...register('minutesAmount', {
          valueAsNumber: true,
        })}
      />

      <span>minutes.</span>
    </InputDiv>
  )
}

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4.625rem;

  color: ${({ theme }) => theme['gray-100']};
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.6;
  gap: 0.5rem;

  input {
    flex: 1;
    padding: 0 0.5rem;
    background: transparent;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
    color: ${({ theme }) => theme['gray-100']};

    &::placeholder {
      color: ${({ theme }) => theme['gray-500']};
    }

    &:focus {
      box-shadow: none;
      border-bottom: 2px solid ${({ theme }) => theme['green-500']};
    }

    &::-webkit-calendar-picker-indicator {
      display: none !important;
    }
  }

  .minutes-amount {
    flex: 0;
    width: 4.625rem;
  }
`
