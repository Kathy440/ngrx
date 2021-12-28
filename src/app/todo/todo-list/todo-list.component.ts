import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Todo } from '../todo.model';
import { TodoService } from '../todo.service';

import * as fromTodoReducers from '../todo.reducers';
import * as fromTodoActions from '../todo.actions';
import * as fromTodoSelector from '../todo.selectors';

import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  //On va recuperer la liste des Todo mais aussi le last update
  todos$: Observable<Todo[]>;
  count$: Observable<number>;

  isEdit = false;
  name: string;
  selectedTodo: Todo;

  //.State c'est ce qui contient le todo et le lastUpdate
  constructor(private todoService: TodoService, private store: Store<fromTodoReducers.State>) {
    this.todos$ = store.pipe(select(fromTodoSelector.selectAll));
    this.count$ = store.pipe(select(fromTodoSelector.selectTotal));
  }

  addTodo(name: string): void {
    const todo: Todo = new Todo(name);
    this.store.dispatch(new fromTodoActions.AddTodo(todo));
    this.name = '';
  }

  updateTodo(todo: Todo): void {
    this.isEdit = true;
    this.name = todo.name;
    this.selectedTodo = todo;
  }

  confirmTodo(name: string): void {
    this.selectedTodo = { ...this.selectedTodo, name };
    //this.todoService.update(this.selectedTodo);
    //this.store.dispatch(new fromTodoActions.UpdateTodo(this.selectedTodo));

    //on passe changes -> pck dans le type il attend soit un id string ou number
    this.store.dispatch(new fromTodoActions.UpdateTodo({ id: this.selectedTodo.id, changes: this.selectedTodo }));
    this.isEdit = false;
    this.name = '';
  }

  deleteTodo(todo: Todo): void {
    //this.todoService.delete(todo.id);
    this.store.dispatch(new fromTodoActions.DeleteTodo(todo.id));
  }
}
