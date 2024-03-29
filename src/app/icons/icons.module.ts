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
import { CogComponent } from './icons/cog/cog.component';
import { ExclamationTriangleComponent } from './icons/exclamation-triangle/exclamation-triangle.component';
import { ArrowRepeatComponent } from './icons/arrow-repeat/arrow-repeat.component';
import { CircleCloseComponent } from './icons/circle-close/circle-close.component';
import {SignComponent} from "./icons/sign/sign.component";
import { FolderComponent } from './icons/folder/folder.component';
import { SeparatorComponent } from './icons/separator/separator.component';
import { PhotoComponent } from './icons/photo/photo.component';
import { RawComponent } from './icons/raw/raw.component';
import { MovieComponent } from './icons/movie/movie.component';

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
    PlusComponent,
    CogComponent,
    ExclamationTriangleComponent,
    ArrowRepeatComponent,
    CircleCloseComponent,
    SignComponent,
    FolderComponent,
    SeparatorComponent,
    PhotoComponent,
    RawComponent,
    MovieComponent
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
    PlusComponent,
    CogComponent,
    ExclamationTriangleComponent,
    ArrowRepeatComponent,
    CircleCloseComponent,
    SignComponent,
    FolderComponent,
    SeparatorComponent,
    RawComponent,
    PhotoComponent,
    MovieComponent
  ],
  imports: [
    CommonModule
  ]
})
export class IconsModule {
}
