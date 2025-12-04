// app/services/commandes.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Commande } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getCommandes(): Commande[] {
    if (!this.isBrowser || typeof localStorage === 'undefined') {
      return [];
    }
    
    const data = localStorage.getItem('commandes');
    return data ? JSON.parse(data) : [];
  }

  commander(cmd: Commande) {
    if (!this.isBrowser || typeof localStorage === 'undefined') {
      return;
    }
    
    const commandes = this.getCommandes();
    commandes.push(cmd);
    localStorage.setItem('commandes', JSON.stringify(commandes));
  }

  getCommandesUser(email: string): Commande[] {
    if (!this.isBrowser) {
      return [];
    }
    
    return this.getCommandes().filter(c => c.userEmail === email);
  }

  miseAJourEtat() {
    if (!this.isBrowser || typeof localStorage === 'undefined') {
      return;
    }
    
    const commandes = this.getCommandes();
    commandes.forEach(c => {
      if(c.etat === 'En préparation') c.etat = 'En route';
      else if(c.etat === 'En route') c.etat = 'Livré';
    });
    localStorage.setItem('commandes', JSON.stringify(commandes));
  }
}