import { Component, OnInit } from '@angular/core';
import { LocalStorageManager } from './services/local-storage.service';
import { ConnectionService } from 'ng-connection-service';
import { DbContextService } from './storage/db-context.service';
import { HttpClient } from '@angular/common/http';
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  syncMessage: string;
  isAuthenticated = false;
  online = true;
  constructor(private db: LocalStorageManager, private connectionService: ConnectionService,
    private httpClient: HttpClient, private dbContext: DbContextService) {
    // this.checkConnection();
  }

  ngOnInit() {
    // this.checkDb();
    // in case of connection change, check db
    this.connectionService.monitor().subscribe(isConnected => {
      this.online = isConnected;
      if (isConnected) {
        console.log('connection is available. checking db');
        this.checkDb();
      } else {
        console.log('no available connnection');
      }
    });
    // by default, checkDb
    this.checkDb();
  }

  checkDb() {
    this.dbContext.getAllTab1().then(response => {
      if (response && response.length) {
        this.syncMessage = `${response.length} requests to be sync with the server...`;
        if (this.online) {
          this.syncMessage = `Connection is available. Syncronizing ${response.length}...`;
          // send these requests to the server...
          for (let i = 0; i < response.length; i++) {
            switch (response[i].method) {
              case 'POST':
                this.syncPost(response[i].clientId, response[i].url, JSON.parse(response[i].body));
                break;
              case 'PUT':
                this.syncPut(response[i].clientId, response[i].url, JSON.parse(response[i].body));
                break;
              case 'DELETE':
                this.syncDelete(response[i].clientId, response[i].url);
                break;
              default:
                console.warn('CASE METHOD NOT SUPPORTED YET');
                break;
            }
          }

          this.syncMessage = '';
        } else {
          this.syncMessage = `There are ${response.length} requests to be syncronized, but no internet connection`;
        }
      }
    });
  }

  syncPost(id: string, url: string, body: any) {
    this.httpClient.post(url, body).subscribe(res => {
      this.dbContext.delete(id).then(() => null);
    }, err => {
      console.log(err);
    });
  }

  syncPut(id: string, url: string, body: any) {
    this.httpClient.put(url, body).subscribe(res => {
      this.dbContext.delete(id).then(() => null);
    }, err => {
      console.log(err);
    });
  }

  syncDelete(id: string, url: string) {
    this.httpClient.delete(url).subscribe(res => {
      this.dbContext.delete(id).then(() => null);
    }, err => {
      console.log(err);
    });
  }

  isAuth() {
    if (this.db.GetToken()) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
    return this.isAuthenticated;
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
