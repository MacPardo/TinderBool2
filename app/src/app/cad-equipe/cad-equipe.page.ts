import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from 'node_modules/@angular/forms';

import {Router} from 'node_modules/@angular/router';
import { from } from 'rxjs';

import { AlertController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-cad-equipe',
  templateUrl: './cad-equipe.page.html',
  styleUrls: ['./cad-equipe.page.scss'],
})
export class CadEquipePage implements OnInit {

  validateTeam: FormGroup;
  sports: any;

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              public api: RestApiService,
              public alertController : AlertController) { }

  async alert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Continuar']
    });
    await alert.present();
  }

  ngOnInit() {
    const extraLetters = 'àãâéêíîóõôúûç';

    this.validateTeam = new FormGroup({
      nameTeam: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(new RegExp(`^([a-z${extraLetters}])+$`, 'i'))
      ])),
      sports: new FormControl('', Validators.required),
      access: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.minLength(3)),
      terms: new FormControl(true, Validators.pattern('true'))
    });

    this.loadSports();
  }

  validation_messages = {
        'nameTeam': [
            { type: 'required', message: 'Por favor, coloque o nome da equipe.'},
            { type: 'pattern', message: 'Deve possuir apenas letras.' }
        ]
  };

  async onSubmit(values){
    /*await this.api.post(
                  values.teamName,
                  values.desc,
                  values.email,
                  values.access,
                  values.sports)
      .subscribe(res => {
        console.log(res.status)
        if(res == 0){
          this.alert('Algo de errado ocorreu', 'Tente novamente em alguns minutos.');
        }
        else{
          this.router.navigate(["/user"]);
        }
      });*/
  }

  async loadSports(){
    await this.api.getSports()
      .subscribe(res => {
        if(res == 0){
          this.alert('Algo de errado ocorreu', 'Tente novamente em alguns minutos.');
          this.router.navigate(["/tabs/tab1"]);
        }
        else{
          this.sports = res;
        }
      });
  }
}
