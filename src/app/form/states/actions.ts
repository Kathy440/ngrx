import { Action, createAction, props } from '@ngrx/store';
import { Profil } from '../models/profil';
import { GetTodosSuccess } from 'src/app/todo/todo.actions';

export enum SubmitActionsTypes {
  SUBMIT = 'SUBMIT_FORM',
  SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
  SUBMIT_ERROR = 'SUBMIT_ERROR',
  GET_SUBMIT = 'GET_SUBMIT',
  GET_SUBMIT_SUCCES = 'GET_SUBMIT_SUCCES',
  UPDATE_FORM = 'UPDATE_FORM',
}

export class Submit implements Action {
  readonly type = SubmitActionsTypes.SUBMIT;
  constructor(public payload: any) {}
}

export class GetSubmit implements Action {
  readonly type = SubmitActionsTypes.GET_SUBMIT;
}
export class GetSubmitSucces implements Action {
  readonly type = SubmitActionsTypes.GET_SUBMIT_SUCCES;
  constructor(public payload: any) {}
}

export class SubmitFormSuccess implements Action {
  readonly type = SubmitActionsTypes.SUBMIT_SUCCESS;
  //avec profil retourne une liste de profil ->Profil[]
  constructor(public payload: any) {}
}

export class SubmitFormError implements Action {
  readonly type = SubmitActionsTypes.SUBMIT_ERROR;
  //qd on attend une erreur de type string
  constructor(public payload: string) {}
}

export const getSubmits = createAction('GET_SUBMIT');

export type SubmitActions =
  | GetSubmitSucces
  | SubmitFormSuccess
  | Submit
  | GetTodosSuccess
  | SubmitFormError
  | GetSubmit;
