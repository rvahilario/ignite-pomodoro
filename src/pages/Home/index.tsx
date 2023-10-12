import { createContext, useContext, useState } from 'react'
import styled from 'styled-components'
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HandPalm, Play } from '@phosphor-icons/react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'

const DEFAULT_TASK_FORM_DATA = {
  taskName: '',
  minutesAmount: 0,
}

const taskFormValidationSchema = zod.object({
  taskName: zod.string().min(1, 'Fill in the task name.'),
  minutesAmount: zod.number().min(1).max(60),
})

type CycleFormData = zod.infer<typeof taskFormValidationSchema>

export function Home() {
  const { activeCycle, createTaskCycle, interruptTaskCycle } =
    useContext(CyclesContext)
  const newCycleForm = useForm<CycleFormData>({
    resolver: zodResolver(taskFormValidationSchema),
    defaultValues: DEFAULT_TASK_FORM_DATA,
  })
  const { handleSubmit, watch, reset } = newCycleForm

  const taskName = watch('taskName')
  const taskTimer = watch('minutesAmount')
  const isSubmitDisabled = !taskName || !taskTimer

  return (
    <FormContainer onSubmit={handleSubmit(createTaskCycle)}>
      <FormProvider {...newCycleForm}>
        <NewCycleForm />
      </FormProvider>
      <Countdown />

      {activeCycle ? (
        <StyledButton className="stop-button" onClick={interruptTaskCycle}>
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
