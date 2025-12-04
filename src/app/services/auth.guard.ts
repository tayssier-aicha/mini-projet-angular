// services/auth.guard.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Always allow on server side (will be re-evaluated on client)
    if (!this.isBrowser) {
      return true;
    }

    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      return true;
    }

    // Store the attempted URL for redirecting after login
    this.router.navigate(['/connexion'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  canActivate(): boolean {
    // Always allow on server side
    if (!this.isBrowser) {
      return true;
    }

    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
