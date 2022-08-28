import { Component, Input, OnInit,Output,EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import {FormControl,FormGroup, Validators} from "@angular/forms"
import {GetUsersService} from '../services/get-users.service'
import { UserModel } from '../user/user-model';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  constructor(private api:GetUsersService) {
    
  }
   
  user_details = new FormGroup({
    athleteName: new FormControl("",[Validators.required]),
    gender: new FormControl("",[Validators.required]),
    age: new FormControl("",Validators.required),
    sport: new FormControl("",[Validators.required]),
    awards: new FormControl("",[Validators.required]),
    dob: new FormControl("",[Validators.required])

  })

  @Output() parent_function : EventEmitter<any> = new EventEmitter() // for using function written in parent component
  @Output() load_data_in_app:EventEmitter<any> = new EventEmitter()
  @Input() user_Details:any
  @Input() update_check :string = "string"
  roles = Roles //enum for choosing role
  ngOnInit(): void {
      // console.log(this.user_Details)
      this.user_Details.awards=JSON.parse(this.user_Details.awards);
      // this.user_Details.dob=new Date(this.user_Details.dob)
        this.user_details.patchValue({...this.user_Details})
  }
  
  close_form() {
    this.parent_function.emit(true)
  }

  awardList=['award1','award2','award3','award4']

  table_data(data:any){
    console.log(data)
    let tempData = data
    data.athlete_id=this.user_Details.athlete_id;
    tempData.awards = JSON.stringify(data.awards)
    const dob:any= new Date(tempData.dob)
    const timeDiff = Math.abs(Date.now() - dob);
    tempData.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    this.api.update_user(tempData.athlete_id,tempData).subscribe((result)=>{
      console.log(result)
      console.log(data)
      console.log(this.update_check)
      this.parent_function.emit(true)
      this.load_data_in_app.emit(true)
      
    })
  }
}
enum Roles{
  SuperAdmin=1,
  Admin=2,
  user=0
}
