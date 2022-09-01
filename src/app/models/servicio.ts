import { Ficha } from "./fichas";
import { PresentacionProducto } from "./presentacionProducto";

export class Servicio {
    idServicio!: number;
    //flagEstado: R,
    fechaHora!: string;
    presupuesto!: number;
    idFichaClinica!: Ficha;
    observacion!: string;
    //listaDetalles!: T[];
}

export class ServicioPostBody {
    idFichaClinica!: Partial<Ficha>;
    observacion!: string;
}

export class DetalleS {
    idServicioDetalle!: number;
    idPresentacionProducto!: PresentacionProducto;
    idServicio!: Servicio;
}

export class DetallePostBody {
    cantidad!: number;
    idPresentacionProducto!: Partial<PresentacionProducto>;
    idServicio!: Partial<Servicio>;
}
