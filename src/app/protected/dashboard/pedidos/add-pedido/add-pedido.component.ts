/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from '../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-pedido',
  host: {
    class:'w-full'
  },
  templateUrl: './add-pedido.component.html',
  styleUrls: ['./add-pedido.component.scss'],
})
export class AddPedidoComponent implements OnInit {

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
    amount_cash_order: ['', [Validators.required]],
    fk_customer_id: ['', [Validators.required]]
  });



  clientes = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService) { }

  ngOnInit() {
    this.getClientes();
  }
  getClientes(){
    this.dbService.getAll('customer')
    .subscribe(resp=>{
       this.clientes = resp.clientes;
       console.log(this.clientes);
    });

 }
 eventChange(event){}


  add(){
    if (!this.addFrom.valid) {
      console.log(this.addFrom.value);
    }
    this.dbService.add(this.addFrom.value, 'cashorder')
    .subscribe(resp=>{
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Registro Agregado'
        });
        this.router.navigateByUrl('/dashboard/pedidos');
        window.location.reload();
      }
    });
  }

}
