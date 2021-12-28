import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { LocalStorageService } from '../services/localStorage.service';

import * as fromFormActions from './actions';
import { Submit } from './actions';
import { Injectable } from '@angular/core';
import { GetSubmit } from './actions';

@Injectable({
  providedIn: 'root',
})
export class FormEffects {
  setForms1$ = createEffect(() =>
    this.actions$.pipe(
      ofType<Submit>(fromFormActions.SubmitActionsTypes.SUBMIT),
      map((action) => action.payload),
      map((profilFormData) => {
        this.localStorageService.setData('profilFormData', profilFormData);
        return new fromFormActions.SubmitFormSuccess('');
      }),
    ),
  );

  getForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetSubmit>(fromFormActions.SubmitActionsTypes.GET_SUBMIT),
      map(() => {
        const getValues = this.localStorageService.getData('profilFormData');
        console.log('get', this.localStorageService.getData('profilFormData'));

        return new fromFormActions.GetSubmitSucces(getValues);
      }),
    ),
  );

  constructor(private actions$: Actions, private localStorageService: LocalStorageService) {}
}
