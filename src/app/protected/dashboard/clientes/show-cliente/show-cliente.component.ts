/* eslint-disable @angular-eslint/no-host-metadata-property */
import { dashboardService } from './../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-show-cliente',
  host: {
    class:'w-full'
  },
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
  public dtOptions: DataTables.Settings = {};
  constructor(private rutaActiva: ActivatedRoute,
              private dbService: dashboardService,
              private router: Router) {}

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
     this.getCliente(this.rutaActiva.snapshot.params.id);
     this.prestamos.forEach(prestamo => {
        this.montoPrestado = prestamo.amount_rest_loan;
        console.log( this.montoPrestado );
     });
  }

  getCliente(id){
    this.dbService.get(id, 'customer')
    .subscribe(resp=>{
      console.log(resp);
      this.cliente = resp.cliente;
      this.prestamos = resp.prestamos;
    });
  }
  delete(){
    Swal.fire({
      title: '¿Quiere eliminar este registro?',
      text: 'No puedes revertir esto',
      icon: 'warning',
      // imageUrl: 'https://i.pinimg.com/564x/ac/d4/fb/acd4fb9f575c28020064ba55664cfada.jpg',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {this.dbService.delete(this.rutaActiva.snapshot.params.id, 'customer')
      .subscribe(resp=>{
        if(resp.message==='Ok'){
          this.toast.fire({
            icon: 'success',
            title: 'Cliente Actualizado'
          });
          Swal.fire(
            'Eliminado!',
            'El cliente ha sido eliminado',
            'success'
          );
          this.router.navigateByUrl('/dashboard/clientes');
          setTimeout(() => {
            window.location.assign('/dashboard/clientes');
            }, 2000);
        }
      });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }



}
