import { outputAst } from '@angular/compiler';
import { Component, Input, OnInit, Optional,Output,EventEmitter } from '@angular/core';
import {FormControl,FormGroup, Validators} from "@angular/forms"
import {GetUsersService} from "../services/get-users.service"
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
// import getAgeFromDob from '../../utils/DateUtil.js'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  

// reactive form 
  user_details = new FormGroup({
    athleteName: new FormControl("",[Validators.required]),
    gender: new FormControl("",[Validators.required]),
    age: new FormControl("",Validators.required),
    sport: new FormControl("",[Validators.required]),
    dob: new FormControl("",[Validators.required]),
    awards: new FormControl("",[Validators.required])

  })
  @Output() parent_function : EventEmitter<any> = new EventEmitter() // for using function written in parent component
  @Output() load_data_in_app:EventEmitter<any> = new EventEmitter()

  @Input()
  update_enable:boolean = false //its value will come from parent component and it will help to validate wheather a put operation is gona hit
  // or a post operation here 

  @Input()
  update_check:string = "string" // its value is also come from its  parent component and it help's in update operation for finding a particular 
  //users data
   
  roles = Roles //enum for choosing role

  constructor(private api:GetUsersService) { }

  ngOnInit(): void { }
 //getters for reactive form
 get firstname(){
  return this.user_details.get("athleteName")
  }
  get lastname(){
  return this.user_details.get("gender")
  }
get contact(){
  return this.user_details.get("dob")
}
get role(){
  return this.user_details.get("sport")
}

close_form(){
  this.parent_function.emit(true)
}

awardList=['award1','award2','award3','award4']
  // get address(){
  //   return this.user_details.get("address")
  // }
  //function will be called whenever the form form is submitted
  
  table_data(data:any){
    var tempData = data
    const dob:any= new Date(tempData.dob)
    var timeDiff = Math.abs(Date.now() - dob);
    tempData.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    tempData.awards = JSON.stringify(tempData.awards);
    
    console.log(typeof tempData.dob)
      this.api.add_user(tempData).subscribe((result)=>{
        this.parent_function.emit(true)
        this.load_data_in_app.emit(true)
      
      })
  }
  

}
//Enum for Roles
enum Roles{
  SuperAdmin=1,
  Admin=2,
  user=0
}
