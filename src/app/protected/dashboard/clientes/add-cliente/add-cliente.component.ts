/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from './../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-cliente',
  host: {
    class:'w-full'
  },
  templateUrl: './add-cliente.component.html',
  styleUrls: ['./add-cliente.component.scss'],
})
export class AddClienteComponent implements OnInit {

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

  addFrom: FormGroup = this.fb.group({
    name_customer: ['', [Validators.required]],
    cedula_customer: ['', [Validators.required]],
    address_work_customer: ['', [Validators.required]],
    address_home_customer: ['', [Validators.required]],
    extra_address_customer: ['', [Validators.required]],
    cellphone_customer: ['', [Validators.required]],
    extra_cellphone_customer: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService) { }

  ngOnInit() {}

  add(){
    if(!this.addFrom.valid){
      this.toast.fire({
        icon: 'warning',
        title: 'Datos Ingresados - Invalidos y/o vacios'
      });
      return;
    }
    this.dbService.add(this.addFrom.value, 'customer')
    .subscribe(resp=>{
      if(resp.errors){
        this.toast.fire({
          icon: 'warning',
          title: resp.errors.cedula_customer ? 'Cedula del cliente ya existe en el sistema'
          : JSON.stringify(resp.errors).replace(/[.*+\-?^${}()|[\]\\]/g,' ')
        });
      }
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Cliente Agregado'
        });
        this.router.navigateByUrl('/dashboard/clientes');
        setTimeout(() => {
          window.location.reload();
          }, 3000);;
      }
    });
  }

}
