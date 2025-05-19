import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClientAddEditConstructorService } from './add-edit.constructor.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientAddEditAccessService } from './add-edit.acess.service';
import { ClientModel } from '@gonzalocarmenado/common-connector-clients';
import { ClientAddEditTransformationService } from './add-edit.transformation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.scss',
  standalone: false,
})
export class AddEditComponent implements OnInit {
  private readonly snackBar = inject(MatSnackBar);

  public clientForm!: FormGroup;
  public clientAPIData!: ClientModel;
  constructor(
    @Inject(MAT_DIALOG_DATA) public clientInput: number,
    private readonly constructorService: ClientAddEditConstructorService,
    private readonly dialogRef: MatDialogRef<AddEditComponent>,
    private readonly accessService: ClientAddEditAccessService,
    private readonly transformationService: ClientAddEditTransformationService
  ) {
    this.initFormData();
  }

  public ngOnInit(): void {
    if (this.clientInput) {
      this.generateClientData(this.clientInput);
    }
  }

  //#region Inicialización de librerias
  public initFormData(): void {
    this.clientForm = this.constructorService.initFormData();
  }
  //#endregion Inicialización de librerias

  //#region Funciones comunes
  /**
   * Guarda los datos de un cliente diferenciando entre si es un alta o una edición. Para generar el DTO utiliza los datos del formulario.
   * Si la llamada es correcta se cierra el cliente
   * @return {*}  {Promise<void>}
   * @memberof AddEditComponent
   */
  public async saveClient(): Promise<void> {
    const control: string | null =
      this.transformationService.validateClientForm(this.clientForm);
    if (control === null) {
      if (this.clientAPIData) {
        const statusCode: number = await this.editClientData(
          this.transformationService.generateClientDTOFromForm(
            this.clientForm,
            this.clientAPIData
          )
        );
        if (statusCode === 200) {
          this.closeModal(statusCode);
        }
      } else {
        const statusCode: number = await this.saveClientData(
          this.transformationService.generateClientDTOFromForm(this.clientForm)
        );
        if (statusCode === 201) {
          this.closeModal(statusCode);
        }
      }
    } else {
      this.snackBar.open(control);
    }
  }

  public closeModal(statusCode?: number): void {
    this.dialogRef.close(statusCode);
  }
  /**
   * Para cuandos se trata de una edición de un cliente, obtiene en base al id recibido por parametros el cliente completo. Asigna valores al formualrio
   * para precargar los datos y guarda una copia de los datos (para borrar cambios y guardar el id/fecha de creación.)
   * @private
   * @param {number} id
   * @return {*}  {Promise<void>}
   * @memberof AddEditComponent
   */
  private async generateClientData(id: number): Promise<void> {
    this.clientAPIData = await this.getClientDataById(id);
    this.clientForm = this.constructorService.initFormData(this.clientAPIData);
  }
  //#endregion Funciones comunes

  //#region Acceso a datos
  private saveClientData(clientData: ClientModel): Promise<number> {
    return this.accessService.saveClientData(clientData);
  }

  private editClientData(clientData: ClientModel): Promise<number> {
    return this.accessService.editClientData(clientData);
  }

  private getClientDataById(id: number): Promise<ClientModel> {
    return this.accessService.getClientDataById(id);
  }
  //#endregion Acceso a datos
}
