import { Injectable } from '@angular/core';
import { InterClient, InterMenu, InterRecipes } from '../Interface/interfaces.service';

@Injectable({
  providedIn: 'root'
})
export class BdService {
  InformationClient?: InterClient
  InformationRecipes?:InterRecipes
  InformationMenu?:InterMenu
  FlagMenu:boolean=false
  FlagAddDayMenu:boolean=false
  Recipes = [
    {
      IdRecipes: 1,
      Name: "cosa numero 1",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Protein:46
    }, {
      IdRecipes: 2,
      Name: "Lorem ipsum dolor sit amet",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Protein:46
    }, {
      IdRecipes: 3,
      Name: "josefo intor",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Protein:46
    }, {
      IdRecipes: 4,
      Name: "html javascript css",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Protein:46
    }, {
      IdRecipes: 5,
      Name: "con cuatnas superios",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Protein:46
    }, {
      IdRecipes: 6,
      Name: "que hace hoy en dia",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Protein:46
    }, {
      IdRecipes: 7,
      Name: "no me inpirta soh done",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Protein:46
    }
  ]

  Users=[{
    IdClient: 0,
    IdUser: 0,
    IdClientInformation: 0,
    Name: "Marco Antonio",
    LastName: "Alvarez Ordoñez",
    Phone: "45200000000",
    NextDate: "00/00/0000",
    NextHours: "00:00",
    Menus:{
      Monday: 0,
      Tuesday:1,
      Wednesday:2,
      Thursday:3,
      Friday:4,
      Saturday:5,
      Sunday:6,
    }
  },{
    IdClient: 1,
    IdUser: 1,
    IdClientInformation: 1,
    Name: "Sheila Araceli",
    LastName: "Alejandre Reyes",
    Phone: "45200000000",
    NextDate: "00/00/0000",
    NextHours: "00:00",
    Menus:{
      Monday: 0,
      Tuesday:1,
      Wednesday:2,
      Thursday:3,
      Friday:4,
      Saturday:5,
      Sunday:6,
    }
  },{
    IdClient: 2,
    IdUser: 2,
    IdClientInformation: 2,
    Name: "Edgar Gerardo",
    LastName: "Valentin Castro",
    Phone: "45200000000",
    NextDate: "00/00/0000",
    NextHours: "00:00",
    Menus:{
      Monday: 0,
      Tuesday:1,
      Wednesday:2,
      Thursday:3,
      Friday:4,
      Saturday:5,
      Sunday:6,
    }
  },{
    IdClient: 3,
    IdUser: 3,
    IdClientInformation: 3,
    Name: "Jose Antonio",
    LastName: "Rivera Torres",
    Phone: "45200000000",
    NextDate: "00/00/0000",
    NextHours: "00:00",
    Menus:{
      Monday: 0,
      Tuesday:1,
      Wednesday:2,
      Thursday:3,
      Friday:4,
      Saturday:5,
      Sunday:6,
    }
  },{
    IdClient: 4,
    IdUser: 4,
    IdClientInformation: 4,
    Name: "Dolores Force",
    LastName: "Munfrost valentina",
    Phone: "45200000000",
    NextDate: "00/00/0000",
    NextHours: "00:00",
    Menus:{
      Monday: 0,
      Tuesday:1,
      Wednesday:2,
      Thursday:3,
      Friday:4,
      Saturday:5,
      Sunday:6,
    }
  },{
    IdClient: 5,
    IdUser: 5,
    IdClientInformation: 5,
    Name: "Alexa Sofia",
    LastName: "Lopez Farias",
    Phone: "45200000000",
    NextDate: "00/00/0000",
    NextHours: "00:00",
    Menus:{
      Monday: 0,
      Tuesday:1,
      Wednesday:2,
      Thursday:3,
      Friday:4,
      Saturday:5,
      Sunday:6,
    }
  },{
    IdClient: 6,
    IdUser: 6,
    IdClientInformation: 6,
    Name: "Sofia Maria",
    LastName: "Lopez Farias",
    Phone: "45200000000",
    NextDate: "00/00/0000",
    NextHours: "00:00",
    Menus:{
      Monday: 0,
      Tuesday:1,
      Wednesday:2,
      Thursday:3,
      Friday:4,
      Saturday:5,
      Sunday:6,
    }
  },{
    IdClient: 7,
    IdUser: 7,
    IdClientInformation: 7,
    Name: "Miguel Angel",
    LastName: "Lopes Portillo",
    Phone: "45200000000",
    NextDate: "00/00/0000",
    NextHours: "00:00",
    Menus:{
      Monday: 0,
      Tuesday:1,
      Wednesday:2,
      Thursday:3,
      Friday:4,
      Saturday:5,
      Sunday:6,
    }
  }]
}




