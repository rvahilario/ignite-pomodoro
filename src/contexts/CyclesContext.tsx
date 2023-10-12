import { ReactNode, createContext, useState } from 'react'

interface CyclesContextType {
  activeCycle: CycleType | undefined
  activeCycleId: string
  amountSecondsPassed: number
  cyclesList: CycleType[]
  createTaskCycle: (formData: NewCycleFormData) => void
  interruptTaskCycle: () => void
  markActiveCycleAsFinished: () => void
  setTotalSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface CycleType {
  id: string
  taskName: string
  minutesAmount: number
  startDate: Date
  stopDate?: Date
  finishDate?: Date
}

interface NewCycleFormData {
  taskName: string
  minutesAmount: number
}

interface CyclesProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({ children }: CyclesProviderProps) {
  const [cyclesList, setCyclesList] = useState<CycleType[]>([])
  const [activeCycleId, setActiveCycleId] = useState('')
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

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

  function createTaskCycle(formData: NewCycleFormData) {
    const newCycle = {
      id: String(new Date().getTime()),
      taskName: formData.taskName,
      minutesAmount: formData.minutesAmount,
      startDate: new Date(),
    }

    setCyclesList((prevState) => [...prevState, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    // reset()
  }

  function interruptTaskCycle() {
    setCyclesList((prevCyclesList) =>
      prevCyclesList.map((cycle) =>
        cycle.id === activeCycleId ? { ...cycle, stopDate: new Date() } : cycle
      )
    )
    setActiveCycleId('')
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        cyclesList,
        createTaskCycle,
        interruptTaskCycle,
        markActiveCycleAsFinished,
        setTotalSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}