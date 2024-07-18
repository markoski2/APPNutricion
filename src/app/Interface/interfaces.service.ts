
export interface InterMenu{
  IdMenu:number,
  Breakfast:number,
  Lunch:number,
  Meal:number,
  Snack:number,
  Dinner:number,
  Refreshment:number
}

export interface InterRecipes {
  IdRecipes: number,
  Name: string,
  Ingredinets: string,
  Procedure: string,
  Carbohydrate: number,
  Fat: number,
  Protein:number
}

export interface InterClient {
  IdClient: number;
  IdUser: number;
  IdClientInformation: number;
  Name: string;
  LastName: string;
  Phone: string;
  NextDate: string;
  NextHours: string;
  Menus:{
    Monday:number;
    Tuesday:number;
    Wednesday:number;
    Thursday:number;
    Friday:number;
    Saturday:number;
    Sunday:number;
  }
}
export interface InterExtraInformationClient {
  IdClientInformation: number;
  IdClient: number;
  TargetWeight: number;
  ActualWeight: number;
  Height: number;
  Waist: number;
  Hip: number;
  Arms: number;
  Chest: number;
  Thigh: number;
  Weights:{
    StarWeight:number;
    Weight3:number;
    Weight2:number;
    Weight1:number;
    LastWeight:number;
  }
}
