import { Component } from '@angular/core';
import { AppShellComponent } from './shared/layout/app-shell/app-shell.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  obs = new Observable();

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.demoGetMethod('huzaifaurl', { name: "huzaifa" }).subscribe(data => {

    })
    this.demoGetMethod(
      'huzaifaurl',
      { name: "huzaifa" }
    )
      .subscribe(
        {
          next: (data) => { },
          error: (err) => { },
          complete: () => { }
        }
      );


  }

  demoGetMethod(url: string, data: any): Observable<any> {
    const obs = new Observable(observer => {
      this.http.get(url).subscribe((data) => {
        observer.next(data);
        observer.complete();
      });
    });
    return obs
  }
}
