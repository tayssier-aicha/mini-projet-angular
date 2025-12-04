import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandesService } from '../../services/commandes';
import { AuthService } from '../../services/auth';
import { Commande } from '../../models';

@Component({
  selector: 'app-suivi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suivi.html',
  styleUrls: ['./suivi.css']
})
export class Suivi implements OnInit {
  commandes: Commande[] = [];
  lastUpdate: Date = new Date();

  constructor(private cmdService: CommandesService, private auth: AuthService) {}

  ngOnInit() {
    this.loadCommandes();
    
    setInterval(() => {
      this.cmdService.miseAJourEtat();
      this.loadCommandes();
      this.lastUpdate = new Date();
    }, 10000);
  }

  loadCommandes() {
    const user = this.auth.getUserConnecte();
    if(user) {
      this.commandes = this.cmdService.getCommandesUser(user.email);
    }
  }

  getTotalCommandes(): number {
    return this.commandes.length;
  }

  getCommandesEnCours(): number {
    return this.commandes.filter(c => 
      c.etat?.toLowerCase().includes('cours') || 
      c.etat?.toLowerCase().includes('préparation') ||
      c.etat?.toLowerCase().includes('livraison')
    ).length;
  }

  getCommandesLivrees(): number {
    return this.commandes.filter(c => 
      c.etat?.toLowerCase().includes('livrée') || 
      c.etat?.toLowerCase().includes('livree')
    ).length;
  }

  getEtatClass(etat: string | undefined): string {
    if (!etat) return 'en-attente';
    
    const etatLower = etat.toLowerCase();
    if (etatLower.includes('attente')) return 'en-attente';
    if (etatLower.includes('préparation') || etatLower.includes('cours')) return 'en-cours';
    if (etatLower.includes('livraison')) return 'en-cours';
    if (etatLower.includes('livrée') || etatLower.includes('livree')) return 'livree';
    if (etatLower.includes('annulée') || etatLower.includes('annulee')) return 'annulee';
    return 'en-attente';
  }

  getProgress(etat: string | undefined): number {
    if (!etat) return 0;
    
    const etatLower = etat.toLowerCase();
    if (etatLower.includes('attente')) return 25;
    if (etatLower.includes('préparation') || etatLower.includes('cours')) return 50;
    if (etatLower.includes('livraison')) return 75;
    if (etatLower.includes('livrée') || etatLower.includes('livree')) return 100;
    if (etatLower.includes('annulée') || etatLower.includes('annulee')) return 0;
    return 0;
  }
}