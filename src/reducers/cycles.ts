interface CyclesState {
  cyclesList: CycleType[]
  activeCycleId: string | undefined
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    default:
      return state

    case 'ADD_NEW_CYCLE':
      return {
        ...state,
        cyclesList: [...state.cyclesList, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
      }

    case 'MARK_ACTIVE_CYCLE_AS_FINISHED':
      return {
        ...state,
        cyclesList: state.cyclesList.map((cycle) =>
          cycle.id === state.activeCycleId
            ? { ...cycle, finishDate: new Date() }
            : cycle
        ),
        activeCycleId: '',
      }

    case 'INTERRUPT_ACTIVE_CYCLE':
      return {
        ...state,
        cyclesList: state.cyclesList.map((cycle) =>
          cycle.id === state.activeCycleId
            ? { ...cycle, stopDate: new Date() }
            : cycle
        ),
        activeCycleId: '',
      }
  }
}
