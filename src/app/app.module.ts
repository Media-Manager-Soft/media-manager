import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationComponent } from './location/location.component';
import { ReactiveFormsModule } from "@angular/forms";
import { GridComponent } from './media/grid/grid.component';
import { MediaItemComponent } from './media/media-item/media-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationComponent,
    GridComponent,
    MediaItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
