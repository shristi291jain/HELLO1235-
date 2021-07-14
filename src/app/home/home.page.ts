import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profileForm:FormGroup;
  createUserCheck:boolean;
  latitude: any;
  longitude: any;
  isSubmit:boolean;
  name:any;
  constructor(public formBuilder:FormBuilder,private geolocation:Geolocation) {}

  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
     
    })

    
  }

  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude + ""+this.latitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }


  createUser(){
   this.createUserCheck = true
   this.getCurrentCoordinates();
  

  }

  submitForm(){
    let self=this;
    self.createUserCheck=false;
    self.isSubmit=true;
   console.log(this.profileForm.value)
   localStorage.setItem("name",this.profileForm.controls['name'].value);
   localStorage.setItem("lat",this.latitude);
   localStorage.setItem("long",this.longitude);


   self.name = localStorage.getItem("name");


   let latitude=localStorage.getItem("lat");

   self.latitude= parseFloat(self.latitude).toFixed(2);
   self.longitude= localStorage.getItem("long")

   self.longitude= parseFloat(self.longitude).toFixed(2);

   console.log(self.name+"VVV"+self.latitude+"fcfcf"+self.longitude)
   self.profileForm.reset();
  }

  deleteUser(){
    this.createUserCheck = true
    localStorage.clear();
  }
}
