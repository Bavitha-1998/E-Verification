import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  company: String;
  password: String;
  phone:String;

  constructor(
    private validateservice:ValidateService,
    private flashMessage: FlashMessagesService,
    private authService:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      company:this.company,
      phone:this.phone,
      password: this.password
    };
    // Required Fields
    if(!this.validateservice.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    //validate Phone
    if(!this.validateservice.validatePhone(user.phone)){
      this.flashMessage.show('Please use a valid phone number', {cssClass: 'alert-danger', timeout: 3000});
      return false; 
    }

    // Validate Email
    if(!this.validateservice.validateEmail(user.email)) {
    this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.authService.registerUser(user).subscribe(data => {
    if(data.success) {
      this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/login']);
    } else {
      this.flashMessage.show(''+data.msg, {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/register']);
    }
  });
  }
}