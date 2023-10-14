import {
  ReactNode,
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptActiveCycleAction,
  markActiveCycleAsFinishedAction,
} from '../reducers/cycles/actions'

interface CyclesContextType {
  activeCycle: CycleType | undefined
  activeCycleId: string | undefined
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cyclesList: [],
      activeCycleId: '',
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-pomodoro:cyclesState-1.0.0'
      )

      if (!storedStateAsJSON) {
        return initialState
      }

      return JSON.parse(storedStateAsJSON)
    }
  )
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-pomodoro:cyclesState-1.0.0', stateJSON)
  }, [cyclesState])

  const { cyclesList, activeCycleId } = cyclesState
  const activeCycle = cyclesList.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(formData: NewCycleFormData) {
    const newCycle = {
      id: String(new Date().getTime()),
      taskName: formData.taskName,
      minutesAmount: formData.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function setTotalSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markActiveCycleAsFinished() {
    dispatch(markActiveCycleAsFinishedAction())
  }

  function interruptActiveCycle() {
    dispatch(interruptActiveCycleAction())
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
