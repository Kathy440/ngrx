import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, todoAdapter } from './todo.reducers';
import { Todo } from './todo.model';
import { EntityState } from '@ngrx/entity';
import { EntitySelectors } from '@ngrx/entity/src/models';

//recuperer que la liste des states et pas tt le todo
export const getTodoState = createFeatureSelector<State>('todo');

export const {
  selectAll: selectAllTodos,
  selectTotal: count,
}: EntitySelectors<Todo, EntityState<Todo>> = todoAdapter.getSelectors();

export const selectAll = createSelector(getTodoState, selectAllTodos);
export const selectTotal = createSelector(getTodoState, count);
export const selectLastUpdate = createSelector(getTodoState, (state: State): string => state.lastUpdate);
export const selectLoading = createSelector(getTodoState, (state: State): boolean => state.loading);
export const selectError = createSelector(getTodoState, (state: State): string => state.error);

/* //recuperer que la liste des states et pas tt le todo
export const getTodoState = createFeatureSelector<State>('todo');

//on passe un callback, et on veut sa nous renvoie un tableau de todo
export const selectAll = createSelector(getTodoState, (state: State): Todo[] => state.todos);

//cree un selector qui permet de recuperer la taille du tableau
export const selectTotal = createSelector(getTodoState, (state: State): number => state.todos.length);

//Last update, avoir notre propre selecteur permettre de recuperer le last update
export const selectLastUpdate = createSelector(getTodoState, (state: State): string => state.lastUpdate);
 */
