import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from 'src/app/newsfeed.service';
import User from 'src/app/models/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email_id:any = [];

  constructor(private newsfeedservices:NewsfeedService) { }

  ngOnInit(): void {
      this.email_id  = [];
  }

  registerUser(username:string,password:string)
  {
    this.newsfeedservices.create_user(username,password).subscribe((user:any)=>{
      this.email_id.push(user);
    });
  }

}
