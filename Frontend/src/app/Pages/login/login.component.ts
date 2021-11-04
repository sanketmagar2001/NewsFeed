import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsfeedService } from 'src/app/newsfeed.service';
import User from 'src/app/models/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email_id:any = [];

  constructor(
    private newsfeedservice:NewsfeedService,
    private route:ActivatedRoute,
    private router:Router
    ) {
  }
  ngOnInit(): void {
    this.email_id = [];
  }
  loginUser(username:string,password:string)
  {
    this.newsfeedservice.log_in_user(username,password).subscribe((user:any)=>{
      this.email_id = user;
      this.router.navigate(['',this.email_id[0]['Name']]);
    });
  }
}
