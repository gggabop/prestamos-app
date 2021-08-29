import { dashboardService } from './../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-show-cliente',
  templateUrl: './show-cliente.component.html',
  styleUrls: ['./show-cliente.component.scss'],
})
export class ShowClienteComponent implements OnInit {

  toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  public cliente = [];
  public prestamos = [];
  public montoPrestado;
  constructor(private rutaActiva: ActivatedRoute,
              private dbService: dashboardService,
              private router: Router) {}

  ngOnInit() {
     this.getCliente(this.rutaActiva.snapshot.params.id);
     this.prestamos.forEach(prestamo => {
        this.montoPrestado = prestamo.amount_rest_loan;
        console.log( this.montoPrestado );
     });
  }

  getCliente(id){
    this.dbService.get(id, 'customer')
    .subscribe(resp=>{
      this.cliente = resp.cliente;
      this.prestamos = resp.prestamos;
    });
  }
  delete(){
    this.dbService.delete(this.rutaActiva.snapshot.params.id, 'customer')
    .subscribe(resp=>{
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Usuario Actualizado'
        });
        this.router.navigateByUrl('/dashboard/clientes');
      }
    });
  }



}
