// profil.ts
import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommandesService } from '../../services/commandes';
import { User, Commande } from '../../models';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil.html',
  styleUrls: ['./profil.css']
})
export class Profil implements OnInit {
  user: User | null = null;
  private isBrowser: boolean;

  constructor(
    private auth: AuthService,
    private cmdService: CommandesService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.user = this.auth.getUserConnecte();
    }
  }

  getInitials(): string {
    if (!this.user?.nom) return '?';
    return this.user.nom
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  getJoinDate(): string {
    // Simple implementation - you can enhance this
    return 'aujourd\'hui';
  }

  getTotalCommandes(): number {
    if (!this.user?.email || !this.isBrowser) return 0;
    return this.cmdService.getCommandesUser(this.user.email).length;
  }

  getCommandesEnCours(): number {
    if (!this.user?.email || !this.isBrowser) return 0;
    return this.cmdService.getCommandesUser(this.user.email)
      .filter(c => c.etat && (c.etat.includes('En cours') || c.etat.includes('En route')))
      .length;
  }

  getCommandesLivrees(): number {
    if (!this.user?.email || !this.isBrowser) return 0;
    return this.cmdService.getCommandesUser(this.user.email)
      .filter(c => c.etat && c.etat.includes('Livré'))
      .length;
  }

  modifierProfil() {
    // Implement profile editing
    alert('Fonctionnalité de modification du profil à venir!');
  }

  changerMotDePasse() {
    // Implement password change
    alert('Fonctionnalité de changement de mot de passe à venir!');
  }

  deconnecter() {
    this.auth.deconnecter();
    this.router.navigate(['/connexion']);
  }
}