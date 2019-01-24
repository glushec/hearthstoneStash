import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { User } from '../shared/user';
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastService } from '../shared/service/toast.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {} as User;
  ruser = {} as User;
  str: string;
  name: string;

  constructor(
    private storage: Storage,
    private toast: ToastService,
    private fireAuth: AngularFireAuth,
    private navCtrl: NavController,
  ) { }

  onBackKeyDown(event) {
    event.preventDefault();
  }

  ngOnInit() {
    document.addEventListener('backbutton', this.onBackKeyDown, false);
  }

  stringer(string: string) {
    string = string.replace("{\"code\":\"auth/weak-password\",\"message\":\"", "");
    string = string.replace("{\"code\":\"auth/email-already-in-use\",\"message\":\"", "");
    string = string.replace("{\"code\":\"auth/too-many-requests\",\"message\":\"", "");
    string = string.replace("Please include reCaptcha verification or try again later", "Please check your password.");
    string = string.replace("{\"code\":\"auth/user-not-found\",\"message\":\"", "");
    string = string.replace("{\"code\":\"auth/invalid-email\",\"message\":\"", "");
    string = string.replace("{\"code\":\"auth/wrong-password\",\"message\":\"", "");
    string = string.replace("{\"code\":\"auth/argument-error\",\"message\":\"signInWithEmailAndPassword failed: ", "")
    string = string.replace("{\"code\":\"auth/argument-error\",\"message\":\"createUserWithEmailAndPassword failed: ", "")
    string = string.replace("\"}", "");
    string = string.replace("\\\"", "");
    string = string.replace("\\\"", "");

    return string;
  }

  async login(user: User) {
    try {
      const result = await this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.goRoot('/tabs/(card:card)');
        this.storage.set('hss.data', 'il');
      }
    } catch (error) {
      this.str = JSON.stringify(error);
      this.str = this.stringer(this.str);
      this.toast.presentErrorToast(this.str);
    }
  }

  async register(user: User) {
    try {
      const result = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.goRoot('/tabs/(card:card)');
        this.storage.set('hss.data', 'ir');
      }
    } catch (err) {

      this.str = JSON.stringify(err);
      this.str = this.stringer(this.str);
      this.toast.presentErrorToast(this.str);
    }
  }

  saveName(name: string) {
    this.storage.set('hss.name', name);
  }

  registerAndName(user: User, name: string) {
    this.saveName(name);
    this.register(user);
  }

}
