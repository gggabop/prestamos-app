/* eslint-disable @angular-eslint/no-host-metadata-property */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-inicio',
  host: {
    class:'w-full justify-center',
  },
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {


  now: Date;
  constructor(){}

  ngOnInit(){
    this.now = new Date();

    setInterval(() => {

      this.now = new Date();

    }, 1000);
  }


}
