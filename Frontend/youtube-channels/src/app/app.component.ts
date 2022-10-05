import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'youtube-channels';

  ngOnInit(): void {
    const checkbox: any = document.getElementById('checkbox');

    checkbox.addEventListener('change', () => {
      document.body.classList.toggle('dark');
    })
  }
}
