import { Categoria } from "./categoria";

export class Subcategoria {
    idTipoProducto!: number;
    descripcion!: string;
    idCategoria!: Categoria;
}
