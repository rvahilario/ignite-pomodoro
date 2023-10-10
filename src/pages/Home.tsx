import styled from 'styled-components'
import { Play } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

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

const DEFAULT_TASK_FORM_DATA = {
  taskName: '',
  minutesAmount: 0,
}

const taskFormValidationSchema = zod.object({
  taskName: zod.string().min(1, 'Fill in the task name.'),
  minutesAmount: zod.number().min(5).max(60),
})

type CycleFormData = zod.infer<typeof taskFormValidationSchema>

interface CycleType {
  id: string
  taskName: string
  minutesAmount: number
  startDate: Date
}

type HomeProps = {}

export function Home({}: HomeProps) {
  const [cyclesList, setCyclesList] = useState<CycleType[]>([])
  const [activeCycleId, setActiveCycleId] = useState('')
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<CycleFormData>({
    resolver: zodResolver(taskFormValidationSchema),
    defaultValues: DEFAULT_TASK_FORM_DATA,
  })

  const taskName = watch('taskName')
  const taskTimer = watch('minutesAmount')
  const isSubmitDisabled = !taskName || !taskTimer

  function handleCreateTaskCycle(formData: CycleFormData) {
    const newCycle = {
      id: String(new Date().getTime()),
      taskName: formData.taskName,
      minutesAmount: formData.minutesAmount,
      startDate: new Date(),
    }

    setCyclesList((prevState) => [...prevState, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    reset()
  }

  const activeCycle = cyclesList.find((cycle) => cycle.id === activeCycleId)
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
        setAmountSecondsPassed(
          differenceInSeconds(new Date(), activeCycle.startDate)
        )
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutesString}:${secondsString} - ${activeCycle.taskName}`
    }
  }, [minutesString, secondsString, activeCycle])

  return (
    <FormContainer onSubmit={handleSubmit(handleCreateTaskCycle)}>
      <InputDiv>
        <label htmlFor="task-name">I'm going to work on</label>
        <input
          id="task-name"
          type="text"
          placeholder="Give a name to your project"
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

      <TimerDiv>
        <span>{minutesString[0]}</span>
        <span>{minutesString[1]}</span>
        <span className="not-a-number">:</span>
        <span>{secondsString[0]}</span>
        <span>{secondsString[1]}</span>
      </TimerDiv>

      <StyledButton type="submit" disabled={isSubmitDisabled}>
        <Play size="1.5rem" />
        Start
      </StyledButton>
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

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme['gray-100']};
  background: ${({ theme }) => theme['green-500']};

  height: 4rem;
  padding: 1rem 2.5rem;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
