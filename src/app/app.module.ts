import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import * as firebase from 'firebase';

const myFirebaseConfig = {
  apiKey: 'AIzaSyCyS_b3Grwb9inN4LJEVHlcShtdLdv98t0',
  authDomain: 'chatapp-19312.firebaseapp.com',
  databaseURL: 'https://chatapp-19312.firebaseio.com/',
  storageBucket: 'chatapp-19312.appspot.com',
}

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }