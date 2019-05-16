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
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]+$')
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z]+$')
      ])),
      cpf: new FormControl('',Validators.compose([
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(14),
        Validators.pattern('^([0-9]{3})+.([0-9]{3})+.([0-9]{3})+-([0-9]{2})+$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')
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
    'cpf': [
      { type: 'required', message: 'Por favor, coloque seu CPF.' },
      { type: 'pattern', message: 'Deve ser 123.456.789-10' }
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
