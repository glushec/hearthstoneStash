import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, PopoverController } from "@ionic/angular";
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public alertCtrl: AlertController,
    private popCtrl: PopoverController,
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth,
    private storage: Storage,
  ) { }

  name: string;
  email: string;

  createName() {
    this.storage.get('hss.name').then(res => {
      if (res) {
        this.name = res;
      }
      else {
        this.name = "User";
      }
    })
  }

  createMail() {
    this.fireAuth.authState.subscribe(data => {
      this.email = data.email;
    })
  }

  ngOnInit() {
    this.createMail();
    this.createName();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Confirmation',
      message: 'Are you sure you want to logout?<br> <strong>All of the stored data will be lost.</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
          }
        }, {
          text: 'Log out',
          handler: () => {
            this.storage.set('hss.data', 'i');
            this.storage.set('hss.name', '');
            this.navCtrl.goRoot('/login');
            this.popCtrl.dismiss();
            this.storage.set('favoriteCards', '');
          }
        }
      ]
    });
    await alert.present();
  }

  logout() {
    this.presentAlertConfirm();
  }

}
