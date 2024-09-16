import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AdminTemplateComponent} from './admin-template/admin-template.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {CategoriesComponent} from './categories/categories.component';
import {HomeComponent} from './home/home.component';
import {MatCardModule} from "@angular/material/card";
import {LoginComponent} from './login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {CategoryEffects} from "./categories/effects/category.effects";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {categoryReducer} from './categories/reducers/category.reducers';
import {CategoryCreateModalComponent} from './categories/category-create-modal/category-create-modal.component';
import {CategoryDeleteModalComponent} from './categories/category-delete-modal/category-delete-modal.component';
import {ProductEffects} from "./products/effects/product.effects";
import {productReducer} from "./products/reducers/product.reducers";
import {ProductsComponent} from "./products/products.component";
import {ProductCreateModalComponent} from "./products/product-create-modal/product-create-modal.component";
import { ProductDeleteModalComponent } from './products/product-delete-modal/product-delete-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    CategoriesComponent,
    ProductsComponent,
    HomeComponent,
    LoginComponent,
    ProductCreateModalComponent,
    CategoryCreateModalComponent,
    CategoryDeleteModalComponent,
    ProductDeleteModalComponent
  ],
  imports: [
    StoreModule.forRoot({categories: categoryReducer, products: productReducer}),
    EffectsModule.forRoot([CategoryEffects, ProductEffects]),
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
