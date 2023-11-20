import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapboxElmComponent } from './mapbox-elm/mapbox-elm.component';



@NgModule({
  declarations: [MapboxElmComponent],
  imports: [
    CommonModule
  ],
  exports:[MapboxElmComponent]
})
export class MapboxElmModule { }
