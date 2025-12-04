// services/auth.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;
  private currentUser: User | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    // Initialize user from localStorage once
    if (this.isBrowser) {
      this.loadUserFromStorage();
    }
  }

  private loadUserFromStorage(): void {
    if (!this.isBrowser || typeof localStorage === 'undefined') return;

    try {
      const userJson = localStorage.getItem('userConnecte');
      this.currentUser = userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error loading user from storage:', error);
      this.currentUser = null;
    }
  }

  inscrire(user: User): boolean {
    if (!this.isBrowser || typeof localStorage === 'undefined') return false;

    try {
      // Check if user already exists
      const existingUser = localStorage.getItem(user.email);
      if (existingUser) return false;

      localStorage.setItem(user.email, JSON.stringify(user));
      localStorage.setItem('userConnecte', JSON.stringify(user));
      this.currentUser = user;
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  }

  connecter(email: string, mdp: string): User | null {
    if (!this.isBrowser || typeof localStorage === 'undefined') return null;

    try {
      const userJson = localStorage.getItem(email);
      if (!userJson) return null;

      const user = JSON.parse(userJson);
      if (user && user.mdp === mdp) {
        localStorage.setItem('userConnecte', JSON.stringify(user));
        this.currentUser = user;
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  }

  setUserConnecte(user: User): void {
    if (!this.isBrowser || typeof localStorage === 'undefined') return;

    try {
      localStorage.setItem('userConnecte', JSON.stringify(user));
      this.currentUser = user;
    } catch (error) {
      console.error('Error setting user:', error);
    }
  }

  getUserConnecte(): User | null {
    // Use cached user instead of reading from localStorage every time
    return this.currentUser;
  }

  deconnecter(): void {
    if (!this.isBrowser || typeof localStorage === 'undefined') return;

    try {
      localStorage.removeItem('userConnecte');
      this.currentUser = null;
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getUserConnecte();
  }
}
