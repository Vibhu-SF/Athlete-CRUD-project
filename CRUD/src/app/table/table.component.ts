import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { Employee } from 'src/data_models.ts/employe_Data_Model';
import {GetUsersService} from "../services/get-users.service"

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  add_row :boolean = false    
  update_row :boolean = false  
  update_enable = false 
  edit_contact:string=""
  close_form:boolean = false
  user_Details:any
  awardList:any=['ad','asd','asda']
  awardShow=false;

@Input() all_Users:any[]=[];

constructor(private api:GetUsersService){ }

@Output() load_data_in_app:EventEmitter<any> = new EventEmitter()

awards(data:string){ 
  const array=JSON.parse(data);
  return array.length ;
}

showAward(awards:any){
  awards=JSON.parse(awards);
  console.log(awards)
  this.awardList=awards;
  this.awardShow=true;
}

ngOnInit(): void { }

enable_form(){
  this.add_row = true
  this.update_enable =false
}
delete_user(data:string){
  console.log(data);
  
  this.api.delete_user(data).subscribe((result)=>{ 
    console.log(result)  
  })

}
enable_update(id:any){
  this.api.get_data(id).subscribe((data)=>{
    this.user_Details=data
    this.add_row =false 
    this.update_row = true
    this.close_form =false  
  })
}
parent_function(check:boolean){ 
  this.close_form=check
  if(check){
    this.add_row = false
    this.update_row = false
  }
}

load_data_from_form(data:boolean){
  this.load_data_in_app.emit(true)
}


}
