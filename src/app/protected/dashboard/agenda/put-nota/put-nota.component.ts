/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from '../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-put-nota',
  host: {
    class:'w-full'
  },
  templateUrl: './put-nota.component.html',
  styleUrls: ['./put-nota.component.scss'],
})
export class PutNotaComponent implements OnInit {


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
  clientes = [];

  putFrom: FormGroup = this.fb.group({
    id_fk_customer: ['', [Validators.required]],
    id_fk_loan: ['', [Validators.required]],
    note: ['', [Validators.required]],
    type_note: ['', [Validators.required]],
  });

  nota: any;


  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService,
              private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
    this.dbService.get(this.rutaActiva.snapshot.params.id,'diary')
    .subscribe(resp=>{
      console.log(this.rutaActiva.snapshot.params.id);
      console.log(resp.nota);
      this.nota = resp.nota.id;
       this.putFrom = this.fb.group({
        id_fk_customer: [resp.nota.id_fk_customer, [Validators.required]],
        id_fk_loan: [resp.nota.id_fk_loan, [Validators.required]],
        note: [resp.nota.note, [Validators.required]],
        type_note: [resp.nota.type_note, [Validators.required]],
      });
       this.dbService.get(resp.nota.id_fk_customer,'customer')
        .subscribe(response=>{
       this.prestamos = response.prestamos;
       console.log(response);
       });
    });
    this.dbService.getAll('customer')
    .subscribe(resp=>{
      this.clientes = resp.clientes;
    });
  }

  get loanId() {
    return this.putFrom.get('id_fk_loan');
  }
  get customerId() {
    return this.putFrom.get('id_fk_customer');
  }

  changeCustomer(){;
    this.getPrestamos(this.putFrom.get('id_fk_customer').value);
    console.log(this.putFrom.get('id_fk_customer').value);
  }

  getPrestamos(id){
    this.dbService.get(id,'customer')
    .subscribe(resp=>{
       this.prestamos = resp.prestamos;
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
    const prestamo = JSON.parse(this.loanId.value);
     const cliente = JSON.parse(this.customerId.value);
     const nota = this.putFrom.get('note').value;
     const tipo = this.putFrom.get('type_note').value;
     this.putFrom = this.fb.group({
      id_fk_customer: [cliente, [Validators.required]],
      id_fk_loan: [prestamo, [Validators.required]],
      note: [nota, [Validators.required]],
      type_note: [tipo, [Validators.required]],
     });
    //  console.log(this.putFrom.value);
    this.dbService.put(this.putFrom.value, 'diary',this.rutaActiva.snapshot.params.id)
    .subscribe(resp=>{
      if(resp.message==='Ok'){
        this.toast.fire({
          icon: 'success',
          title: 'Usuario Actualizado'
        });
        this.router.navigateByUrl('/dashboard/agenda');
        window.location.reload();
      }
    });
  }

}
