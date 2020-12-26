import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '@core/services/token-storage.service';
import { Usuario } from '@login/shared/model/usuario';
import { LoginService } from '@login/shared/service/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public titulo = 'Iniciar sesión';
  public loginForm: FormGroup;
  private usuario: Usuario;

  constructor(protected loginService: LoginService, protected tokenStorageService: TokenStorageService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.tokenStorageService.estaLogeado()) {
      const username = this.tokenStorageService.getUsername();
      Swal.fire('Login', `El usuario ${username}, ya se ha logeado`, 'info');
      this.redirect();
    }
    this.construirFormularioProducto();
  }

  private construirFormularioProducto() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public login() {
    this.fabricarUsuario();
    this.loginService.autenticar(this.usuario).subscribe(
      data => {
        const payload = JSON.parse(atob(data.accessToken.split('.')[1]));
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUsername(payload.sub);
        Swal.fire('Login', `El usuario ${payload.sub} se ha logeado con éxito`, 'success');
        this.redirect();
      }, error => {
        Swal.fire('Login', `${error.error}`, 'error');
      }
    );
  }

  private redirect() {
    this.router.navigate(['/home']);
  }

  private fabricarUsuario() {
    this.usuario.username = this.loginForm.get('username').value;
    this.usuario.password = this.loginForm.get('password').value;
  }

}
