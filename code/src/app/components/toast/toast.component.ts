import {Component, Input, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {

  @Input('type') type: string;

  constructor(public toastController: ToastController) { }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: this.type === 'error' ? 'danger' : 'dark',
    });
    toast.present();
  }

  ngOnInit() {}

}
