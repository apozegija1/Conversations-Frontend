import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private links = new Array<{ text: string, path: string }>();

  constructor() {
    this.addItem({ text: 'Login', path: 'login' });
  }

  getLinks() {
    return this.links;
  }

  updateLoginStatus(status: boolean) {
    if (!status) {
      this.clearAllItems();
      this.addItem({ text: 'Login', path: 'login' });
    }
  }

  updateNavAfterAuth(role: string): void {
    this.removeItem({ text: 'Login' });

    if (role === 'user') {
      this.addItem({ text: 'User Board', path: 'user' });
    } else if (role === 'admin') {
      this.addItem({ text: 'Admin Board', path: 'admin' });
    }
  }

  addItem({ text, path }) {
    this.links.push({ text, path });
  }

  removeItem({ text }) {
    this.links.forEach((link, index) => {
      if (link.text === text) {
        this.links.splice(index, 1);
      }
    });
  }

  clearAllItems() {
    this.links.length = 0;
  }
}
