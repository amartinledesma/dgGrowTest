import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { SalesComponent } from './components/sales/sales.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'new-product', component: NewProductComponent },
  { path: 'sales', component: SalesComponent },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
