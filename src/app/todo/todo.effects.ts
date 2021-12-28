import { Injectable } from '@angular/core';
import { Effect, ofType, createEffect, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';

import { TodoService } from './todo.service';

import * as fromTodoActions from './todo.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoEffects {
  @Effect()
  getTodos$: Observable<Action> = this.actions$.pipe(
    ofType(fromTodoActions.TodoActionsTypes.GET_TODOS),
    switchMap(() =>
      this.todoService.getAll().pipe(
        map((todos: Todo[]) => new fromTodoActions.GetTodosSuccess(todos)),
        catchError((err: string) => of(new fromTodoActions.GetTodosError(err))),
      ),
    ),
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
