import { Todo } from './todo.model';
import { TodoActions, TodoActionsTypes } from './todo.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

//qui contient la liste des Todo et
// la proprité last Update
export interface State extends EntityState<Todo> {
  //todos: Todo[];
  lastUpdate: string;
  loading: boolean;
  error: string;
}

export const todoAdapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

//crée un etat par default
const defaultTodos = {
  /* ids: [0, 1],
  entities: {
    0: new Todo('Learn Angular', 0),
    1: new Todo('Learn r', 1),
  }, */
  lastUpdate: new Date().toString(),
  loading: false,
  error: '',
};

//donnée initial donnée par défaut
/* const initialState: State = {
  todos: [new Todo('Lean Java', 1), new Todo('Angular', 2), new Todo('Ngrx', 3)],
  //A chaque fois on a une modification on, aimerait modifier cette val
  lastUpdate: new Date().toString(),
}; */

const initialState: State = todoAdapter.getInitialState(defaultTodos);

//Prend deux parametres le state l'etat
// 2 eme c'est l'action reçu et que l'on souhaite effectuer
export function todoReducer1(state = initialState, action: TodoActions): State {
  //On aimerai modifier le state selon l'action reçu
  switch (action.type) {
    //Si c add todo
    case TodoActionsTypes.ADD_TODO:
      //on aimerai retourner la liste des todo
      return todoAdapter.addOne(action.payload, { ...state, lastUpdate: new Date().toString() });
    /* return {
        ...state,
        //on envoie la nouvelle date
        lastUpdate: new Date().toString(),
        //puis pr le todo on va s'enservir pr le emasc 6
        //on prend l'ancienne liste des todos et on rajoute action.jasmine-payload
        todos: [...state.todos, action.payload],
        //payload parametre qu'on souhaite passer à l'action
      }; */
    case TodoActionsTypes.DELETE_TODO:
      return todoAdapter.removeOne(action.payload, { ...state, lastUpdate: new Date().toString() });
    /* return {
        ...state,
        lastUpdate: new Date().toString(),
        todos: [...state.todos].filter((t: Todo) => t.id !== action.payload),
      }; */
    case TodoActionsTypes.UPDATE_TODO:
      return todoAdapter.updateOne(action.payload, { ...state, lastUpdate: new Date().toString() });

    /* const todos = state.todos.map((t: Todo) => {
        if (t.id === action.payload.id) {
          t = { ...t, ...action.payload };
        }
        return t;
      });
      return {
        ...state,
        todos,
        lastUpdate: new Date().toString(),
      }; */
    case TodoActionsTypes.DELETE_ALL_TODO:
      return todoAdapter.removeAll({ ...state, lastUpdate: new Date().toString() });
    /* return {
        ...state,
        lastUpdate: new Date().toString(),
        todos: [],
      }; */
    default:
      return state;
  }
}

export function todoReducer(state = initialState, action: TodoActions): State {
  switch (action.type) {
    case TodoActionsTypes.GET_TODOS:
      return { ...state, lastUpdate: new Date().toString(), loading: true, error: '' };
    case TodoActionsTypes.GET_TODOS_SUCCESS:
      return todoAdapter.setAll(action.payload, {
        ...state,
        lastUpdate: new Date().toString(),
        loading: true,
        error: '',
      });
    case TodoActionsTypes.GET_TODOS_ERROR:
      return { ...state, lastUpdate: new Date().toString(), loading: false, error: action.payload };

    case TodoActionsTypes.ADD_TODO:
      return todoAdapter.addOne(action.payload, { ...state, lastUpdate: new Date().toString() });

    case TodoActionsTypes.DELETE_TODO:
      return todoAdapter.removeOne(action.payload, { ...state, lastUpdate: new Date().toString() });

    case TodoActionsTypes.UPDATE_TODO:
      return todoAdapter.updateOne(action.payload, { ...state, lastUpdate: new Date().toString() });

    case TodoActionsTypes.DELETE_ALL_TODO:
      return todoAdapter.removeAll({ ...state, lastUpdate: new Date().toString() });

    default:
      return state;
  }
}
