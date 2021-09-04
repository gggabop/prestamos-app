/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from '../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-put-pedido',
  host: {
    class:'w-full'
  },
  templateUrl: './put-pedido.component.html',
  styleUrls: ['./put-pedido.component.scss'],
})
export class PutPedidoComponent implements OnInit {


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
    name_customer: ['', [Validators.required]],
    cedula_customer: ['', [Validators.required]],
    address_work_customer: ['', [Validators.required]],
    address_home_customer: ['', [Validators.required]],
    extra_address_customer: ['', [Validators.required]],
    cellphone_customer: ['', [Validators.required]],
    extra_cellphone_customer: ['', [Validators.required]]
  });

  pedido: any;


  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService,
              private rutaActiva: ActivatedRoute,) { }

  ngOnInit() {
    this.dbService.get(this.rutaActiva.snapshot.params.id,'customer')
    .subscribe(resp=>{
      console.log(this.rutaActiva.snapshot.params.id);
      console.log(resp.pedido);
       this.putFrom = this.fb.group({
        name_customer: [resp.pedido[0].name_customer, [Validators.required]],
        cedula_customer: [resp.pedido[0].cedula_customer, [Validators.required]],
        address_work_customer: [resp.pedido[0].address_work_customer, [Validators.required]],
        address_home_customer: [resp.pedido[0].address_home_customer, [Validators.required]],
        extra_address_customer: [resp.pedido[0].extra_address_customer, [Validators.required]],
        cellphone_customer: [resp.pedido[0].cellphone_customer, [Validators.required]],
        extra_cellphone_customer: [resp.pedido[0].extra_cellphone_customer, [Validators.required]]
      });
    });
  }


  put(){
    this.dbService.put(this.putFrom.value, 'cashorder',this.rutaActiva.snapshot.params.id)
    .subscribe(resp=>{
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Usuario Actualizado'
        });
        this.router.navigateByUrl('/dashboard/pedidos');
        window.location.reload();
      }
    });
  }

}
