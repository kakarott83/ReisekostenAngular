import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { DataViewModule } from 'primeng/dataview';
import { TabMenuModule } from 'primeng/tabmenu';

import { AppComponent } from './app.component';
import { TravelsComponent } from './travels/travels.component';
import { TravelDetailComponent } from './travel-detail/travel-detail.component';
import { TravelAddComponent } from './travel-add/travel-add.component';
import { TravelEditComponent } from './travel-edit/travel-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TravelSearchComponent } from './travel-search/travel-search.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ContextMenuModule } from 'primeng/contextmenu';
import { SpinnerModule } from 'primeng/spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';



@NgModule({
  declarations: [
    AppComponent,
    TravelsComponent,
    TravelDetailComponent,
    TravelAddComponent,
    TravelEditComponent,
    MessagesComponent,
    DashboardComponent,
    TravelSearchComponent,
    CustomersComponent,
    CustomerAddComponent,
    TabMenuComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CalendarModule,
    BrowserAnimationsModule,
    DropdownModule,
    DataViewModule,
    TabMenuModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ContextMenuModule,
    SpinnerModule,
    ProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
