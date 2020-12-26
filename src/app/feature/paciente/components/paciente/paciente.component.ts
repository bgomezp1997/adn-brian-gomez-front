import { Component, OnInit } from '@angular/core';
import { Paciente } from '@paciente/shared/model/paciente';
import { PacienteService } from '@paciente/shared/service/paciente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  public pacientes: Paciente[];
  public page: number;
  public pageSize: number;

  constructor(protected pacienteService: PacienteService) {
    this.page = 1;
    this.pageSize = 5;
  }

  ngOnInit(): void {
    this.pacienteService.consultar().subscribe(paientes => this.pacientes = paientes);

    this.pacienteService.notificar.subscribe(indicador => {
      console.log('Subscribiendo los nuevos datos de los médicos: ' + indicador);
      this.pacienteService.consultar().subscribe(paientes => this.pacientes = paientes);
    });
  }

  public delete(paciente: Paciente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Cuidado!',
      text: `Está seguro de eliminar el paciente ${paciente.nombres} ${paciente.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.pacienteService.eliminar(paciente).subscribe(
          response => {
            if (!response) {
              this.pacientes = this.pacientes.filter(pac => pac !== paciente);
              swalWithBootstrapButtons.fire(
                'Paciente eliminado',
                `El paciente se ha eliminado con éxito de la base de datos`,
                'success'
              );
            }
          }, err => {
            Swal.fire(err.error.mensaje, 'Nombre de la excepción: ' + err.error.nombreExcepcion, 'error');
          });
      }
    });
  }

}
