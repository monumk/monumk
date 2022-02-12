import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users:any[]=[];
  userMessage:string='';
  constructor(private http: HttpClient, private router: Router) { }
  
  frmRegister = new FormGroup({
    userId : new FormControl(''),
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    password : new FormControl(''),
    gender : new FormControl(''),
    email : new FormControl(''),
    mobile : new FormControl(''),
    address : new FormControl(),
    dateOfBirth : new FormControl('')
  });


  GetUsers():Observable<any[]>{
    return this.http.get<any[]>('http://127.0.0.1:3200/getusers');
  }

  SubmitData(e:any){
    this.http.post('http://127.0.0.1:3200/register',e).subscribe();
    alert("Register Successfully");
    this.router.navigate(['/login']);

  }

  VerifyUserId(e:any){
      for(var item of this.users){
        if(item.userId==e.target.value){
            this.userMessage='User Already Taken Try Another';
            break;
        }else{
          this.userMessage='User Available';
        }
      }
  }
    
      
  ngOnInit(): void {
    this.GetUsers().subscribe(data => this.users = data);
  }

}
