import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css'],
})
export class Connexion {
  email: string = '';
  mdp: string = '';
  erreur: string = '';
  returnUrl: string = '/';

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  seConnecter() {
    const user = this.auth.connecter(this.email, this.mdp);
    if (user) {
      this.auth.setUserConnecte(user);
      // Redirect to return URL or home
      this.router.navigateByUrl(this.returnUrl);
    } else {
      this.erreur = 'Email ou mot de passe incorrect';
    }
  }
}
