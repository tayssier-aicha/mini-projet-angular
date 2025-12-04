// app/app.routes.ts - FIX THIS FIRST
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { Accueil } from './pages/accueil/accueil';
import { Connexion } from './pages/connexion/connexion';
import { Inscription } from './pages/inscription/inscription';
import { Commandes } from './pages/commandes/commandes';
import { Suivi } from './pages/suivi/suivi';
import { Profil } from './pages/profil/profil';
import { AuthGuard, NoAuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: Accueil,
    // NO GUARD HERE - Home page is public!
  },
  {
    path: 'connexion',
    component: Connexion,
    canActivate: [NoAuthGuard], // Only accessible when NOT logged in
  },
  {
    path: 'inscription',
    component: Inscription,
    canActivate: [NoAuthGuard], // Only accessible when NOT logged in
  },
  {
    path: 'commandes',
    component: Commandes,
    canActivate: [AuthGuard], // Protected - requires login
  },
  {
    path: 'suivi',
    component: Suivi,
    canActivate: [AuthGuard], // Protected - requires login
  },
  {
    path: 'profil',
    component: Profil,
    canActivate: [AuthGuard], // Protected - requires login
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
