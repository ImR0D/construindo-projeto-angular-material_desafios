import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export type TipoPassagem = 'goAndBack' | 'goOnly';

export interface KeyValueOptions {
  label: string;
  value: TipoPassagem;
}

@Component({
  selector: 'app-formulario-passagens',
  imports: [
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './formulario-passagens.component.html',
  styleUrl: './formulario-passagens.component.scss',
})
export class FormularioPassagensComponent {
  private formBuilder = inject(FormBuilder);

  tiposPassagens: KeyValueOptions[] = [
    { label: 'Ida e Volta', value: 'goAndBack' },
    { label: 'Somente Ida', value: 'goOnly' },
  ];

  formPassagens = this.formBuilder.group({
    tipoPassagem: ['' as TipoPassagem],
    origem: [''],
    destino: [''],
  });

  buscar() {
    console.log('Nenhuma ação realizada no momento, função não implementada');
    console.log('Valor obtido do Formulário: ', this.formPassagens.value);
  }
}
