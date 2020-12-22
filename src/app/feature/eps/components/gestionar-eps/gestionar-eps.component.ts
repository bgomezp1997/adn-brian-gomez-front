import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Eps } from '@eps/shared/model/eps';
import { EpsService } from '@eps/shared/service/eps.service';
import Swal from 'sweetalert2';

const LONGITUD_MINIMA_TELEFONO = 5;
const LONGITUD_MAXIMA_TELEFONO = 10;

@Component({
  selector: 'app-gestionar-eps',
  templateUrl: './gestionar-eps.component.html',
  styleUrls: ['./gestionar-eps.component.css']
})
export class GestionarEpsComponent implements OnInit {

  public epsForm: FormGroup;

  public titulo: string;
  public eps: Eps;
  private crearClicked: boolean;

  constructor(protected epsService: EpsService, private router: Router, private activateRoute: ActivatedRoute) {
    this.crearClicked = false;
  }

  ngOnInit(): void {
    this.eps = new Eps;
    this.construirFormularioProducto();
    this.cargarEps();
  }

  private cargarEps(): void {
    this.activateRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.titulo = "Actualizar EPS";
        this.epsService.consultarPorId(id).subscribe(eps => {
          this.eps = eps;
          this.setValue();
        });
      } else {
        this.titulo = "Crear EPS";
      }
    });
  }

  private setValue(): void {
    this.epsForm.setValue({
      nombre: this.eps.nombre,
      nit: this.eps.nit,
      telefono: this.eps.telefono,
      email: this.eps.email
    });
  }

  private construirFormularioProducto() {
    this.epsForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      nit: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_TELEFONO), Validators.maxLength(LONGITUD_MAXIMA_TELEFONO)]),
      email: new FormControl('', [Validators.required, Validators.email])
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
    this.fabricarEps();
    this.epsService.guardar(this.eps).subscribe(response => {
      if (response) {
        this.router.navigate(['/eps']);
        this.epsService.notificarGestion.emit(response);
        Swal.fire("Se ha creado la EPS", "La EPS se creó correctamente", 'success');
      }
    }, err => {
      Swal.fire(err.error.mensaje, "Nombre de la excepción: " + err.error.nombreExcepcion, 'error');
    });

  }

  public actualizar(): void {
    this.fabricarEps();
    this.epsService.actualizar(this.eps).subscribe(response => {
      this.router.navigate(['/eps']);
      this.epsService.notificarGestion.emit(response);
      Swal.fire("Se ha actualizado la EPS", "La EPS se actualizó correctamente", 'success');
    }, err => {
      Swal.fire(err.error.mensaje, "Nombre de la excepción: " + err.error.nombreExcepcion, 'error');
    });
  }

  private fabricarEps(): void {
    this.eps.nombre = this.epsForm.get('nombre').value;
    this.eps.nit = this.epsForm.get('nit').value;
    this.eps.telefono = this.epsForm.get('telefono').value;
    this.eps.email = this.epsForm.get('email').value;
  }

  public onCrearClick(): void {
    this.crearClicked = true;
  }

  public onEditarClick(): void {
    this.crearClicked = false;
  }

}
