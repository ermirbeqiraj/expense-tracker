import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageManager } from '../services/local-storage.service';
import { MsgService } from '../services/msg-service.service';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private storageManager: LocalStorageManager, private router: Router, private msgService: MsgService) { }

  ngOnInit() {
    
  }

  logout() {
    this.storageManager.ClearAuth();
    this.menuClick();
    this.router.navigate(['/login']);
  }

  menuClick() {
    this.msgService.menuClickAction();
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
