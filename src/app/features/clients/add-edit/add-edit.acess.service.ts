import { Injectable } from '@angular/core';
import {
  ClientModel,
  CommonConnectorClientsService,
} from '@gonzalocarmenado/common-connector-clients';
import { environment } from '../../../../environments/environment';
import { StandarResponse } from '@gonzalocarmenado/general-http-core-hub';

@Injectable({
  providedIn: 'root',
})
export class ClientAddEditAccessService {
  constructor(private readonly clientService: CommonConnectorClientsService) {}

  public saveClientData(clientData: ClientModel): Promise<number> {
    return new Promise((resolve, reject) => {
      this.clientService
        .postNewClient(environment.testAPI, clientData)
        .then((saveClientResponse: StandarResponse<ClientModel>) => {
          resolve(saveClientResponse.status);
        })
        .catch((message: Error) => {
          reject(message instanceof Error ? message : new Error(message));
        });
    });
  }

  public editClientData(clientData: ClientModel): Promise<number> {
    return new Promise((resolve, reject) => {
      this.clientService
        .putClient(environment.testAPI, Number(clientData.id), clientData)
        .then((saveClientResponse: StandarResponse<ClientModel>) => {
          resolve(saveClientResponse.status);
        })
        .catch((message: Error) => {
          reject(message instanceof Error ? message : new Error(message));
        });
    });
  }

  public getClientDataById(id: number): Promise<ClientModel> {
    return new Promise((resolve, reject) => {
      this.clientService
        .getClientById(environment.testAPI, id)
        .then((saveClientResponse: StandarResponse<ClientModel>) => {
          resolve(saveClientResponse.data);
        })
        .catch((message: Error) => {
          reject(message instanceof Error ? message : new Error(message));
        });
    });
  }
}
