import { Component, OnInit } from '@angular/core';
import { Eps } from '@eps/shared/model/eps';
import { EpsService } from '@eps/shared/service/eps.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eps',
  templateUrl: './eps.component.html',
  styleUrls: ['./eps.component.css']
})
export class EpsComponent implements OnInit {

  public eps: Eps[];
  public page: number;
  public pageSize: number;

  constructor(protected epsService: EpsService) {
    this.page = 1;
    this.pageSize = 5;
  }

  ngOnInit(): void {
    this.epsService.consultar().subscribe(eps => this.eps = eps);

    this.epsService.notificar.subscribe(indicador => {
      console.log('Subscribiendo los nuevos datos de las eps: ' + indicador);
      this.epsService.consultar().subscribe(eps => this.eps = eps);
    });
  }

  public delete(eps: Eps): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Cuidado!',
      text: `Está seguro de eliminar la eps ${eps.nombre} con nit ${eps.nit}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.epsService.eliminar(eps).subscribe(
          response => {
            if (!response) {
              this.eps = this.eps.filter(ep => ep !== eps);
              swalWithBootstrapButtons.fire(
                'EPS eliminada',
                `La eps se ha eliminado con éxito de la clínica`,
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
