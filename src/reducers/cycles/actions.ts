export enum CyclesActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  MARK_ACTIVE_CYCLE_AS_FINISHED = 'MARK_ACTIVE_CYCLE_AS_FINISHED',
  INTERRUPT_ACTIVE_CYCLE = 'INTERRUPT_ACTIVE_CYCLE',
}

export interface AddNewCycleAction {
  type: CyclesActionTypes.ADD_NEW_CYCLE
  payload: { newCycle: CycleType }
}

export function addNewCycleAction(newCycle: CycleType): AddNewCycleAction {
  return {
    type: CyclesActionTypes.ADD_NEW_CYCLE,
    payload: { newCycle },
  }
}

export interface MarkActiveCycleAsFinishedAction {
  type: CyclesActionTypes.MARK_ACTIVE_CYCLE_AS_FINISHED
}

export function markActiveCycleAsFinishedAction(): MarkActiveCycleAsFinishedAction {
  return {
    type: CyclesActionTypes.MARK_ACTIVE_CYCLE_AS_FINISHED,
  }
}

export interface InterruptActiveCycleAction {
  type: CyclesActionTypes.INTERRUPT_ACTIVE_CYCLE
}

export function interruptActiveCycleAction(): InterruptActiveCycleAction {
  return {
    type: CyclesActionTypes.INTERRUPT_ACTIVE_CYCLE,
  }
}
