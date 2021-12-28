import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { TodoService } from '../todo.service';
import { Todo } from '../todo.model';
import { Store, select } from '@ngrx/store';

import * as fromTodoReducers from '../todo.reducers';
import * as fromTodoActions from '../todo.actions';
import * as fromTodoSelector from '../todo.selectors';

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
})
export class TodoInfoComponent {
  //todoState$: Observable<fromTodoReducers.State>;
  //recupere la liste des todos et pas la totalité, un tab de todo
  count$: Observable<number>;
  lastUpdate$: Observable<string>;

  constructor(private todoService: TodoService, private store: Store<fromTodoReducers.State>) {
    this.count$ = store.pipe(select(fromTodoSelector.selectTotal));
    this.lastUpdate$ = store.pipe(select(fromTodoSelector.selectLastUpdate));
  }

  deleteAllTodos(): void {
    //this.todoService.deleteAll();
    this.store.dispatch(new fromTodoActions.DeleteAllTodo());
  }
}
