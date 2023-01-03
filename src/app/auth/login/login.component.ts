import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialUser } from '../models/credential';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  credential = new CredentialUser();

  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onLogin() {

    let smsValid = this.validCredential();
    if (!smsValid) {


      this.authService.onLogin(this.credential).subscribe(response => {
        this.tokenService.setToken(response.token);
        this.router.navigate(['/menu']);

      },
        error => {
          console.log(error);
        }
      );


    } else alert(smsValid);

  }

  private validCredential() {


    let smsValid = "";

    if (!this.credential.username) {
      smsValid += `Username is requerid<br>`;
    }

    if (!this.credential.password) {
      smsValid += `Password is requerid<br>`;
    }

    return smsValid;

  }

}
