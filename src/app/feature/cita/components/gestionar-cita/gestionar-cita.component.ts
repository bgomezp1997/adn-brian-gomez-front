import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cita } from '@cita/shared/model/cita';
import { CitaService } from '@cita/shared/service/cita.service';
import { Medico } from '@medico/shared/model/medico';
import { MedicoService } from '@medico/shared/service/medico.service';
import { NgbDateStruct, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from '@paciente/shared/model/paciente';
import { PacienteService } from '@paciente/shared/service/paciente.service';

import Swal from 'sweetalert2';

const FORMAT_DATE: string = "yyyy-MM-dd HH:mm:ss";

@Component({
  selector: 'app-gestionar-cita',
  templateUrl: './gestionar-cita.component.html',
  styleUrls: ['./gestionar-cita.component.css']
})
export class GestionarCitaComponent implements OnInit {

  public citaForm: FormGroup;

  public titulo: string;
  public cita: Cita;
  private crearClicked: boolean;
  // Atributos del datepicker y timepicker
  public spinners: boolean;
  public meridian: boolean;
  public date: NgbDateStruct;
  public time: NgbTimeStruct;
  // Atributos de autocomplete
  public medicos: Medico[];
  public pacientes: Paciente[];
  public atributoAutocomplete = 'identificacion';

  constructor(protected citaService: CitaService, protected medicoService: MedicoService, protected pacienteService: PacienteService, private router: Router, private datepipe: DatePipe, private activateRoute: ActivatedRoute) {
    this.spinners = false;
    this.meridian = true;
    this.crearClicked = false;
  }

  ngOnInit(): void {
    this.cita = new Cita();
    this.construirFormularioProducto();
    this.medicoService.consultar().subscribe(medicos => this.medicos = medicos);
    this.pacienteService.consultar().subscribe(pacientes => this.pacientes = pacientes);
    this.cargarCliente();
  }

  private cargarCliente(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.titulo = "Actualizar Cita";
        this.citaService.consultarPorId(id).subscribe(cita => {
          this.cita = cita
          this.setValue();
        });
      } else {
        this.titulo = "Crear Cita";
      }
    });
  }

  private setValue(): void {
    var fechaCitaDate = new Date(this.cita.fechaCita);
    this.date = { year: fechaCitaDate.getFullYear(), month: (fechaCitaDate.getMonth() + 1), day: fechaCitaDate.getDate() };
    this.time = { hour: + fechaCitaDate.getHours(), minute: + fechaCitaDate.getMinutes(), second: fechaCitaDate.getSeconds() };
    this.citaForm.setValue({
      fechaCita: this.date,
      horaCita: this.time,
      medico: this.cita.medico.identificacion,
      paciente: this.cita.paciente.identificacion
    });
  }

  private construirFormularioProducto() {
    this.citaForm = new FormGroup({
      fechaCita: new FormControl('', [Validators.required]),
      horaCita: new FormControl('', [Validators.required]),
      medico: new FormControl('', [Validators.required]),
      paciente: new FormControl('', [Validators.required])
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
    this.fabricarCita();
    this.citaService.guardar(this.cita).subscribe(response => {
      if (response) {
        this.router.navigate(['/cita']);
        this.citaService.notificarGestion.emit(response);
        Swal.fire("Se ha creado la cita", "La cita se agendó correctamente", 'success');
      }
    }, err => {
      Swal.fire(err.error.mensaje, "Nombre de la excepción: " + err.error.nombreExcepcion, 'error');
    });

  }

  public actualizar(): void {
    this.fabricarCita();
    this.citaService.actualizar(this.cita).subscribe(response => {
      this.router.navigate(['/cita']);
      this.citaService.notificarGestion.emit(response);
      Swal.fire("Se ha actualizado la cita", "La cita se actualizó correctamente", 'success');
    }, err => {
      Swal.fire(err.error.mensaje, "Nombre de la excepción: " + err.error.nombreExcepcion, 'error');
    });
  }

  private fabricarCita(): void {
    let fechaCita = this.citaForm.get('fechaCita').value;
    let horaCita = this.citaForm.get('horaCita').value;
    var fechaCitaDate = new Date(fechaCita.year + "-" + fechaCita.month + "-" + fechaCita.day + " " + horaCita.hour + ":" + horaCita.minute + ":" + horaCita.second);
    let fechaCitaFormateada = this.datepipe.transform(fechaCitaDate, FORMAT_DATE);
    this.cita.fechaCita = fechaCitaFormateada;
  }

  public seleccionarMedico(item: Medico): void {
    this.cita.medico = item;
  }

  public seleccionarPaciente(item: Paciente): void {
    this.cita.paciente = item;
  }

  public onCrearClick(): void {
    this.crearClicked = true;
  }

  public onEditarClick(): void {
    this.crearClicked = false;
  }

}
