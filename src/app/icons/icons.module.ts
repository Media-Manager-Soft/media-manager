import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './icons/favorite/favorite.component';
import { FlagComponent } from './icons/flag/flag.component';
import { FlagFilledComponent } from './icons/flag-filled/flag-filled.component';
import { RejectedComponent } from './icons/rejected/rejected.component';
import { NoDatesComponent } from './icons/no-dates/no-dates.component';
import { ChevronComponent } from "./icons/chevron/chevron.component";
import { CloseComponent } from './icons/close/close.component';
import { SpinnerComponent } from './icons/spinner/spinner.component';
import { ArrowComponent } from './icons/arrow/arrow.component';
import { EditComponent } from './icons/edit/edit.component';
import { PlusComponent } from './icons/plus/plus.component';

@NgModule({
  declarations: [
    FavoriteComponent,
    FlagComponent,
    FlagFilledComponent,
    RejectedComponent,
    NoDatesComponent,
    ChevronComponent,
    CloseComponent,
    SpinnerComponent,
    ArrowComponent,
    EditComponent,
    PlusComponent
  ],
  exports: [
    FavoriteComponent,
    FlagComponent,
    FlagFilledComponent,
    RejectedComponent,
    NoDatesComponent,
    ChevronComponent,
    CloseComponent,
    SpinnerComponent,
    ArrowComponent,
    EditComponent,
    PlusComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IconsModule {
}
