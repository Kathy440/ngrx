import { Action, createAction, props } from '@ngrx/store';
import { Todo } from './todo.model';
import { Update } from '@ngrx/entity';

/* import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Todo } from './todo.model';

export const getTodos = createAction('GET_TODOS');
export const getTodosSuccess = createAction('GET_TODOS_SUCCESS', props<{ todos: Todo[] }>());
export const getTodosError = createAction('GET_TODOS_ERROR', props<{ error: string }>());
export const addTodo = createAction('ADD_TODO', props<{ todo: Todo }>());
export const updateTodo = createAction('UPDATE_TODO', props<{ todo: Update<Todo> }>());
export const deleteTodo = createAction('DELETE_TODO', props<{ id: number }>());
export const deleteAllTodos = createAction('DELETE_ALL_TODOS');
 */

export enum TodoActionsTypes {
  ADD_TODO = 'ADD_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  DELETE_ALL_TODO = 'DELETE_ALL_TODO',
  GET_TODOS = 'GET_TODOS',
  GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS',
  GET_TODOS_ERROR = 'GET_TODOS_ERROR',
}

export class GetTodo implements Action {
  readonly type = TodoActionsTypes.GET_TODOS;
}

export class GetTodosSuccess implements Action {
  readonly type = TodoActionsTypes.GET_TODOS_SUCCESS;

  //on attend une liste des Todo
  constructor(public payload: Todo[]) {}
}

export class GetTodosError implements Action {
  readonly type = TodoActionsTypes.GET_TODOS_ERROR;
  //qd on attend une erreur de type string
  constructor(public payload: string) {}
}

export class AddTodo implements Action {
  //readonly car on ne vas pas le modifier
  readonly type = TodoActionsTypes.ADD_TODO;
  constructor(public payload: Todo) {}
}

export class UpdateTodo implements Action {
  readonly type = TodoActionsTypes.UPDATE_TODO;
  constructor(public payload: Update<Todo>) {}
}

export class DeleteTodo implements Action {
  readonly type = TodoActionsTypes.DELETE_TODO;
  constructor(public payload: number) {}
}
export class DeleteAllTodo implements Action {
  readonly type = TodoActionsTypes.DELETE_ALL_TODO;
}

export const getTodos = createAction('GET_TODOS');

export const getTodosSuccess = createAction('GET_TODOS_SUCCESS', props<{ todos: Todo[] }>());
export const getTodosError = createAction('GET_TODOS_ERROR', props<{ error: string }>());

export type TodoActions = GetTodosError | GetTodosSuccess | GetTodo | AddTodo | UpdateTodo | DeleteTodo | DeleteAllTodo;
