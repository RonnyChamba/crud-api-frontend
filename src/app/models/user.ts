export class UserDTO {

    id: number;
    username: string;
    password: string;
    roles: string ="ROLE_USER";


}

export class UserResponse {

    id: number;
    username: string;    
    roles:[] = [];


}
