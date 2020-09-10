import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

//const SHA256 = require("crypto-js/sha256");


@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent implements OnInit {
  fname: String;
  lname: String;
  email: String;
  company: String;
  phone:String;
  gender:String;
  projectcount:String;
  technical:String;
  communicational:String;
  behaviour:String;
  //hashvalue:String;

  constructor(
    private validateservice:ValidateService,
    private flashMessage: FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onAddemployeeSubmit() {
    let userdata = JSON.parse(localStorage.getItem('user'));
   
    const user = {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      company: userdata.company,
      phone:this.phone,
      gender: this.gender,
      projectcount:this.projectcount,
      technical:this.technical,
      communicational:this.communicational,
      behaviour:this.behaviour,
     
    };

    // Add Employee
    this.authService.addEmployee(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Employee Details added successfully', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/addemployee']);
      }
    });

  }
}
