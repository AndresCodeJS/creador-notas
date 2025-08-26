import { CommonModule } from '@angular/common';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlusIconComponent } from './ui/icons/plus-icon/plus-icon.component';
import { SubtractIconComponent } from './ui/icons/subtract-icon/subtract-icon.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'creador-notas';
  generalText =
    'Para poderte ayudar con tu declaración voy a necesitar la siguiente información: ' +
    '\n';
  firstTimeText = '';
  join = false;
  medical = '';
  dependents = '';

  fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    firstTime: this.fb.control(''),
    message: this.fb.control(''),
    join: this.fb.control(''),
    w2: this.fb.control(''),
    f1099: this.fb.control(''),
    spouseOption: ['Esposo'],
    companyOption: ['SI'],
    spouseW2: this.fb.control(''),
    spouseF1099: this.fb.control(''),
    f1095A: this.fb.control(''),
    dependents: this.fb.control(''),
    information: this.fb.control(''),
    steps: this.fb.control(''),
    expenses: this.fb.control(''),
    hasCompany: this.fb.control(''),
  });

  // Opciones para el radio button declaracion conjunto
  options = [
    { value: 'Esposo', label: 'Esposo' },
    { value: 'Esposa', label: 'Esposa' },
  ];

  // Opciones para el radio button cantidad socios
  optionsCompany = [
    { value: 'SI', label: 'Si' },
    { value: 'NO', label: 'No' },
  ];

  get spouseOption() {
    return this.form.get('spouseOption') as FormControl;
  }

  get f1095A() {
    return this.form.get('f1095A') as FormControl;
  }

  get hasCompany() {
    return this.form.get('hasCompany') as FormControl;
  }

  get companyOption() {
    return this.form.get('companyOption') as FormControl;
  }

  onClick() {
    setTimeout(() => {
      console.log('resultado', this.form.getRawValue());
      this.generalText =
        'Para poderte ayudar con tu declaración voy a necesitar la siguiente información:\n';

      //DECLARACION ANTERIOR
      if (this.form.getRawValue().firstTime) {
        this.firstTimeText = '\n - Copia de tu declaración anterior';
      } else {
        this.firstTimeText = '';
      }
      this.generalText = this.generalText + this.firstTimeText;

      //FORMAS DE INGRESO CONTACTO
      if (this.form.getRawValue().w2) {
        this.generalText =
          this.generalText +
          `\n - Tus formas de ingreso por W2 ${
            this.form.getRawValue().f1099 ? 'y 1099' : ''
          }`;
      } else if (this.form.getRawValue().f1099) {
        this.generalText =
          this.generalText + `\n - Tus formas de ingreso por 1099`;
      }

      //DELCARACION CONJUNTA
      if (this.form.getRawValue().join) {
        this.join = true;
        //FORMAS DE INGRESO CONYUGUE
        if (this.form.getRawValue().spouseW2) {
          this.generalText =
            this.generalText +
            `\n - Las formas de ingreso por W2 ${
              this.form.getRawValue().spouseF1099 ? 'y 1099' : ''
            } de tu ${this.spouseOption.value}`;
        } else if (this.form.getRawValue().spouseF1099) {
          this.generalText =
            this.generalText +
            `\n - Las formas de ingreso por 1099 de tu ${this.spouseOption.value}`;
        }
      } else {
        this.join = false;
      }

      //SEGURO MEDICO
      if (this.form.getRawValue().f1095A) {
        this.medical =
          '\n' +
          ' - La forma 1095A del seguro médico, puedes solicitarla a tu corredor de seguros';

        if (this.form.getRawValue().steps) {
          this.medical =
            this.medical +
            '\n      • O intentar descargarla en https://www.healthcare.gov/login' +
            '\n              1- Log into your Marketplace account.' +
            '\n              2- Under "Your applications," select your 2024 application — not your 2025 application.' +
            '\n              3- Select “Tax Forms."' +
            '\n              4- Download all 1095-As.';
        }

        this.generalText = this.generalText + this.medical;
      } else {
        this.medical = '';
      }

      //DEPENDIENTES
      if (this.form.getRawValue().dependents) {
        var dependents =
          '\n' +
          ' - De tu dependiente voy a necesitar, nombre completo, número de social security y fecha de nacimiento';
        /*    '\n           • Nombre Completo'+
        '\n           • Número de social security'+
        '\n           • Fecha de nacimiento' */

        this.generalText = this.generalText + dependents;
      }

      //DATOS PERSONALES
      if (this.form.getRawValue().information) {
        var personal =
          '\n' +
          `\n Datos personales${
            this.form.getRawValue().join
              ? ' tanto tuyos como de tu ' + this.spouseOption.value
              : ''
          }:` +
          ' nombre completo, número de social, dirección de residencia, fecha de nacimiento, ocupacion y correo electrónico' +
          /* '\n           •    Nombre Completo'+
        '\n           •	Número de social security'+
        '\n           •	Dirección de residencia'+
        '\n           •	Fecha de nacimiento '+
        '\n           •	Ocupación'+
        '\n           •	Correo electrónico'+ */
          '\n' +
          '\n Información de tu cuenta para devolución o pago de impuestos: ' +
          'número de cuenta, número de ruta, tipo de cuenta, nombre del banco';
        /*    '\n           •    Numero de cuenta'+
        '\n           •	Número de ruta'+
        '\n           •	Tipo de cuenta'+
        '\n           •	nombre del banco ' */

        this.generalText = this.generalText + personal;
      }

      //SUM GASTOS
      if (this.form.getRawValue().expenses) {
        var expenses =
          '\n' +
          '\nTe recomiendo que realices una sumatoria de todos los gastos relacionados al trabajo por 1099 que tuviste, por ejemplo, comidas, gas, telefonía, gastos relacionados al automóvil que utilizaste para trabajar o trasladarte al trabajo, gastos médicos, y utilities. Por medio de este sumario se pueden obtener deducciones en los impuestos' +
          '\n \n Puedes ir a tus estados de cuenta e ir sumándolos y me das un numero';

        this.generalText = this.generalText + expenses;
      }

      //ES UNICO SOCIO?
      if (this.companyOption.value == 'NO') {
        this.generalText =
          this.generalText +
          '\nInformación de la empresa: nombre de la empresa, EIN, y dirección actual' +
          '\n\nInformación de cada socio: nombre completo, número de social, dirección, y porcentaje de participación..';
      }

      this.form.patchValue({
        message: this.generalText,
      });
    }, 100);
  }

  onSubmit() {}
}
