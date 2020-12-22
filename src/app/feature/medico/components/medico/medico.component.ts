import { Component, OnInit } from '@angular/core';
import { Medico } from '@medico/shared/model/medico';
import { MedicoService } from '@medico/shared/service/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  public medicos: Medico[];
  public page: number;
  public pageSize: number;

  constructor(protected medicoService: MedicoService) { 
    this.page = 1;
    this.pageSize = 5;
  }

  ngOnInit(): void {
    this.medicoService.consultar().subscribe(medicos => this.medicos = medicos);

    this.medicoService.notificarGestion.subscribe(indicador => {
      console.log("Subscribiendo los nuevos datos de los médicos: " + indicador);
      this.medicoService.consultar().subscribe(medicos => this.medicos = medicos);
    });
  }

  public delete(medico: Medico): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Cuidado!',
        text: `Está seguro de eliminar el médico ${medico.nombres} ${medico.apellidos} con la especialidad de ${medico.especialidad}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
      if (result.value) {
        this.medicoService.eliminar(medico).subscribe(
          response => {
            if(!response) {
              this.medicos = this.medicos.filter(med => med !== medico);
              swalWithBootstrapButtons.fire(
                'Medico eliminado',
                `El médico se ha eliminado con éxito de la base de datos`,
                'success'
              );
            }
          }, err => {
            Swal.fire(err.error.mensaje, "Nombre de la excepción: " + err.error.nombreExcepcion, 'error');
          });
      }
    });
  }

}
