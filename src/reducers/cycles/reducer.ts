import {
  AddNewCycleAction,
  CyclesActionTypes,
  InterruptActiveCycleAction,
  MarkActiveCycleAsFinishedAction,
} from './actions'

interface CyclesState {
  cyclesList: CycleType[]
  activeCycleId: string | undefined
}

const initialState: CyclesState = {
  cyclesList: [],
  activeCycleId: '',
}

type ActionTypes =
  | AddNewCycleAction
  | MarkActiveCycleAsFinishedAction
  | InterruptActiveCycleAction

export function cyclesReducer(
  state = initialState,
  action: ActionTypes
): CyclesState {
  switch (action.type) {
    default:
      return state

    case CyclesActionTypes.ADD_NEW_CYCLE:
      return {
        ...state,
        cyclesList: [...state.cyclesList, action.payload.newCycle],
        activeCycleId: action.payload.newCycle?.id,
      }

    case CyclesActionTypes.MARK_ACTIVE_CYCLE_AS_FINISHED:
      return {
        ...state,
        cyclesList: state.cyclesList.map((cycle) =>
          cycle.id === state.activeCycleId
            ? { ...cycle, finishDate: new Date() }
            : cycle
        ),
        activeCycleId: '',
      }

    case CyclesActionTypes.INTERRUPT_ACTIVE_CYCLE:
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
