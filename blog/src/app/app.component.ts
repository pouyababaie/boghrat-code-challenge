import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  viewChildren,
} from '@angular/core';
import { map, Observable, tap } from 'rxjs';

interface IPost {
  id: number;
  title: string;
  abstract: string;
  img: string;
  date: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'blog';

  posts$!: Observable<Array<IPost>>;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.posts$ = this.http
      .get<Array<IPost>>('https://cdn.boghrat.com/api/codeChallenge/angular')
      .pipe(
        map((posts) => {
          return posts.map((p) => {
            return {
              ...p,
              date: (p.date = new Date(p.date).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })),
              abstract: p.abstract + '...',
            };
          });
        })
      );
  }
}
