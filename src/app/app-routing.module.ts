import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {MapComponent} from "./pages/map/map.component";
import {MapEditorComponent} from "./pages/map-editor/map-editor.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'map',
        component: MapComponent
      },
      {
        path: 'map-editor',
        component: MapEditorComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
