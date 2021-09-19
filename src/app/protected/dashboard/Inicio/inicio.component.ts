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
})
export class InicioComponent implements OnInit {

  constructor(){}

  ngOnInit(){}

}
