import { ReactNode, createContext, useReducer, useState } from 'react'
import { cyclesReducer } from '../reducers/cycles'

interface CyclesContextType {
  activeCycle: CycleType | undefined
  activeCycleId: string
  amountSecondsPassed: number
  cyclesList: CycleType[]
  createNewCycle: (formData: NewCycleFormData) => void
  interruptActiveCycle: () => void
  markActiveCycleAsFinished: () => void
  setTotalSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface NewCycleFormData {
  taskName: string
  minutesAmount: number
}

interface CyclesProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cyclesList: [],
    activeCycleId: '',
  })
  const { cyclesList, activeCycleId } = cyclesState
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cyclesList.find((cycle) => cycle.id === activeCycleId)

  function markActiveCycleAsFinished() {
    dispatch({
      type: 'MARK_ACTIVE_CYCLE_AS_FINISHED',
      payload: { activeCycleId },
    })
  }

  function setTotalSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function createNewCycle(formData: NewCycleFormData) {
    const newCycle = {
      id: String(new Date().getTime()),
      taskName: formData.taskName,
      minutesAmount: formData.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: { newCycle },
    })
    setAmountSecondsPassed(0)
  }

  function interruptActiveCycle() {
    dispatch({
      type: 'INTERRUPT_ACTIVE_CYCLE',
      payload: { activeCycleId },
    })
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        cyclesList,
        createNewCycle,
        interruptActiveCycle,
        markActiveCycleAsFinished,
        setTotalSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
