import { an } from "@fullcalendar/core/internal-common";
import { Products } from "../products/products.model";

export enum Status {
  // Default = "Select your role",
  Demand = "Demand",
  Confirm = "Confirm",
  Delivery = "Delivery",
  Uncertain = "Uncertain",
  Retour = "Retour",
  Done = "Done"

}

export class Orders {
  orderid: number;
  clientName: string;
  clientNumber: string;
  city: string;
  clientAddress: string;
  creationDate: Date;
  amount: number;
  status: Status;
  shoppingCart: Products[]
  totalToPay: number;

  
}


export enum Cities{

  Casablanca ="Casablanca",     
  Fez ="Fez",   
  Tangier="Tangier",   
  Marrakesh="Marrakesh",   
  Salé="Salé",   
  Meknes="Meknes",   
  Rabat="Rabat",   
  Oujda ="Oujda",   
  Kenitra ="Kenitra",   
  Chefchaouen="Chefchaouen",   
  Agadir  ="Agadir",   
  Tetouan ="Tetouan",   
  Temara  ="Temara",   
  Safi    ="Safi",   
  Mohammedia ="Mohammedia",   
  Khouribga   ="Khouribga",   
  El_Jadida   ="El_Jadida",   
  Beni_Mellal ="Beni_Mellal",   
  Aït_Melloul ="Aït_Melloul",   
  Nador   ="Nador",   
  Dar_Bouazza ="Dar_Bouazza",   
  Taza    ="Taza",   
  Settat  ="Settat",   
  Berrechid   ="Berrechid",   
  Khemisset   ="Khemisset",   
  Inezgane    ="Inezgane",   
  Ksar_El_Kebir ="Ksar_El_Kebir",   
  Larache ="Larache",   
  Guelmim ="Guelmim",   
  Khenifra    ="Khenifra",   
  Berkane ="Berkane",   
  Taourirt   ="Taourirt",   
  Bouskoura   ="Bouskoura",   
  Dcheira ="Dcheira",   
  Oued_Zem    ="Oued_Zem",   
  Sidi_Slimane  ="Sidi_Slimane",   
  Errachidia  ="Errachidia",   
  Guercif ="Guercif",   
  Ben_Guerir  ="Ben_Guerir",   
  Tifelt  ="Tifelt",   
  Lqliaa  ="Lqliaa",   
  Taroudant   ="Taroudant",   
  Sefrou  ="Sefrou",   
  Essaouira   ="Essaouira",   
  Fnideq  ="Fnideq",   
  Sidi_Kacem ="Sidi_Kacem",   
  Tiznit  ="Tiznit",   
  Tan_Tan ="Tan_Tan",   
  Ouarzazate ="Ouarzazate",    
  Souk ="Souk",   
  Youssoufia  ="Youssoufia",   
  Lahraouyine ="Lahraouyine",   
  Martil  ="Martil",   
  Ain_Harrouda  ="Ain_Harrouda",   
  Skhirat ="Skhirat",   
  Ouazzane    ="Ouazzane",   
  Benslimane  ="Benslimane",   
  Al_Hoceima  ="Al_Hoceima",   
  Beni_Ansar  ="Beni_Ansar",   
  Mdiq  ="Mdiq",   
  Sidi_Bennour  ="Sidi_Bennour",   
  Midelt  ="Midelt",   
  Azrou   ="Azrou"  
  
  
}