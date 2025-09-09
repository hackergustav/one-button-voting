import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TeamDto {
  teamName: string;
  criteria: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {

  private readonly baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /** Sends an empty POST to /api/ping */
  postPing(): Observable<void> {
    // Empty body {} and default headers; adjust as needed
    return this.http.post<void>(`${this.baseUrl}/api/ping`, {});
  }

  /** GETs the TeamDto from /api/team */
  getTeam(): Observable<TeamDto> {
    return this.http.get<TeamDto>(`${this.baseUrl}/api/team`);
  }
}
