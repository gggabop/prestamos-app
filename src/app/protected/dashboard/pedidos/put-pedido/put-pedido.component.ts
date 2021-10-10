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

  clientes = [];

  putFrom: FormGroup = this.fb.group({
    amount_cash_order: ['', [Validators.required]],
    fk_customer_id: ['', [Validators.required]]
  });

  pedido: any;


  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService,
              private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.dbService.get(this.rutaActiva.snapshot.params.id,'cashorder')
    .subscribe(resp=>{
      this.pedido = resp.pedido.id;
      console.log(this.rutaActiva.snapshot.params.id);
      console.log(resp.pedido);
       this.putFrom = this.fb.group({
        amount_cash_order: [resp.pedido.amount_cash_order, [Validators.required]],
        fk_customer_id: [resp.pedido.fk_customer_id, [Validators.required]]
      });
    });
    this.dbService.getAll('customer')
    .subscribe(resp=>{
      this.clientes = resp.clientes;
    });
  }

  get customerName() {
    return this.putFrom.get('fk_customer_id');
  }

  changeCustomer(){
    console.log(event);
  }


  put(){
    if(!this.putFrom.valid){
      this.toast.fire({
        icon: 'warning',
        title: 'Datos Ingresados - Invalidos y/o vacios'
      });
      return;
    }
    const cliente = JSON.parse(this.customerName.value);
     const monto = this.putFrom.get('amount_cash_order').value;
     this.putFrom = this.fb.group({
      fk_customer_id: [cliente, [Validators.required]],
      amount_cash_order: [monto, [Validators.required]],
     });
    //  console.log(this.putFrom.value);
    this.dbService.put(this.putFrom.value, 'cashorder',this.rutaActiva.snapshot.params.id)
    .subscribe(resp=>{
      if(resp.message==='Ok'){
        if(resp.errors){
          console.log(resp.errors);
          this.toast.fire({
            icon: 'warning',
            title: JSON.stringify(resp.errors).replace(/[.*+\-?^${}()|[\]\\]/g,' ')
          });
        }
        this.toast.fire({
          icon: 'success',
          title: 'Pedido Actualizado'
        });
        this.router.navigateByUrl('/dashboard/pedidos');
        setTimeout(() => {
          window.location.reload();
          }, 2000);;
      }
    });
  }

}
