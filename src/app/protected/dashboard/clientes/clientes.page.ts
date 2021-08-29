import { dashboardService } from './../dashboard-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export default class ClientesPage implements OnInit {

  public clientes;

  public rla=false;

  constructor(private dbSevice: dashboardService) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    this.dbSevice.getAll('customer')
    .subscribe(resp=>{
       this.clientes = resp.clientes;
    });

 }
 onClick(){
  this.rla=true;
}
}
