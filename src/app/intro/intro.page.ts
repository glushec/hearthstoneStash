import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  private slides;
  constructor(
    private navCtrl: NavController,
    private storage: Storage,
  ) { }
  
  ngOnInit() {
    this.slides = document.querySelector('ion-slides');
  }

  letsGo() {
    this.navCtrl.goRoot('/login');
  }

  goNext() {
    this.slides.slideNext();
  }

  setOpenedIntro() {
    this.storage.set('hss.data', 'i').then(
      () => console.log('Slides opened.'),
      error => console.error('Error! Slides not opened.', error)
    );
  }

  goAndStore() {
    this.letsGo();
    this.setOpenedIntro();
  }

}
