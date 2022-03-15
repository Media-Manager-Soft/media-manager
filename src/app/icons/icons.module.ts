import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './icons/favorite/favorite.component';
import { FlagComponent } from './icons/flag/flag.component';
import { FlagFilledComponent } from './icons/flag-filled/flag-filled.component';
import { RejectedComponent } from './icons/rejected/rejected.component';
import { NoDatesComponent } from './icons/no-dates/no-dates.component';
import { ChevronComponent } from "./icons/chevron/chevron.component";

@NgModule({
  declarations: [
    FavoriteComponent,
    FlagComponent,
    FlagFilledComponent,
    RejectedComponent,
    NoDatesComponent,
    ChevronComponent
  ],
  exports: [
    FavoriteComponent,
    FlagComponent,
    FlagFilledComponent,
    RejectedComponent,
    NoDatesComponent,
    ChevronComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IconsModule {
}
