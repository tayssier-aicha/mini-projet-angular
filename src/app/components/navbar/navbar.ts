// Update your navbar component to handle SSR
import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header>
      <h1>Livraison Rapide</h1>
      <nav>
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Accueil</a>
        
        <!-- Show these only when NOT logged in -->
        <ng-container *ngIf="!isLoggedIn()">
          <a routerLink="/connexion" routerLinkActive="active">Connexion</a>
          <a routerLink="/inscription" routerLinkActive="active">Inscription</a>
        </ng-container>
        
        <!-- Show these only when logged in -->
        <ng-container *ngIf="isLoggedIn()">
          <a routerLink="/commandes" routerLinkActive="active">Commandes</a>
          <a routerLink="/suivi" routerLinkActive="active">Suivi</a>
          <a routerLink="/profil" routerLinkActive="active">Profil</a>
          <button (click)="logout()" class="logout-btn">Déconnexion</button>
        </ng-container>
      </nav>
    </header>
  `,
  styles: [`
    header {
      background: linear-gradient(to right, #2c3e50, #4a6491);
      color: white;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    h1 {
      margin: 0;
      font-size: 1.8rem;
    }
    
    nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    
    nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    nav a:hover, nav a.active {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .logout-btn {
      padding: 0.5rem 1.5rem;
      background: #e74c3c;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    
    .logout-btn:hover {
      background: #c0392b;
      transform: translateY(-2px);
      box-shadow: 0 3px 10px rgba(231, 76, 60, 0.3);
    }
  `]
})
export class NavbarComponent {
  private isBrowser: boolean;

  constructor(
    private auth: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  
  isLoggedIn(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return !!this.auth.getUserConnecte();
  }
  
  logout(): void {
    if (this.isBrowser) {
      this.auth.deconnecter();
      window.location.href = '/connexion';
    }
  }
}