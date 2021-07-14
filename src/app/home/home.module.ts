import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HomePageRoutingModule } from './home-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    
  ],

  providers: [
    Geolocation,

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
