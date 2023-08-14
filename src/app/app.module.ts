import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerComponent } from './components/container/container.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './models/home/home.component';
import { AvatarModule } from 'ngx-avatar';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ColisComponent } from './models/colis/colis.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { TreeTableModule } from 'primeng/treetable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorModule } from 'primeng/paginator';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { TagModule } from 'primeng/tag';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './models/login/login.component';
import { UsersComponent } from './models/users/users.component';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './models/products/add-product/add-product.component';
import { ListProductComponent } from './models/products/list-product/list-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { GalleriaModule } from 'primeng/galleria';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent,
    HeaderComponent,
    DashboardComponent,
    HomeComponent,
    ColisComponent,
    PageNotFoundComponent,
    LoginComponent,
    UsersComponent,
    AddProductComponent,
    ListProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AvatarModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    CascadeSelectModule,
    DropdownModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    MultiSelectModule,
    PaginatorModule,
    SelectButtonModule,
    TableModule,
    TooltipModule,
    TriStateCheckboxModule,
    TreeTableModule,
    ReactiveFormsModule,
    CommonModule,
    TagModule,
    InputTextModule,
    BrowserAnimationsModule,
    RippleModule,
    MessagesModule,
    ConfirmDialogModule,
    ToastModule,
    DynamicDialogModule,
    DialogModule,
    GalleriaModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
