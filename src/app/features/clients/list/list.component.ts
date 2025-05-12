import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClientListConstructorService } from './list.constructor.service';
import { ClientListAccessService } from './list.access.service';
import { ClientModel } from '@gonzalocarmenado/common-connector-clients';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from '../add-edit/add-edit.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: false,
})
export class ListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) private readonly paginatorCR!: MatPaginator;

  public tableClientsData!: MatTableDataSource<ClientModel>;
  public tableClientsColumnsHeaders!: string[];

  constructor(
    private readonly constructorService: ClientListConstructorService,
    private readonly accessService: ClientListAccessService,
    private readonly dialogService: MatDialog
  ) {}

  public ngAfterViewInit(): void {
    this.initTableData();
  }

  //test

  //#region Inicialización de librerias
  private async initTableData(): Promise<void> {
    setTimeout(async () => {
      this.tableClientsColumnsHeaders = this.constructorService.initTableData();
      this.tableClientsData = new MatTableDataSource<ClientModel>([]);
      this.tableClientsData.data = await this.getClientList();
      this.tableClientsData.paginator = this.paginatorCR;
    });
  }
  //#endregion Inicialización de librerias

  //#region Funciones de callback

  public async openActionButonClientTable(
    clientData: ClientModel,
    type: number
  ): Promise<void> {
    if (type === 1) {
      this.openClientModal(clientData);
    } else if (type === 2) {
      const deletedClient: number = await this.deleteClientList(
        Number(clientData.id)
      );
      if (deletedClient === 200) {
        this.initTableData();
      }
    }
  }
  //#endregion Funciones de callback

  //#region Funciones comunes
  public openClientModal(clientData?: ClientModel): void {
    const dialogRef = this.dialogService.open(AddEditComponent, {
      width: '900px',
      height: '600px',
      data: clientData?.id ?? null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.initTableData();
      }
    });
  }
  //#endregion Funciones comunes

  //#region Acceso a datos
  private async getClientList(): Promise<ClientModel[]> {
    return this.accessService.getClientList();
  }

  private async deleteClientList(id: number): Promise<number> {
    return this.accessService.deleteClient(id);
  }
  //#endregion Acceso a datos
}
