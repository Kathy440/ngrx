import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoInfoComponent } from './todo/todo-info/todo-info.component';
import { todoReducer } from './todo/todo.reducers';
import { environment } from '../environments/environment';
import { FormComponent } from './form/form.component';
import { formReducer } from './form/states/reducers';
import { TodoEffects } from './todo/todo.effects';
import { FormEffects } from './form/states/effets';
import { storageMetaReducer } from './form/states/storage.metareducer';
import { ObserComponent } from './obser/obser.component';
import { ProductComponent } from './product/product.component';
import { addProductReducer } from './form/states/products.reducers';

@NgModule({
  declarations: [AppComponent, TodoListComponent, TodoInfoComponent, FormComponent, ObserComponent, ProductComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,

    EffectsModule.forRoot([FormEffects]),
    StoreModule.forRoot({ form: formReducer }),

    //Max age nb d'etat qu'on souhaite conserver dans lhistorique
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 10 }) : [],
  ],
  providers: [TodoEffects],
  bootstrap: [AppComponent],
})
export class AppModule {}
