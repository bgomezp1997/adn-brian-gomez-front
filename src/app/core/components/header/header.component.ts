import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '@core/services/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public titulo = 'Citas - Clínica oftalmológica';

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void { }

  public logout() {
    Swal.fire('Login', 'Se ha cerrado sesión con éxito', 'success');
    this.tokenStorageService.signOut();
  }

  public estaLogeado(): boolean {
    return this.tokenStorageService.estaLogeado();
  }

}
