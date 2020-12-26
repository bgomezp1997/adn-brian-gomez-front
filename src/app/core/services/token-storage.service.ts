import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { throwError } from "rxjs";

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';

@Injectable()
export class TokenStorageService {

    constructor(private router: Router) { }

    signOut() {
        window.sessionStorage.clear();
    }

    public logout() {
        window.sessionStorage.clear();
    }

    public saveToken(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string {
        let token = sessionStorage.getItem(TOKEN_KEY);
        if(token != null && token) {
            if(!this.tokenExpired(token)){
                return token;
            } else {
                Swal.fire('Sesión expirada', 'Su sesión ha expirado!', 'info');
                this.logout();
                this.router.navigate(['/login']);
                throw throwError('Token expirado');
            }
        }
        return null;
    }

    public saveUsername(username: string) {
        window.sessionStorage.removeItem(USERNAME_KEY);
        window.sessionStorage.setItem(USERNAME_KEY, username);
    }

    public getUsername(): string {
        return sessionStorage.getItem(USERNAME_KEY);
    }

    private tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}