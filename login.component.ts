import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users:any[]=[];
  email:String='';
  constructor(private http: HttpClient,private cookie: CookieService, private router: Router) { }

  frmLogin = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  })

  GetUsers():Observable<any[]>{
    return this.http.get<any[]>("http://127.0.0.1:3200/getusers");
  }

  VerifyLogin(e:any){
    if(this.cookie.get('userid')==''){
      for(var item of this.users){
        if(item.email==e.email && item.password==e.password){
          this.cookie.set('userid', item.email);
          alert('Login Success');
          this.router.navigate(['products']);
          break;
        }else{
          this.router.navigate(['error']);
        }
      }
    }
    else{
      alert('Already Login');
  }
}

ngOnInit(): void {
  this.GetUsers().subscribe(data => this.users = data);
}

}