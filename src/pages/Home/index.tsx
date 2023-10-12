import { createContext, useState } from 'react'
import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from '@phosphor-icons/react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

const DEFAULT_TASK_FORM_DATA = {
  taskName: '',
  minutesAmount: 0,
}

interface CyclesContextType {
  activeCycle: CycleType | undefined
  activeCycleId: string
  amountSecondsPassed: number
  markActiveCycleAsFinished: () => void
  setTotalSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

const taskFormValidationSchema = zod.object({
  taskName: zod.string().min(1, 'Fill in the task name.'),
  minutesAmount: zod.number().min(1).max(60),
})

type CycleFormData = zod.infer<typeof taskFormValidationSchema>

interface CycleType {
  id: string
  taskName: string
  minutesAmount: number
  startDate: Date
  stopDate?: Date
  finishDate?: Date
}

type HomeProps = {}

export function Home({}: HomeProps) {
  const [cyclesList, setCyclesList] = useState<CycleType[]>([])
  const [activeCycleId, setActiveCycleId] = useState('')
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<CycleFormData>({
    resolver: zodResolver(taskFormValidationSchema),
    defaultValues: DEFAULT_TASK_FORM_DATA,
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const taskName = watch('taskName')
  const taskTimer = watch('minutesAmount')
  const isSubmitDisabled = !taskName || !taskTimer

  const activeCycle = cyclesList.find((cycle) => cycle.id === activeCycleId)

  function markActiveCycleAsFinished() {
    setCyclesList((prevCyclesList) =>
      prevCyclesList.map((cycle) =>
        cycle.id === activeCycleId
          ? { ...cycle, finishDate: new Date() }
          : cycle
      )
    )
    setActiveCycleId('')
  }

  function setTotalSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

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

  function handleInterruptTaskCycle() {
    setCyclesList((prevCyclesList) =>
      prevCyclesList.map((cycle) =>
        cycle.id === activeCycleId ? { ...cycle, stopDate: new Date() } : cycle
      )
    )
    setActiveCycleId('')
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleCreateTaskCycle)}>
      <CyclesContext.Provider
        value={{
          activeCycle,
          activeCycleId,
          amountSecondsPassed,
          markActiveCycleAsFinished,
          setTotalSecondsPassed,
        }}
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
      </CyclesContext.Provider>

      {activeCycle ? (
        <StyledButton
          className="stop-button"
          onClick={handleInterruptTaskCycle}
        >
          <HandPalm size="1.5rem" />
          Stop
        </StyledButton>
      ) : (
        <StyledButton type="submit" disabled={isSubmitDisabled}>
          <Play size="1.5rem" />
          Start
        </StyledButton>
      )}
    </FormContainer>
  )
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 40.5rem;
  margin: 0 auto;
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

  &.stop-button {
    background: ${({ theme }) => theme['red-500']};
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme['green-700']};
    &.stop-button {
      background: ${({ theme }) => theme['red-700']};
    }
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
