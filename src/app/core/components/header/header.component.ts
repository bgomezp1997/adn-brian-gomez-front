import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@core/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public titulo = "Citas - Clínica oftalmológica";
  public estaLogeado: boolean;

  constructor(private tokenStorageService: TokenStorageService) { 
    this.estaLogeado = false;
  }

  ngOnInit(): void {
    let token = this.tokenStorageService.getToken();
    if(token != null && token) {
      this.estaLogeado = true;
    }
  }

  public logout() {
    Swal.fire('Login', 'Se ha cerrado sesión con éxito', 'success');
    this.tokenStorageService.signOut();
  }

}
