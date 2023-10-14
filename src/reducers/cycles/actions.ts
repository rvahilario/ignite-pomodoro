export enum CyclesActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  MARK_ACTIVE_CYCLE_AS_FINISHED = 'MARK_ACTIVE_CYCLE_AS_FINISHED',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
}

export function addNewCycleAction(newCycle: CycleType) {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  }
}

export function markActiveCycleAsFinishedAction() {
  return {
    type: CyclesActionTypes.MARK_ACTIVE_CYCLE_AS_FINISHED,
  }
}

export function interruptActiveCycleAction() {
  return {
    type: CyclesActionTypes.INTERRUPT_ACTIVE_CYCLE,
  }
}
