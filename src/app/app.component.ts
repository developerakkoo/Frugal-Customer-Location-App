import { MenuController } from '@ionic/angular';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Auto', url: '/folder/Auto', icon: 'car' },
    { title: 'E-Auto', url: '/eauto', icon: 'paper-plane' },
    { title: 'Ambulance', url: '/ambulance', icon: 'heart' },
    { title: 'Crane', url: '/crane', icon: 'heart' },
    { title: 'Bulldozer', url: 'bulldozer', icon: 'heart' },
    { title: 'SchoolVan', url: '/schoolvan', icon: 'heart' },
    // { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  constructor(private menuCtrl: MenuController) {
    this.menuCtrl.enable(false,'main-content');
    this.menuCtrl.swipeGesture(false);
  }
}
