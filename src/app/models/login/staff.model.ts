export enum Role {
  // Default = "Select your role",
  Delivery = "DELIVERY",
  Confirmer = "CONFIRMER",
  Admin = "ADMIN"
}
export class Staff {
  id: number;
  firstName: string;
  lastName: string;
  cinCard: string;
  phoneNumber: string;
  city: string;
  mail: string;
  role: Role;
  password: string;


  constructor(firstName?: string, lastName?: string, cinCard?: string, phoneNumber?: string, city?: string, mail?: string, role?: Role, password?: string) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.cinCard = cinCard;
    this.phoneNumber = phoneNumber;
    this.city = city;
    this.mail = mail;
    this.role = role;
    this.password = password;
  }
}
