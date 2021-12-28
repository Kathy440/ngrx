import { Component, OnInit, Directive, Input } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { FormBuilder, FormGroupDirective, FormGroup } from '@angular/forms';
import { LocalStorageService } from './services/localStorage.service';
import { Store, select, State } from '@ngrx/store';
import * as fromFormReducer from './states/reducers';
import * as fromFormAction from './states/actions';
import * as fromFormSelector from './states/selector';
import { Profil } from './models/profil';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  //observable retourne mon state
  form$: Observable<fromFormReducer.State>;
  data$: Observable<Profil[]>;

  public selectProfil: Profil;
  constructor(
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private store: Store<fromFormReducer.State>,
  ) {
    this.form$ = store.pipe(select(fromFormSelector.getFormState));
  }

  profileForm: any;
  dataForms: any;
  ngOnInit() {
    this.initForm();
    //const value = this.localStorageService.getData('profilFormData');
    //this.form$ =
    this.store.pipe(select(fromFormSelector.getForm)).subscribe(
      (value) => {
        console.log('valeurXX', value);

        this.dataForms = value;
        console.log('dataxx', this.dataForms.form);
        if (this.profileForm) {
          this.profileForm.patchValue({
            firstName: this.dataForms.form && this.dataForms.form.firstName,
            lastName: this.dataForms.form && this.dataForms.form.lastName,
            address: this.dataForms.form && this.dataForms.form.address,
          });
        }
      },
      (error) => {
        console.log('erreur : ' + error);
      },
      () => {
        console.log('ok!');
      },
    );
    this.store.dispatch(new fromFormAction.GetSubmit());
    console.log(this.dataForms, 'dataForm');
    /* this.profileForm = this.formBuilder.group({
      firstName: this.dataForms., //value && value.firstName
      lastName: [''],
      address: [''],
    }); */

    //TEST MAJ FORM
  }

  initForm() {
    this.profileForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      address: '',
    });
  }

  saveForm() {
    //const formValue = this.profileForm.value;
    //const profil = new Profil(formValue['firstName'], formValue['lastName'], formValue['address']);

    //this.localStorageService.setData('profilFormData', this.profileForm.value);
    this.store.dispatch(new fromFormAction.Submit(this.profileForm.value));
  }
}
