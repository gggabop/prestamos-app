/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from '../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-put-pago',
  host: {
    class:'w-full'
  },
  templateUrl: './put-pago.component.html',
  styleUrls: ['./put-pago.component.scss'],
})
export class PutPagoComponent implements OnInit {


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

  prestamos = [];

  putFrom: FormGroup = this.fb.group({
    amount_payment: ['', [Validators.required]],
        fk_id_loan: ['', [Validators.required]],
        date_payment: ['', [Validators.required]],
        serial_payment: ['', [Validators.required]],
  });

  pago: any;
  pipe = new DatePipe('en-US');


  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService,
              private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.dbService.get(this.rutaActiva.snapshot.params.id,'payments')
    .subscribe(resp=>{
      console.log(this.rutaActiva.snapshot.params.id);
      console.log(resp.pago);
      this.pago = resp.pago[0].id;
       this.putFrom = this.fb.group({
        amount_payment: [resp.pago[0].amount_payment, [Validators.required]],
        fk_id_loan: [resp.pago[0].fk_id_loan, [Validators.required]],
        date_payment: [resp.pago[0].date_payment, [Validators.required]],
        serial_payment: [resp.pago[0].serial_payment, [Validators.required]],
      });
    });
    this.dbService.getAll('loans')
    .subscribe(resp=>{
      this.prestamos = resp.prestamos;
    });
  }

  get loanId() {
    return this.putFrom.get('fk_id_loan');
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
    const prestamo = JSON.parse(this.loanId.value);
     const monto = this.putFrom.get('amount_payment').value;
     const fecha = this.putFrom.get('date_payment').value;
     const serial = this.putFrom.get('serial_payment').value;
     const newDate = this.pipe.transform(fecha, 'YYYY-LL-d');
     console.log('fecha', newDate);
     this.putFrom = this.fb.group({
      fk_id_loan: [prestamo, [Validators.required]],
      amount_payment: [monto, [Validators.required]],
      date_payment: [newDate, [Validators.required]],
    serial_payment: [serial, [Validators.required]],
     });
    //  console.log(this.putFrom.value);
    this.dbService.put(this.putFrom.value, 'payments',this.rutaActiva.snapshot.params.id)
    .subscribe(resp=>{
      if(resp.errors){
        console.log(resp.errors);
        this.toast.fire({
          icon: 'warning',
          title: JSON.stringify(resp.errors).replace(/[.*+\-?^${}()|[\]\\]/g,' ')
        });
      }
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Pago Actualizado'
        });
        this.router.navigateByUrl('/dashboard/pedidos');
        setTimeout(() => {
          window.location.reload();
          }, 2000);;
      }
    });
  }

}
