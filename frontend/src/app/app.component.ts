import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { TeamDto } from './api.service';
import { Observable, timer } from 'rxjs';
import { switchMap, shareReplay, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' 
})
export class AppComponent {
  posting = signal(false);
  postMessage = signal<string | null>(null);
  api = inject(ApiService);

  /** Poll the server for the DTO every 5s */
  team$: Observable<TeamDto> = timer(0, 5000).pipe(
    switchMap(() => this.api.getTeam()),
    catchError(err => {
      console.error(err)
      throw err;
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  vote(): void {
    this.posting.set(true);
    this.postMessage.set(null);

    this.api.postPing().subscribe({
      next: () => this.postMessage.set('POST sent successfully.'),
      error: () => console.error('POST failed.'),
      complete: () => this.posting.set(false)
    });
  }
}
