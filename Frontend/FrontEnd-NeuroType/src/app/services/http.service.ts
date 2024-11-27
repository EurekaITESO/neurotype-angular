import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  apiUrl = "http://localhost:8000";

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
  ) {}

  get<T>(endpoint: string, headers?: HttpHeaders) : Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}${endpoint}`, { headers });
  }

  post<T>(endpoint: string, body: any, options?: { headers?: HttpHeaders }): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}${endpoint}`, body, options);
  }

}
