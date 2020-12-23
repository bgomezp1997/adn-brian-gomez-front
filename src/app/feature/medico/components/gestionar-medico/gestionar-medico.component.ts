import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Parametro } from '@core/model/parametro';
import { ParametroService } from '@core/services/parametro.service';
import { Medico } from '@medico/shared/model/medico';
import { MedicoService } from '@medico/shared/service/medico.service';
import Swal from 'sweetalert2';

const LONGITUD_MAXIMA_TARJETA_PROFESIONAL = 10
const FORMAT_DATE: string = "yyyy-MM-dd HH:mm:ss";

@Component({
  selector: 'app-gestionar-medico',
  templateUrl: './gestionar-medico.component.html',
  styleUrls: ['./gestionar-medico.component.css']
})
export class GestionarMedicoComponent implements OnInit {

  public medicoForm: FormGroup;

  public titulo: string;
  public medico: Medico;
  private crearClicked: boolean;
  public fechaCreacionDate: Date;

  public parametros: Parametro[];
  public atributoAutocomplete = 'nombre';

  constructor(protected medicoService: MedicoService, protected parametroService: ParametroService,private activateRoute: ActivatedRoute, private router: Router, private datePipe: DatePipe) {
    this.crearClicked = false;
  }

  ngOnInit(): void {
    this.medico = new Medico();
    this.parametroService.consultar(true, 'ESPECIALIDAD').subscribe(parametros => this.parametros = parametros);
    this.construirFormularioProducto();
    this.cargarMedico();
  }

  private cargarMedico(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.titulo = "Actualizar Médico";
        this.medicoService.consultarPorId(id).subscribe(medico => {
          this.medico = medico
          this.setValue();
        });
      } else {
        this.titulo = "Crear Médico";
      }
    });
  }

  private setValue(): void {
    this.fechaCreacionDate = new Date(this.medico.fechaCreacion);
    let fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.medicoForm.setValue({
      nombres: this.medico.nombres,
      apellidos: this.medico.apellidos,
      fechaCreacion: fechaCitaFormateada,
      identificacion: this.medico.identificacion,
      email: this.medico.email,
      especialidad: this.medico.especialidad,
      numeroTarjetaProfesional: this.medico.numeroTarjetaProfesional
    });
  }

  private construirFormularioProducto() {
    if (!this.fechaCreacionDate) {
      this.fechaCreacionDate = new Date();
    }
    let fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.medicoForm = new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      fechaCreacion: new FormControl({value: fechaCitaFormateada, disabled: true}, [Validators.required]),
      identificacion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      especialidad: new FormControl('', [Validators.required]),
      numeroTarjetaProfesional: new FormControl('', [Validators.required, Validators.maxLength(LONGITUD_MAXIMA_TARJETA_PROFESIONAL)])
    });
  }

  public gestionar(): void {
    if (this.crearClicked) {
      this.crear();
    } else {
      this.actualizar();
    }
  }

  public crear(): void {
    this.fabricarMedico();
    this.medicoService.guardar(this.medico).subscribe(response => {
      if (response) {
        this.router.navigate(['/medico']);
        this.medicoService.notificarGestion.emit(response);
        Swal.fire("Se ha creado el médico", "El médico se ha creado con éxito en la base de datos", 'success');
      }
    }, err => {
      Swal.fire(err.error.mensaje, "Nombre de la excepción: " + err.error.nombreExcepcion, 'error');
    });
  }

  public actualizar(): void {
    this.fabricarMedico();
    this.medicoService.actualizar(this.medico).subscribe(response => {
      this.router.navigate(['/medico']);
      this.medicoService.notificarGestion.emit(response);
      Swal.fire("Se ha actualizado el médico", "El médico se actualizó correctamente", 'success');
    }, err => {
      Swal.fire(err.error.mensaje, "Nombre de la excepción: " + err.error.nombreExcepcion, 'error');
    });
  }

  private fabricarMedico(): void {
    this.medico.nombres = this.medicoForm.get('nombres').value;
    this.medico.apellidos = this.medicoForm.get('apellidos').value;
    this.medico.identificacion = this.medicoForm.get('identificacion').value;
    this.medico.email = this.medicoForm.get('email').value;
    this.medico.numeroTarjetaProfesional = this.medicoForm.get('numeroTarjetaProfesional').value;
    let fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.medico.fechaCreacion = fechaCitaFormateada;
  }

  public seleccionarParametro(item: Parametro): void {
    this.medico.especialidad = item.nombre;
  }

  public onCrearClick(): void {
    this.crearClicked = true;
  }

  public onEditarClick(): void {
    this.crearClicked = false;
  }

}
