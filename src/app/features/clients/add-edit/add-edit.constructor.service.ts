import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientModel } from '@gonzalocarmenado/common-connector-clients';

@Injectable({
  providedIn: 'root',
})
export class ClientAddEditConstructorService {
  constructor(private readonly fb: FormBuilder) {}

  public initFormData(clientData?: ClientModel): FormGroup {
    return this.fb.group({
      name: [clientData?.name ?? '', [Validators.required]],
      lastName: [clientData?.lastname ?? ''],
      lastName2: [clientData?.secondLastname ?? ''],
      phone: [
        clientData?.phone ?? '',
        [
          Validators.required,
          Validators.pattern(/^\+?[0-9\s\-()]{7,15}$/), // Formato común de teléfono
        ],
      ],
      email: [clientData?.email ?? '', [Validators.required, Validators.email]],
    });
  }
}
