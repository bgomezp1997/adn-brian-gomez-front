import { Component, OnInit } from '@angular/core';
import { Cita } from '../../shared/model/cita';
import { CitaService } from '../../shared/service/cita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  public citas: Cita[];

  constructor(protected citaService: CitaService) {}

  ngOnInit(): void {
    this.citaService.consultar().subscribe(citas => this.citas = citas);

    this.citaService.notificarGestion.subscribe(indicador => {
      console.log("Subscribiendo los nuevos datos de las citas: " + indicador);
      this.citaService.consultar().subscribe(citas => this.citas = citas);
    });
  }

  public delete(cita: Cita): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Cuidado!',
        text: `Está seguro de eliminar la cita agendada el ${cita.fechaCita} con el(la) paciente ${cita.paciente.nombres} ${cita.paciente.apellidos} y con el(la) médico ${cita.medico.nombres} ${cita.medico.apellidos} (${cita.medico.especialidad})?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si eliminar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
      }).then((result) => {
      if (result.value) {
        this.citaService.eliminar(cita).subscribe(
          response => {
            if(!response) {
              this.citas = this.citas.filter(ci => ci !== cita);
              swalWithBootstrapButtons.fire(
                'Cita eliminada',
                `La cita se ha eliminado con éxito de la agenda`,
                'success'
              );
            }
          }
        );
      }
    });
  }

}
