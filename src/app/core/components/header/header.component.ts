import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public titulo = "Citas - Clínica oftalmológica";

  constructor() { }

  ngOnInit(): void {
  }

}
