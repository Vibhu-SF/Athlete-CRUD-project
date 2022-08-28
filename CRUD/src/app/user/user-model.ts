export class UserModel {
    constructor(
        public athleteName:string,
        public gender:string,
        public dob:Date,
        public age:number,
        public awards:number,
        public sport:string
    ){}
}
