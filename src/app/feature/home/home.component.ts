import { Component, OnInit } from '@angular/core';
import { ParametroService } from '@core/services/parametro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public valorTrm;


  constructor(protected parametroService: ParametroService) { }

  ngOnInit() {
    this.parametroService.consultarTrm().subscribe(res => {
      this.valorTrm = res.value;
    }, error => {
      Swal.fire('Error TRM', `No se pudo cargar la última TRM: ${error.error}`, 'error');
    });
  }

}
