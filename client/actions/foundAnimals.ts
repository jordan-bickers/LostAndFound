import { ThunkAction } from '../store'
import { FoundAnimal } from '../../common/foundAnimal'
import { addFound, getAllFound, deleteFound } from '../apis/foundanimals'

export type FoundAction =
  | { type: 'ADD_FOUND'; payload: FoundAnimal }
  | { type: 'SET_FOUND'; payload: FoundAnimal[] }
  | { type: 'DELETE_FOUND'; payload: number }

export function receiveFound(found: FoundAnimal[]): FoundAction {
  return {
    type: 'SET_FOUND',
    payload: found,
  }
}

export function addingFound(newFound: FoundAnimal): FoundAction {
  return {
    type: 'ADD_FOUND',
    payload: newFound,
  }
}

export function delFound(foundId: number): FoundAction {
  return {
    type: 'DELETE_FOUND',
    payload: foundId,
  }
}

export function setAllFound(): ThunkAction {
  return (dispatch) => {
    return getAllFound()
      .then((found) => {
        dispatch(receiveFound(found))
      })
      .catch((err: Error) => {
        return console.log(err.message)
      })
  }
}

export function setAddFound(newFound: FoundAnimal, token: string): ThunkAction {
  return (dispatch) => {
    return addFound(newFound, token)
      .then((found) => {
        dispatch(addingFound(found))
      })
      .catch((err) => {
        return console.log(err.message)
      })
  }
}

export function setDeleteFound(foundId: number): ThunkAction {
  return (dispatch) => {
    return deleteFound(foundId)
      .then((id) => {
        dispatch(delFound(id))
      })
      .catch((err) => {
        return console.log(err.message)
      })
  }
}
