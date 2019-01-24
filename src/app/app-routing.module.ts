import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private navCtrl: NavController, private platform: Platform, private storage: Storage) {
    this.platform.ready().then(() => {
        this.storage.get('hss.data').then((data) => {

            if(data == 'i'){
                this.navCtrl.goRoot('/login');
            }
            else if(data == 'il' || data == 'ir'){
                this.navCtrl.goRoot('/tabs/(card:card)');
            }
            else{
                this.navCtrl.goRoot('/intro');
            }
        })
    })

}

}