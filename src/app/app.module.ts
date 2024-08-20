import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsModule } from './features/products/products.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductsModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
      trace: false,
      traceLimit: 75,
      connectInZone: true
    }),
  ],
  providers: [ provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
