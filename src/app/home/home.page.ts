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
  latitude: any="";
  longitude: any="";
  isSubmit:boolean;
  name:any;
  userList:any=[];
  getUserList:any=[];
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
    let getObj = JSON.parse(localStorage.getItem("userObj"));
    //console.log(JSON.parse(localStorage.getItem("userObj")))
    this.getUserList= getObj;
 
    console.log(this.getUserList)


    
  }

  getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(this.latitude + ""+this.latitude)
     }).catch((error) => {
      //  console.log('Error getting location', error);
      alert("Unable to get location")
     });
  }


  createUser(){
   this.createUserCheck = true
   this.getCurrentCoordinates();
  

  }

  submitForm(){
    if(this.getUserList.length > 0){
      for (let i = 0; i < this.getUserList.length; ++i) {
        let name = this.profileForm.controls['name'].value;
        if (this.getUserList[i].name == name) {
            alert("User with same name exist.Try with different name")
            return;
        }
    }
    }
   
    this.createUserCheck=false;
    this.isSubmit=true;
   console.log(this.profileForm.value)

  this.name = localStorage.getItem("name");
   let latitude=localStorage.getItem("lat");
   this.latitude= parseFloat(this.latitude).toFixed(2);
   this.longitude= localStorage.getItem("long")

   this.longitude= parseFloat(this.longitude).toFixed(2);

   console.log(this.name+"VVV"+this.latitude+"fcfcf"+this.longitude)

   let obj={
     "name":this.profileForm.controls['name'].value,
     "lat": this.latitude,
     "long":this.longitude
   }

   let Objectdata =  JSON.parse(localStorage.getItem("userObj"));
   if(Objectdata.length > 0){
    this.userList = JSON.parse(localStorage.getItem("userObj"));
    // this.userList.push(obj);

   }
    this.userList.push(obj);
    localStorage.setItem("userObj",JSON.stringify(this.userList))
   
   let getObj = JSON.parse(localStorage.getItem("userObj"));
   console.log(JSON.parse(localStorage.getItem("userObj")))
   this.userList= getObj;
   this.profileForm.reset();
  }

  deleteUser(obj,i){


    console.log(obj)
    console.log(i)

    let index = this.userList.indexOf(obj);

    if(index > -1){
      this.userList.splice(index, 1);
    }
    localStorage.setItem("userObj",JSON.stringify(this.userList))
   /// this.createUserCheck = true
   
    //localStorage.clear();
  }
}
