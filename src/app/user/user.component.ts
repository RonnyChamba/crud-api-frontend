import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../auth/service/token.service';
import { UserDTO } from '../models/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userDTO: UserDTO = new UserDTO();

  isLogged = false;
  isAdmin = false;


  constructor(private userService: UserService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {

    this.isAdmin= this.tokenService.isAdmin();

    this.isLogged = this.tokenService.isLogged();
  }

  saveUser() {


    let smsValid = this.validUser();

    if (!smsValid){

      this.userService.saveUser(this.userDTO).subscribe(response =>{

        alert(`User ${response.username} creado con exito`);
        this.router.navigate(['/login'])


      }, errorr =>{
        console.log(errorr);
      });

    }else alert(smsValid);


 

  }

  private validUser(): string {

    let smsValid = "";

    if (!this.userDTO.username) {

      smsValid += `Username no debe ser vacio<br>`;

    }

    if (!this.userDTO.password) {

      smsValid += `Password no debe ser vacio<br>`;

    }


    if (this.userDTO.password && this.userDTO.password.length < 6) {

      smsValid += `Password debe tener al menos 6 caracteres<br>`;

    }

    if (!this.userDTO.roles) {

      smsValid += `Rol no debe ser vacio<br>`;
    }

    smsValid += this.verifyRole(this.userDTO.roles);


    return smsValid;
  }

  private verifyRole(nameRole: string) {

    if (nameRole === "ROLE_ADMIN" || nameRole === "ROLE_USER")
      return "";

    return `Rol ${nameRole} no es valido`;

  }



}
