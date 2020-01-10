import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// third parties
import { NgSelectModule } from '@ng-select/ng-select';

// httpClient interceptors
import { TokenInterceptor, JwtInterceptor, ErrResponseInterceptor } from './services/http-interceptor';

// services
import { AccountService } from './services/account.service';
import { ExpenseCategoriesService } from './services/expese-category.service';
import { ExpensesService } from './services/expese.service';
import { ExpenseGroupsService } from './services/expese-group.service';
import { StatisticsService } from './services/statistics.service';
import { GooglePieChartService, GoogleComboChartService } from './services/google-charts-service';
import { MsgService } from './services/msg-service.service';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarModule } from './shared/navbar/navbar.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LoginComponent } from './account/login.component';
import { LocalStorageManager } from './services/local-storage.service';
import { ExpensesComponent } from './expenses/expenses.component';
import { ExpensesAddComponent } from './expenses/expenses-add.component';
import { ExpensesEditComponent } from './expenses/expenses-edit.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PieChartComponent } from './charts/piechart.component';
import { ComboChartComponent } from './charts/combochart.component';
import { UpdatePwdComponent } from './account/update-pwd.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { SyncComponent } from './sync/sync.component';
import { RegisterComponent } from './account/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ExpensesComponent,
    ExpensesAddComponent,
    ExpensesEditComponent,
    StatisticsComponent,
    PieChartComponent,
    ComboChartComponent,
    UpdatePwdComponent,
    SyncComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    NavbarModule,
    SidebarModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'add-expense/:id', component: ExpensesAddComponent },
      { path: 'edit-expense/:id', component: ExpensesEditComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'update-pwd', component: UpdatePwdComponent },
      { path: 'login', component: LoginComponent },
      { path: 'sync', component: SyncComponent },
      { path: 'register', component: RegisterComponent }
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    LocalStorageManager,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrResponseInterceptor,
      multi: true
    },
    AccountService,
    ExpenseGroupsService,
    ExpenseCategoriesService,
    ExpensesService,
    StatisticsService,
    GooglePieChartService,
    GoogleComboChartService,
    MsgService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
