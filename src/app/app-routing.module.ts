import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home/home.component";
import { ProductPageComponent } from "./product/product-page/product-page.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "product", component: ProductPageComponent },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
