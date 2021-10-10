/* eslint-disable @angular-eslint/no-host-metadata-property */
import { dashboardService } from '../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-show-usuario',
  host: {
    class:'w-full'
  },
  templateUrl: './show-usuario.component.html',
  styleUrls: ['./show-usuario.component.scss'],
})
export class ShowUsuarioComponent implements OnInit {


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

  public usuario = [];
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
     this.getUsuario(this.rutaActiva.snapshot.params.id);
  }

  getUsuario(id){
    this.dbService.get(id, 'users')
    .subscribe(resp=>{
      this.usuario = resp.usuario;
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
      if (result.isConfirmed) {this.dbService.delete(this.rutaActiva.snapshot.params.id, 'users')
      .subscribe(resp=>{
        if(resp.message==='Ok'){
          this.toast.fire({
            icon: 'success',
            title: 'Usuario Actualizado'
          });
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado',
            'success'
          );
          this.router.navigateByUrl('/dashboard/usuarios');
          setTimeout(() => {
            window.location.assign('/dashboard/usuarios');
            }, 2000);
        }
      });
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }



}
