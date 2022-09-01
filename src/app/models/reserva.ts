import { Persona } from "./persona";

export class Reserva {
    idReserva!: number;
    fecha!: string;
    horaInicio!: string;
    horaFin!: string;
    idEmpleado!: Persona;
    idCliente!: Persona;
    flagEstado!: string;
    flagAsistio!: string;
    observacion!: string;
}

export class ReservaPostBody {
    fechaCadena!: string;
    horaInicioCadena!: string;
    horaFinCadena!: string;
    idEmpleado!: Partial<Persona>;
    idCliente!: Partial<Persona>;
}

export class ReservaPutBody {
    idReserva!: number;
    flagAsistio!: string;
    observacion!: string;
}