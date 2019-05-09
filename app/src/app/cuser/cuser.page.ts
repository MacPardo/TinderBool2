import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormControl, FormGroup} from 'node_modules/@angular/forms';
import { UsernameValidator } from 'validators/username.validator';

import {PasswordValidator} from 'validators/password.validator';

import {Router} from 'node_modules/@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-cuser',
  templateUrl: './cuser.page.html',
  styleUrls: ['./cuser.page.scss'],
})
export class CuserPage implements OnInit {


  validateUser: FormGroup;
  matching_passwords_group: FormGroup;

  constructor(public formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.matching_passwords_group = new FormGroup(
      {
        password: new FormControl("", Validators.compose([
            Validators.minLength(5),

            Validators.required,
            Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$")
        ])
        ),
        confirm_password: new FormControl("", Validators.required)
      },
      (formGroup: FormGroup) => {
        return PasswordValidator.areEqual(formGroup);
      }
    );
    this.validateUser = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      matching_passwords: this.matching_passwords_group,
      terms: new FormControl(true, Validators.pattern('true'))
		});
  }

  validation_messages = {
		'name': [
      { type: 'required', message: 'Por favor, coloque seu nome.' }
    ],
    'lastname': [
      { type: 'required', message: 'Por favor, coloque seu sobrenome.' }
    ],
    'email': [
      { type: 'required', message: 'Por favor, coloque seu email.' },
      { type: 'pattern', message: 'Deve ser um e-mail válido.' }
    ],
    'password': [
    	{ type: 'required', message: 'A senha é necessária.' },
    	{ type: 'minlength', message: 'Senha deve ter no mínimo 5 caracteres.' },
    	{ type: 'pattern', message: 'Sua senha deve ter ao menos um caractere maiúsculo, um minúculo e um número.' }
    ],
    'confirm_password': [
    	{ type: 'required', message: 'Por favor, confirme sua senha.' }
    ],
    'matching_passwords': [
    	{ type: 'areEqual', message: 'Senhas distintas' }
  ]};

  onSubmit(values){
    console.log(values);
    this.router.navigate(["/user"]);
    }

}
