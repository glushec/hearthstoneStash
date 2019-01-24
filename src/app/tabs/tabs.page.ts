import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController, PopoverController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Storage } from '@ionic/storage';
import { ProfileComponent } from '../shared/component/profile/profile.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  constructor(
    private popoverCtrl: PopoverController,
    private storage: Storage,
    private loader: LoadingController,
    private navCtrl: NavController,
    private fireAuth: AngularFireAuth,
    private toast: ToastController
  ) { }

  name: string;

  createName() {
    this.storage.get('hss.name').then(res => {
      if (res) {
        this.name = res;
        this.name = "Hey " + this.name + ", your registration was succesful.";
      }
      else {
        this.name = "Your registration was succesful.";
      }
    })
  }

  async presentLoading() {
    const loading = await this.loader.create({
      content: 'Loading',
      duration: 500
    });
    return await loading.present();
  }


  async registerToast() {
    const toast = await this.toast.create({
      message: this.name,
      duration: 2000
    });
    toast.present();
  }

  onBackKeyDown(event) {
    event.preventDefault();
  }

  ngOnInit() {

    this.createName();

    document.addEventListener('backbutton', this.onBackKeyDown, false);

    this.storage.get('hss.data').then((bool) => {
     if (bool == 'ir'){
        this.fireAuth.authState.subscribe(data => {
          if (data && data.email && data.uid) {
            this.registerToast();
          }
        });
      }
    })
    this.presentLoading();
    this.storage.set('hss.data','il');
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: ProfileComponent,
      event: ev,
      translucent: false
    });
    return await popover.present();
  }
}


