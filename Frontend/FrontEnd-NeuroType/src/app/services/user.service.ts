import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { AuthService } from "./auth.service";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from "../types/user";
import { Notes } from "../types/notes";
import { response } from "express";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userNotes = new BehaviorSubject<Notes[] | null>([]);
  public userNotes$ = this.userNotes.asObservable();

  constructor(
    private httpService: HttpService,
    private authService: AuthService,
  ) { }

  private apiUrl = "/notes";

  getUserNotes() {
    const token = this.authService.getToken();
    if (token) {
      const headers: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      });
      this.httpService.get<Notes[]>(this.apiUrl, headers).subscribe({
        next:(data)=>{
          this.userNotes.next(data)
        },error: (err)=>{
          console.error(err)
        }
      })
    } else {
      console.error('no token')
    }
  }

  postNote(note: string): Observable<any> {
    const token = this.authService.getToken();
    if (token) {
      const headers: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      });
      return this.httpService.post(this.apiUrl, { text:note }, {headers: headers });
    } else {
      throw new Error("Token no disponible. El usuario no está autenticado.");
    }
  }
}
