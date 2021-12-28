import { createFeatureSelector, createSelector, Selector } from '@ngrx/store';
import { State } from './reducers';
import { Profil } from '../models/profil';

//c une fonction pr selectionner une partie de notre state
export const getFormState = createFeatureSelector<State>('form');

export const getForm = createSelector(getFormState, (formState: State) => formState);
