import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  get usuario(){
    return this.authService.user;
  }

  public appPages = [
    { title: 'Clientes', url: '/dashboard/clientes/', icon: 'people' },
    { title: 'Pedidos', url: '/dashboard/pedidos', icon: 'paper-plane' },
    { title: 'Auditoria', url: '/dashboard/auditoria', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(private router: Router,
              private authService: AuthService,
              private menu: MenuController) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('');
  }

}


