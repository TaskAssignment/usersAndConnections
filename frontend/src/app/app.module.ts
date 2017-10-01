import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { SiteHeaderComponent } from './site-header.component';
import { ApiService } from './api.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { LoginDialogComponent } from './login-dialog.component'
import { ProfilePageComponent } from './profile-page.component'
import { SearchPageComponent } from './search-page.component'


@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
    LoginDialogComponent,
    ProfilePageComponent,
    SearchPageComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
