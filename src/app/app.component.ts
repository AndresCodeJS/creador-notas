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
  firstTimeCompanyText = '';
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
    expensesSpouse: this.fb.control(''),
    hasCompany: this.fb.control(''),
    accounting: this.fb.control(''),
    renewal: this.fb.control(''),
    companyAccounting: ['NO'],
    firstTimeCompany: this.fb.control(''),
    buyAndSell: this.fb.control(''),
    cripto: this.fb.control(''),
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

  // Opciones para el radio button de contabilidad
  optionsAccounting = [
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

  get accounting() {
    return this.form.get('accounting') as FormControl;
  }

  get renewal() {
    return this.form.get('renewal') as FormControl;
  }

  get companyOption() {
    return this.form.get('companyOption') as FormControl;
  }

  get companyAccounting() {
    return this.form.get('companyAccounting') as FormControl;
  }

  get f1099() {
    return this.form.get('f1099') as FormControl;
  }

  get spouseF1099() {
    return this.form.get('spouseF1099') as FormControl;
  }

  onClick() {
    setTimeout(() => {
      console.log('resultado', this.form.getRawValue());

      if (this.form.getRawValue().accounting || this.form.getRawValue().renewal) {

        this.generalText = ''

        if(this.form.getRawValue().accounting){
           this.generalText = this.generalText +
          '\n' +
          'Para darte un precio por el servicio de contabilidad, por favor comparteme:\n' +
          '\n - Los Estados de cuenta de las cuentas bancarias y tarjetas de crédito asociadas a la empresa de los últimos 3 meses\n';


        }

        if(this.form.getRawValue().renewal){
          this.generalText = this.generalText +
          '\n' +
          'Para poder ayudarte con el servicio de renovación de empresa, por favor comparteme:\n' +
          '\n - Nombre de la empresa' +
          '\n - Estado en el que fue creada la empresa' +
          '\n - Dirección actual de la empresa' +
          '\n - Confirme si habrá cambios en la estructura de la empresa';

        }
       } else {
        this.generalText =
          'Para poderte ayudar con tu declaración voy a necesitar la siguiente información:\n';

        //DECLARACION ANTERIOR
        if (this.form.getRawValue().firstTime) {
          this.firstTimeText =
            '\n- Copia de tu declaración anterior' +
            `\n- Datos personales${
              this.form.getRawValue().join
                ? ' tanto tuyos como de tu ' + this.spouseOption.value
                : ''
            }:` +
            ' dirección de residencia, fecha de nacimiento y correo electrónico' +
            '\n- Información de tu cuenta para devolución o pago de impuestos: ' +
            'número de cuenta, número de ruta, tipo de cuenta, nombre del banco';
        } else {
          this.firstTimeText =
            `\n- Datos personales${
              this.form.getRawValue().join
                ? ' tanto tuyos como de tu ' + this.spouseOption.value
                : ''
            }:` +
            ' nombre completo, número de social, dirección de residencia, fecha de nacimiento, ocupacion y correo electrónico' +
            /* '\n' + */
            '\n- Información de tu cuenta para devolución o pago de impuestos: ' +
            'número de cuenta, número de ruta, tipo de cuenta, nombre del banco';
        }
        this.generalText = this.generalText + this.firstTimeText;

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

        //FORMAS DE INGRESO CONTACTO
        if (this.form.getRawValue().w2) {
          this.generalText =
            this.generalText +
            '\n ' +
            `\n- Tus formas de ingreso por W2 ${
              this.form.getRawValue().f1099 ? 'y 1099' : ''
            }`;
        } else if (this.form.getRawValue().f1099) {
          this.generalText =
            this.generalText + `\n\n- Tus formas de ingreso por 1099`;
        }

        //DELCARACION CONJUNTA
        if (this.form.getRawValue().join) {
          this.join = true;
          //FORMAS DE INGRESO CONYUGUE
          if (this.form.getRawValue().spouseW2) {
            this.generalText =
              this.generalText +
              `\n- Las formas de ingreso por W2 ${
                this.form.getRawValue().spouseF1099 ? 'y 1099' : ''
              } de tu ${this.spouseOption.value}`;
          } else if (this.form.getRawValue().spouseF1099) {
            this.generalText =
              this.generalText +
              `\n- Las formas de ingreso por 1099 de tu ${this.spouseOption.value}`;
          }
        } else {
          this.join = false;
        }

        //COMPRA Y VENTA DE ACCIONES
        if (this.form.getRawValue().buyAndSell) {
          this.generalText =
            this.generalText +
            '\n- Descarga y compartenos el formulario 1099-b por la compra y venta de acciones';
        }

        //SEGURO MEDICO
        if (this.form.getRawValue().f1095A) {
          this.medical =
            '\n' +
            '- La forma 1095A del seguro médico, puedes solicitarla a tu corredor de seguros';

          if (this.form.getRawValue().steps) {
            this.medical =
              this.medical +
              '\n      • O intentar descargarla en https://www.healthcare.gov/login' +
              '\n              1- Ingresa en "Your Marketplace account".' +
              '\n              2- Debajo de "Your applications," selecciona tu "2025 application" — No selecciones "2026 application".' +
              '\n              3- Selecciona “Tax Forms."' +
              '\n              4- Descarga todas las 1095-As.' +
              '\n      • O llamar al al 1-800-318-2596  y pedir que te dicten los numeros por mes';
          }

          this.generalText = this.generalText + this.medical;
        } else {
          this.medical = '';
        }

        //DATOS PERSONALES
        /* if (this.form.getRawValue().information) {
          var personal =
            '\n' +
            `\n Datos personales${
              this.form.getRawValue().join
                ? ' tanto tuyos como de tu ' + this.spouseOption.value
                : ''
            }:` +
            ' nombre completo, número de social, dirección de residencia, fecha de nacimiento, ocupacion y correo electrónico' +
            '\n' +
            '\n Información de tu cuenta para devolución o pago de impuestos: ' +
            'número de cuenta, número de ruta, tipo de cuenta, nombre del banco';


          this.generalText = this.generalText + personal;
        } */

        //SUM GASTOS
        //SI SE MARCA SUM DE GASTOS PARA EL PRINCIPAL PERO NO EL CONYUGUE
        if (
          this.form.getRawValue().expenses &&
          !this.form.getRawValue().expensesSpouse
        ) {
          var expenses =
            '\n' +
            '\nTe recomiendo que realices una lista en donde totalices por categoría, los gastos de todo el año relacionados al trabajo por 1099 que tuviste, por ejemplo, comidas, gas, telefonía, gastos relacionados al automóvil que utilizaste para trabajar o trasladarte al trabajo, gastos médicos, y utilities. Por medio de esta lista de gastos se pueden obtener deducciones en los impuestos' +
            '\n \n Puedes ir a tus estados de cuenta e ir sumándolos y me das un numero';

          this.generalText = this.generalText + expenses;
        }

        //SI SE MARCA SUM DE GASTOS PARA EL CONYUGUE PERO NO EL PRINCIAPAL
        if (
          !this.form.getRawValue().expenses &&
          this.form.getRawValue().expensesSpouse
        ) {
          var expenses =
            '\n' +
            `\nTe recomiendo que tu ${this.spouseOption.value} realice una lista en donde totalice por categoría, los gastos de todo el año relacionados al trabajo por 1099 que tuvo, por ejemplo, comidas, gas, telefonía, gastos relacionados al automóvil que utilizo para trabajar o trasladarse al trabajo, gastos médicos, y utilities. Por medio de esta lista de gastos se pueden obtener deducciones en los impuestos` +
            '\n \n Puede ir a sus estados de cuenta e ir sumándolos y me da un numero';

          this.generalText = this.generalText + expenses;
        }

        //SI SE MARCA SUM DE GASTOS TANTO PARA EL CONYUGUE COMO PARA EL PRINCIAPAL
        if (
          this.form.getRawValue().expenses &&
          this.form.getRawValue().expensesSpouse
        ) {
          var expenses =
            '\n' +
            `\nLes recomiendo tanto a ti como a tu ${this.spouseOption.value} que realicen cada uno por separado, una lista en donde totalicen por categoría, los gastos de todo el año relacionados al trabajo por 1099 que tuvieron, por ejemplo, comidas, gas, telefonía, gastos relacionados al automóvil que utilizó cada uno para trabajar o trasladarte al trabajo, gastos médicos, y utilities. Por medio de esta lista de gastos se pueden obtener deducciones en los impuestos` +
            '\n \n Pueden ir a sus estados de cuenta e ir sumándolos y me dan un numero';

          this.generalText = this.generalText + expenses;
        }

        //SECCION CORPORATIVA

        if (this.form.getRawValue().hasCompany) {
          this.generalText =
            this.generalText +
            '\n' +
            '\n- Información de la empresa: nombre de la empresa, EIN, y dirección actual';

          //DECLARACION ANTERIOR
          if (this.form.getRawValue().firstTimeCompany) {
            this.firstTimeCompanyText =
              '\n- Copia de la declaración anterior de la empresa';
          } else {
            this.firstTimeCompanyText = '';
          }
          this.generalText = this.generalText + this.firstTimeCompanyText;

          //ES UNICO SOCIO?
          if (this.companyOption.value == 'NO') {
            this.generalText =
              this.generalText +
              '\n- Información de cada socio: nombre completo, número de social, dirección, y porcentaje de participación';
          }

          //QUIERE CONTABILIDAD?
          if (this.companyAccounting.value == 'SI') {
            this.generalText =
              this.generalText +
              '\n- Estados de cuenta de las cuentas bancarias y tarjetas de crédito asociadas a la empresa de los últimos 3 meses para darte una cotización';
          } else {
            this.generalText =
              this.generalText +
              '\n- Estados financieros o resumen de Ingresos y gastos de la empresa (De todo el año)';
          }

          //CRIPTO
          /*  if (this.form.getRawValue().cripto) {
          this.generalText =
              this.generalText + '\n- Descarga y compartenos el formulario 1099-b por la compra y venta de acciones'

        } */
        }

        this.generalText =
          this.generalText +
          '\n\n- Compraste o vendiste criptomonedas?' +
          '\n\n- Si recibiste alguna otra forma o existe algún otro ingreso, gasto o dato relevante que pueda afectar su declaración de impuestos y no haya sido informado, por favor comuníquelo por este medio';
      }

      this.form.patchValue({
        message: this.generalText,
      });
    }, 100);
  }

  onSubmit() {}
}
