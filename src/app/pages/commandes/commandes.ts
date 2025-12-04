import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommandesService } from '../../services/commandes';
import { AuthService } from '../../services/auth';
import { Commande } from '../../models';

@Component({
  selector: 'app-commandes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './commandes.html',
  styleUrls: ['./commandes.css']
})
export class Commandes implements OnInit {
  commandes: Commande[] = [];
  produit = '';
  adresse = '';
  prix: number | null = null;

  constructor(private cmdService: CommandesService, private auth: AuthService) {}

  ngOnInit() {
    const user = this.auth.getUserConnecte();
    if(user) this.commandes = this.cmdService.getCommandesUser(user.email);
  }

  commander() {
    const user = this.auth.getUserConnecte();
    if(user && this.produit && this.adresse && this.prix) {
      this.cmdService.commander({
        produit: this.produit,
        adresse: this.adresse,
        prix: this.prix,
        etat: 'En préparation',
        userEmail: user.email
      });
      this.commandes = this.cmdService.getCommandesUser(user.email);
      this.produit = '';
      this.adresse = '';
      this.prix = null;
    }
  }
}
