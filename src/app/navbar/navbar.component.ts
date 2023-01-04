import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from '../auth/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isLogged= false;
  username ="";

  private subscription: Subscription = new Subscription();

  constructor(private tokenService: TokenService) { }


  ngOnInit(): void {

    this.setData();
   

    this.subscription.add(

      this.tokenService.refresh.subscribe(resp =>{
        this.setData();
      })
    )

    console.log(this.isLogged);
  }

  ngOnDestroy(): void {
   
    this.subscription.unsubscribe();
  }

  private setData(){

    this.isAdmin = this.tokenService.isAdmin();
    this.isLogged = this.tokenService.isLogged();
    this.username = this.tokenService.getUsername();
  }
  logOut() {
    this.isAdmin=false;
    this.isLogged=false;
    this.username="";

    this.tokenService.logOut();
    }


}
