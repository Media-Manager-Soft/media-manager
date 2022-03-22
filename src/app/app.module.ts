import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import { GridComponent } from './media/grid/grid.component';
import { MediaItemComponent } from './media/media-item/media-item.component';
import { NotificationComponent } from './notification/notification.component';
import { WorkerComponent } from './notification/worker/worker.component';
import { PreviewMediaComponent } from './media/preview-media/preview-media.component';
import { PinchZoomModule } from "ngx-pinch-zoom";
import { NavComponent } from './nav/nav.component';
import { DatesComponent } from './filters/dates/dates.component';
import { TreeViewComponent } from "./filters/dates/tree-view/tree-view.component";
import { TreeItemComponent } from "./filters/dates/tree-view/tree-item/tree-item.component";
import { FlagsComponent } from './filters/flags/flags.component';
import { FavoritesComponent } from './filters/favorites/favorites.component';
import { PhotoBufferComponent } from './media/media-item/photo-buffer/photo-buffer.component';
import { LocationsComponent } from './filters/locations/locations.component';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { IconsModule } from "./icons/icons.module";
import { PreviewToolsComponent } from './media/preview-media/preview-tools/preview-tools.component';
import { ModalComponent } from './ui/modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    MediaItemComponent,
    NotificationComponent,
    WorkerComponent,
    PreviewMediaComponent,
    NavComponent,
    DatesComponent,
    TreeViewComponent,
    TreeItemComponent,
    FlagsComponent,
    FavoritesComponent,
    PhotoBufferComponent,
    LocationsComponent,
    PreviewToolsComponent,
    ModalComponent,
  ],
  imports: [
    IconsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    PinchZoomModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
