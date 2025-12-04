export interface User {
  nom: string;
  email: string;
  mdp: string;
  tel: string;
}

export interface Commande {
  userEmail: string;
  produit: string;
  adresse: string;
  prix: number;
  etat: string; // "En préparation", "En route", "Livré"
}
