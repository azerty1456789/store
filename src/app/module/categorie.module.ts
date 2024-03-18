import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CategorieModule { 
  id: number;
  titre: string;
  description: string;
  parentid: number | null;
  
}
