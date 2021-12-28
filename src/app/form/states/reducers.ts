import { Profil } from '../models/profil';
import * as SubmitActionsTypes from './actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface State {
  firstName: string;
  lastName: string;
  address: string;
}

export const initialState: State = {
  firstName: '',
  lastName: '',
  address: '',
};

export function formReducer(state: State = initialState, action: SubmitActionsTypes.SubmitActions) {
  switch (action.type) {
    case SubmitActionsTypes.SubmitActionsTypes.SUBMIT:
      return { ...state, form: action.payload };
    case SubmitActionsTypes.SubmitActionsTypes.GET_SUBMIT:
      return { ...state };
    case SubmitActionsTypes.SubmitActionsTypes.GET_SUBMIT_SUCCES:
      return { ...state, form: action.payload };
    default: {
      return state;
    }
  }
}
