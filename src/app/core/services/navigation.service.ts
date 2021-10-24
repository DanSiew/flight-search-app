import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class NavigationService {
  constructor(private router: Router) { }

  public navigateTo(path: string, queryParams: any): void {
    if (queryParams !== null) {
      this.router.navigate(['/' + path],
        { queryParams });
    } else {
      this.router.navigate(['/' + path]);
    }

  }

}
