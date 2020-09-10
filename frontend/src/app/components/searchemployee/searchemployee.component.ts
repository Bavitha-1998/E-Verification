import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchemployee',
  templateUrl: './searchemployee.component.html',
  styleUrls: ['./searchemployee.component.css']
})
export class SearchemployeeComponent implements OnInit {
  employee: any[];
  phone:String;

  constructor(private validateservice:ValidateService,
    private flashMessage: FlashMessagesService,
    private authService:AuthService,
    private router: Router) { }

  ngOnInit() {
  }
  onSearchSubmit(){
    this.authService.getEmployee(this.phone)
      .subscribe(results =>{
        if(results.length==0){
          this.flashMessage.show("No result found.",{cssClass:'alert-danger text-center',timeOut:2000});
        }else{
          console.log('bhjjkhbnhjbhkjlk',results);
          this.employee=results;
        }
      });
    }

}
