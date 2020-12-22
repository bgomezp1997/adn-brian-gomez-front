import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Eps } from '@eps/shared/model/eps';
import { EpsService } from '@eps/shared/service/eps.service';
import { Paciente } from '@paciente/shared/model/paciente';
import { PacienteService } from '@paciente/shared/service/paciente.service';
import Swal from 'sweetalert2';

const FORMAT_DATE: string = "yyyy-MM-dd HH:mm:ss";
const LONGITUD_MAXIMA_ESTRATO = 1;

@Component({
  selector: 'app-gestionar-paciente',
  templateUrl: './gestionar-paciente.component.html',
  styleUrls: ['./gestionar-paciente.component.css']
})
export class GestionarPacienteComponent implements OnInit {

  public pacienteForm: FormGroup;

  public titulo: string;
  public paciente: Paciente;
  private crearClicked: boolean;
  public fechaCreacionDate: Date;

  public eps: Eps[];
  public atributoAutocomplete = 'nombre';

  constructor(protected pacienteService: PacienteService, protected epsService: EpsService, private activateRoute: ActivatedRoute, private router: Router, private datePipe: DatePipe) { 
    this.crearClicked = false;
  }

  ngOnInit(): void {
    this.paciente = new Paciente();
    this.construirFormularioProducto();
    this.epsService.consultar().subscribe(eps => this.eps = eps);
    this.cargarPaciente();
  }

  private cargarPaciente(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.titulo = "Actualizar Paciente";
        this.pacienteService.consultarPorId(id).subscribe(paciente => {
          this.paciente = paciente
          this.setValue();
        });
      } else {
        this.titulo = "Crear Paciente";
      }
    });
  }

  private setValue(): void {
    this.fechaCreacionDate = new Date(this.paciente.fechaCreacion);
    let fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.pacienteForm.setValue({
      nombres: this.paciente.nombres,
      apellidos: this.paciente.apellidos,
      fechaCreacion: fechaCitaFormateada,
      identificacion: this.paciente.identificacion,
      email: this.paciente.email,
      estrato: this.paciente.estrato,
      eps: this.paciente.eps.nombre
    });
  }

  private construirFormularioProducto() {
    if (!this.fechaCreacionDate) {
      this.fechaCreacionDate = new Date();
    }
    let fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.pacienteForm = new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      fechaCreacion: new FormControl({value: fechaCitaFormateada, disabled: true}, [Validators.required]),
      identificacion: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      estrato: new FormControl('', [Validators.required, Validators.maxLength(LONGITUD_MAXIMA_ESTRATO)]),
      eps: new FormControl('', [Validators.required])
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
    this.fabricarPaciente();
    this.pacienteService.guardar(this.paciente).subscribe(response => {
      if (response) {
        this.router.navigate(['/paciente']);
        this.pacienteService.notificarGestion.emit(response);
        Swal.fire("Se ha creado el paciente", "El paciente se guardó correctamente", 'success');
      }
    }, err => {
      Swal.fire(err.error.mensaje, "Nombre de la excepción: " + err.error.nombreExcepcion, 'error');
    });

  }

  public actualizar(): void {
    this.fabricarPaciente();
    this.pacienteService.actualizar(this.paciente).subscribe(response => {
      this.router.navigate(['/paciente']);
      this.pacienteService.notificarGestion.emit(response);
      Swal.fire("Se ha actualizado el paciente", "El paciente se actualizó correctamente", 'success');
    }, err => {
      Swal.fire(err.error.mensaje, "Nombre de la excepción: " + err.error.nombreExcepcion, 'error');
    });
  }

  private fabricarPaciente(): void {
    this.paciente.nombres = this.pacienteForm.get('nombres').value;
    this.paciente.apellidos = this.pacienteForm.get('apellidos').value;
    this.paciente.identificacion = this.pacienteForm.get('identificacion').value;
    this.paciente.email = this.pacienteForm.get('email').value;
    this.paciente.estrato = this.pacienteForm.get('estrato').value;
    let fechaCitaFormateada = this.datePipe.transform(this.fechaCreacionDate, FORMAT_DATE);
    this.paciente.fechaCreacion = fechaCitaFormateada;
  }

  public seleccionarEps(item: Eps): void {
    this.paciente.eps = item;
  }

  public onCrearClick(): void {
    this.crearClicked = true;
  }

  public onEditarClick(): void {
    this.crearClicked = false;
  }

}
