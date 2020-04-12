import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
// Imports for loading & configuring the in-memory web api
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { ProductData } from "./products/product-data";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { ShellComponent } from "./home/shell.component";
import { MenuComponent } from "./home/menu.component";
import { WelcomeComponent } from "./home/welcome.component";
import { PageNotFoundComponent } from "./home/page-not-found.component";

/* Feature Modules */
import { UserModule } from "./user/user.module";
import { environment } from "../environments/environment";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ProductData),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: "Angular NGRX Getting Started",
          maxAge: 25,
          logOnly: environment.production,
        }),
    UserModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    ShellComponent,
    MenuComponent,
    WelcomeComponent,
    PageNotFoundComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
