import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import users from './models/users';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  user_id:string = "";

  constructor(
    private webServices:WebService,
    private route:ActivatedRoute
    ) {
      this.route.params.subscribe((params:Params) => this.user_id = params.name);
    }

  create_user(Name:users["Name"],Password:users['Password'])
  {
    return this.webServices.post('Register',{Name,Password});
  }
  log_in_user(Name:users["Name"],Password:users["Password"])
  {
    return  this.webServices.post('Login',{Name,Password});
  }
  get_fav_sub(user_id:string)
  {
    return this.webServices.get(user_id);
  }
  set_fav(user_id:string,title:string)
  {
    return this.webServices.post(user_id,{"type":"fav","title":title});
  }
  set_sub(user_id:string,title:string)
  {
    return this.webServices.post(user_id,{"type":"sub","title":title});
  }

}
