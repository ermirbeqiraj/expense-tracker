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
  isAdmin: boolean = false;

  constructor(private storageManager: LocalStorageManager, private router: Router, private msgService: MsgService) { }

  ngOnInit() {
    var allRoles = this.storageManager.GetRoles();
    if (allRoles && allRoles.length) {
      this.isAdmin = allRoles.filter(x => x == "administrator").length == 1;
    }
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
