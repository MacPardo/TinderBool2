import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from 'node_modules/@angular/forms';

import {Router} from 'node_modules/@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-cad-equipe',
  templateUrl: './cad-equipe.page.html',
  styleUrls: ['./cad-equipe.page.scss'],
})
export class CadEquipePage implements OnInit {

  validateTeam: FormGroup;
  constructor(public formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    const extraLetters = 'àãâéêíîóõôúûç';

    this.validateTeam = new FormGroup({
      nameTeam: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(new RegExp(`^([a-z${extraLetters}]+)+$`, 'i'))
      ])),
      sports: new FormControl('', Validators.required),
      access: new FormControl('', Validators.required),
      desc: new FormControl('', Validators.minLength(3)),
      terms: new FormControl(true, Validators.pattern('true'))
    });
  }

  validation_messages = {
        'nameTeam': [
            { type: 'required', message: 'Por favor, coloque o nome da equipe.'},
            { type: 'pattern', message: 'Deve possuir apenas letras.' }
        ]
  };

  onSubmit(values){
        console.log(values);
        this.router.navigate(["/user"]);
  }
}
