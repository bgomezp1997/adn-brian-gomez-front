import { Eps } from "@eps/shared/model/eps";

export class Paciente {
    id: number;
    nombres: string;
    apellidos: string;
    fechaCreacion: string;
    identificacion: string;
    email: string;
    eps: Eps;
    estrato: string;
}