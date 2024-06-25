import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BdService {

  Recipes = [
    {
      IdRecipes: 1,
      Name: "cosa numero 1",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Img: "./../../../assets/icon/Portada.png"
    }, {
      IdRecipes: 2,
      Name: "Lorem ipsum dolor sit amet",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Img: "./../../../assets/icon/Portada.png"
    }, {
      IdRecipes: 3,
      Name: "josefo intor",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Img: "./../../../assets/icon/Portada.png"
    }, {
      IdRecipes: 4,
      Name: "html javascript css",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Img: "./../../../assets/icon/Portada.png"
    }, {
      IdRecipes: 5,
      Name: "con cuatnas superios",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Img: "./../../../assets/icon/Portada.png"
    }, {
      IdRecipes: 6,
      Name: "que hace hoy en dia",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Img: "./../../../assets/icon/Portada.png"
    }, {
      IdRecipes: 7,
      Name: "no me inpirta soh done",
      Ingredinets: "*ingredients 1 \n *ingredients 2 \n *ingredients 3 \n *ingredients 4 \n",
      Procedure: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut nisi nibh. Ut euismod eros mi, nec scelerisque nulla blandit eget. Curabitur finibus dapibus enim eu suscipit. Curabitur fermentum dolor urna. Pellentesque ultrices eget nulla ut lobortis. Donec imperdiet est semper, hendrerit mi nec, luctus lectus. ",
      Carbohydrate: 24.5,
      Fat: 45.3,
      Img: "./../../../assets/icon/Portada.png"
    }
  ]
}

export interface InterRecipes {
  IdRecipes: number,
  Name: string,
  Ingredinets: string,
  Procedure: string,
  Carbohydrate: number,
  Fat: number,
  Img: string
}
