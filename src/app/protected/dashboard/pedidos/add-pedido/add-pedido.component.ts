/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from '../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { parseJSON } from 'jquery';
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

  get customerName() {
    return this.addFrom.get('fk_customer_id');
  }

  changeCustomer(){
    console.log(event);
  }

  getClientes(){
    this.dbService.getAll('customer')
    .subscribe(resp=>{
       this.clientes = resp.clientes;
       console.log(this.clientes);
    });

 }


  add(){
    if(!this.addFrom.valid){
      this.toast.fire({
        icon: 'warning',
        title: 'Datos Ingresados - Invalido y/o vacios'
      });
      return;
    }
     const cliente = JSON.parse(this.customerName.value);
     const monto = this.addFrom.get('amount_cash_order').value;
     this.addFrom = this.fb.group({
      fk_customer_id: [cliente, [Validators.required]],
      amount_cash_order: [monto, [Validators.required]],
     });
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
