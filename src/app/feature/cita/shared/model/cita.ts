import { Medico } from '@medico/shared/model/medico';
import { Paciente } from '@paciente/shared/model/paciente';

export class Cita {
    id: number;
    fechaCita: string;
    paciente: Paciente;
    medico: Medico;
    precio: number;
}
