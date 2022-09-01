import { PresentacionProducto } from "./presentacionProducto";
import { Servicio } from "./servicio";

export class Detalle {
    idServicioDetalle!:number;
    cantidad!: number;
    idPresentacionProducto!: PresentacionProducto;
    idServicio!: Servicio;       
}