import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YoutubeListComponent } from './components/youtube-list/youtube-list.component';
import { YoutubeCreateComponent } from './components/youtube-create/youtube-create.component';
import { SharedModule } from './shared/shared.module';
import { HttpInterceptor } from './core/interceptors/http.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeListComponent,
    YoutubeCreateComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ {provide: HttpInterceptor, useClass: HttpInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
