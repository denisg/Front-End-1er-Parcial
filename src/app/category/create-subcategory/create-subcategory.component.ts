import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subcategoria } from 'src/app/models/subcategoria';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-create-subcategory',
  templateUrl: './create-subcategory.component.html',
  styleUrls: ['./create-subcategory.component.css']
})
export class CreateSubcategoryComponent implements OnInit {

  public categoriaId: number = 0;
  public subcategoria: Subcategoria = new Subcategoria();

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.categoriaId = parseInt(paramMap.get('id') ?? '');
    });
    console.log("creando subtegoria a partir de categoriaId:", this.categoriaId);
  }

  async guardar() {
    // this.servicioFicha.putFicha(this.ficha).subscribe();
    console.log('peticion', this.categoryService.createSubCategory(this.categoriaId, this.subcategoria.descripcion));
  }

}
