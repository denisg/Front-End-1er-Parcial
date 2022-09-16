import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/categoria';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(private api: CategoryService) { }

  public categoria: Categoria = new Categoria;

  ngOnInit(): void {
  }

  async guardar() {
    console.log('Crear Categoria nueva: ', this.categoria.descripcion);
    await this.api.createCategory(this.categoria.descripcion);
  }

  // async createCategory() {
  //   if (!this.newCategoryName) return;
  //   this.categories = this.categories.concat(
  //     await this._service.createCategory(this.newCategoryName)
  //   );
  //   this.newCategoryName = '';
  //   this.showAddModal = false;
  // }

}
