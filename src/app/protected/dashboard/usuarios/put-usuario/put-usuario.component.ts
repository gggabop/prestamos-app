/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from '../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-put-usuario',
  host: {
    class:'w-full'
  },
  templateUrl: './put-usuario.component.html',
  styleUrls: ['./put-usuario.component.scss'],
})
export class PutUsuarioComponent implements OnInit {


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

  putFrom: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    password_confirmation: ['', [Validators.required]],
    level: ['', [Validators.required]],
  });

  usuario: any;


  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService,
              private rutaActiva: ActivatedRoute,) { }

  ngOnInit() {
    this.dbService.get(this.rutaActiva.snapshot.params.id,'users')
    .subscribe(resp=>{
      console.log(this.rutaActiva.snapshot.params.id);
      console.log(resp.usuario);
       this.putFrom = this.fb.group({
        name: [resp.usuario.name, [Validators.required]],
        email: [resp.usuario.email, [Validators.required]],
        password: [resp.usuario.password, [Validators.required]],
        password_confirmation: [resp.usuario.password, [Validators.required]],
        level: [resp.usuario.level, [Validators.required]],
      });
    });
  }


  put(){
    if(!this.putFrom.valid){
      this.toast.fire({
        icon: 'warning',
        title: 'Datos Ingresados - Invalido y/o vacios'
      });
      return;
    }
    this.dbService.put(this.putFrom.value, 'users', this.rutaActiva.snapshot.params.id)
    .subscribe(resp=>{
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Usuario Actualizado'
        });
        this.router.navigateByUrl('/dashboard/usuarios');
        window.location.reload();
      }
    });
  }

}
