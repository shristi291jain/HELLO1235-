import { Component, OnInit} from '@angular/core';
import { FormGroup, Validators } from "@angular/forms";
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
//profileForm: FormGroup;
isSubmit = false;
latitude:any="";
longitude:any="";
name:any="";


  constructor(public actionSheetController:ActionSheetController) {
    
  
   }

   ngOnInit(){
      let self=this;
    self.name = localStorage.getItem("name");


    let latitude=localStorage.getItem("lat");
 
    self.latitude= parseFloat(self.latitude).toFixed(2);
    self.longitude= localStorage.getItem("long")
 
    self.longitude= parseFloat(self.longitude).toFixed(2);

    
   }


   deleteUser(){
   
    localStorage.clear();
  }



 

  

}
