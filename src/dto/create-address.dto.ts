// create-address.dto.ts
export class CreateAddressDto {
    readonly userId: number;
    readonly street: string;
    readonly city: string;
    readonly state: string;
    readonly zipCode: string;
  }
  
  // update-address.dto.ts
  export class UpdateAddressDto {
    readonly street?: string;
    readonly city?: string;
    readonly state?: string;
    readonly zipCode?: string;
  }
  