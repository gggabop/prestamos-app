/* eslint-disable @angular-eslint/no-host-metadata-property */
import { dashboardService } from './../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-show-prestamo',
  host: {
    class:'w-full'
  },
  templateUrl: './show-prestamo.component.html',
  styleUrls: ['./show-prestamo.component.scss'],
})
export class ShowPrestamoComponent implements OnInit {


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

  public prestamo = [];
  public cliente = [];
  public pagos = [];
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
     this.getPrestamo(this.rutaActiva.snapshot.params.id);
  }

  getPrestamo(id){
    this.dbService.get(id, 'loans')
    .subscribe(resp=>{
      this.prestamo = resp.prestamo;
      this.cliente = resp.cliente;
      this.pagos = resp.pagos;
      console.log(resp);
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
      if (result.isConfirmed) {this.dbService.delete(this.rutaActiva.snapshot.params.id, 'loans')
      .subscribe(resp=>{
        if(resp.message==='Ok'){
          this.toast.fire({
            icon: 'success',
            title: 'Registro Actualizado'
          });
          Swal.fire(
            'Eliminado!',
            'El Préstamo ha sido eliminado',
            'success'
          );
          this.router.navigateByUrl('/dashboard/prestamos');
          setTimeout(() => {
            window.location.assign('/dashboard/prestamos');
            }, 2000);
        }
      });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }



}
