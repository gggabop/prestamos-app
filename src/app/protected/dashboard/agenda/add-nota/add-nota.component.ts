/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { dashboardService } from '../../dashboard-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { parseJSON } from 'jquery';
@Component({
  selector: 'app-add-nota',
  host: {
    class:'w-full'
  },
  templateUrl: './add-nota.component.html',
  styleUrls: ['./add-nota.component.scss'],
})
export class AddNotaComponent implements OnInit {

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
    id_fk_customer: ['', [Validators.required]],
    id_fk_loan: ['', [Validators.required]],
    note: ['', [Validators.required]],
    type_note: ['', [Validators.required]],
  });

  prestamos = null;
  clientes = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private dbService: dashboardService) { }

  ngOnInit() {
    this.getClientes();
  }

  get loanId() {
    return this.addFrom.get('id_fk_loan');
  }

  get customerId() {
    return this.addFrom.get('id_fk_customer');
  }

  changeCustomer(){;
    console.log(this.addFrom.get('id_fk_customer').value);
    this.getPrestamos(this.addFrom.get('id_fk_customer').value);
  }

  getPrestamos(id){
    this.dbService.get(id,'customer')
    .subscribe(resp=>{
       this.prestamos = resp.prestamos;
       console.log(this.prestamos);
    });
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
        title: 'Datos Ingresados - Invalidos y/o vacios'
      });
      return;
    }
     const prestamo = JSON.parse(this.loanId.value);
     const cliente = JSON.parse(this.customerId.value);
     const nota = this.addFrom.get('note').value;
     const tipo = this.addFrom.get('type_note').value;
     this.addFrom = this.fb.group({
      id_fk_customer: [cliente, [Validators.required]],
      id_fk_loan: [prestamo, [Validators.required]],
      note: [nota, [Validators.required]],
      type_note: [tipo, [Validators.required]],
     });
    this.dbService.add(this.addFrom.value, 'diary')
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
          title: 'Nota Agregada'
        });
        this.router.navigateByUrl('/dashboard/agenda');
        setTimeout(() => {
          window.location.reload();
          }, 2000);
      }
    });
  }

}
