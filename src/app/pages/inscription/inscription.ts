import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { User } from '../../models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.css'],
})
export class Inscription {
  nom = '';
  email = '';
  mdp = '';
  tel = '';
  message = '';

  constructor(private auth: AuthService, private router: Router) {}

  sInscrire() {
    const user: User = { nom: this.nom, email: this.email, mdp: this.mdp, tel: this.tel };
    this.auth.inscrire(user);
    this.message = 'Inscription réussie!';
    setTimeout(() => this.router.navigate(['/connexion']), 1500);
  }
}
