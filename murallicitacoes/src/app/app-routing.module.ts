import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import { CrudComponent } from "./app/crud/crud.component";
import { PrevistasComponent } from "./previstas/previstas.component";
import { RealizadasComponent } from "./realizadas/realizadas.component";



const routes: Routes = [{
    path:"",
    component: CrudComponent
},{
    path: "previstas",
    component:PrevistasComponent
},{
    path: "realizadas",
    component: RealizadasComponent
}];

@NgModule({
imports:[RouterModule.forRoot(routes)],
exports:[RouterModule]

})

export class AppRoutingModule{}