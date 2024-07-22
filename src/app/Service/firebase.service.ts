import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getDocs, getFirestore, collection, writeBatch } from "firebase/firestore";
import { InterMenu, InterRecipes, InterClient, InterExtraInformationClient } from '../Interface/interfaces.service';
import { BdService } from './bd.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private bd:BdService,private router:Router,
    private alertController: AlertController
  ) { }
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);

  public async AddDate(User: InterClient) {
    try {
      const docRef = await setDoc(doc(this.db, "Clients", "" + User.IdClient), {
        IdClient: User.IdClient,
        IdUser: User.IdUser,
        IdClientInformation: User.IdClientInformation,
        Name: User.Name,
        LastName: User.LastName,
        Phone: User.Phone,
        NextDate: User.NextDate,
        NextHours: User.NextHours,
        Menus: {
          Monday: User.Menus.Monday,
          Tuesday: User.Menus.Tuesday,
          Wednesday: User.Menus.Wednesday,
          Thursday: User.Menus.Thursday,
          Friday: User.Menus.Friday,
          Saturday: User.Menus.Saturday,
          Sunday: User.Menus.Sunday,
        }
      })
    } catch (error) { console.log(error) }

    /*const docRef = await addDoc(collection(db, "Clients"),{
      IdClient: User.IdClient,
      IdUser: User.IdUser,
      IdClientInformation: User.IdClientInformation,
      Name: User.Name,
      LastName: User.LastName,
      Phone: User.Phone,
      NextDate: User.NextDate,
      NextHours: User.NextHours,
      Menus:{
        Monday: User.Menus.Monday,
        Tuesday:User.Menus.Tuesday,
        Wednesday:User.Menus.Wednesday,
        Thursday:User.Menus.Thursday,
        Friday:User.Menus.Friday,
        Saturday:User.Menus.Saturday,
        Sunday:User.Menus.Sunday,
      }
    });*/
  }

  public async AddExtraInformation(Extra: InterExtraInformationClient) {
    try {
      const docRef = await setDoc(doc(this.db, "ClientInformation", "" + Extra.IdClientInformation), {
        IdClientInformation: Extra.IdClientInformation,
        IdClient: Extra.IdClient,
        TargetWeight: Extra.TargetWeight,
        ActualWeight: Extra.ActualWeight,
        Height: Extra.Height,
        Waist: Extra.Waist,
        Hip: Extra.Hip,
        Arms: Extra.Arms,
        Chest: Extra.Chest,
        Thigh: Extra.Thigh,
        Weights: {
          StarWeight: Extra.Weights.StarWeight,
          Weight3: Extra.Weights.Weight3,
          Weight2: Extra.Weights.Weight2,
          Weight1: Extra.Weights.Weight1,
          LastWeight: Extra.Weights.LastWeight
        }
      })
    } catch (error) { console.log(error) }
  }

  public async AddNewRecipe(Recipe: InterRecipes) {
    try {
      const docRef = await setDoc(doc(this.db, "Recipes", "" + Recipe.IdRecipes), {
        IdRecipes: Recipe.IdRecipes,
        Name: Recipe.Name,
        Ingredinets: Recipe.Ingredinets,
        Procedure: Recipe.Procedure,
        Carbohydrate: Recipe.Carbohydrate,
        Fat: Recipe.Fat,
        Protein: Recipe.Protein
      })
    } catch (error) { console.log(error) }
  }

  public async AddMenu(Menu: InterMenu) {
    try {
      const docRef = await setDoc(doc(this.db, "Menus", "" + Menu.IdMenu), {
        IdMenu: Menu.IdMenu,
        Breakfast: Menu.Breakfast,
        Lunch: Menu.Lunch,
        Meal: Menu.Meal,
        Snack: Menu.Snack,
        Dinner: Menu.Dinner,
        Refreshment: Menu.Refreshment
      })
    } catch (error) { console.log(error) }
  }
  public async CreateUser(Id:string,User:string,Password:string,IdClient:number){
    try {
      const docRef = await setDoc(doc(this.db, "User",Id), {
        IdUser: Id,
        IdClient: IdClient,
        User: User,
        Password: Password,
      })
    } catch (error) { console.log(error) }
  }
  public async GetUser(User:string,Password:string){
    try {
      const docRef = await getDocs(collection(this.db, "User"))
      let range:boolean=false
      let flag:boolean=false
      for (let Element of docRef.docs) {
        if(Element.data()['User']==User){
          if(Element.data()['Password']==Password){
            this.bd.User=Element.data()['IdClient']
            flag=true
            console.log("informacion cliente")
            console.log(Element.data()['IdClient'])
            //if the range
            
          }
        }
      }
      if(flag){
        if(range){
          return this.router.navigate(["/homeNutritionist"])
        }else{
          return this.router.navigate(['/homeClient'])
        }
      }else{
        this.UserPasswordIncorrectAlert()
        return 0
      }      
    } catch (error) { return "hay un error" }
  }
  public async UserPasswordIncorrectAlert() {
    const alert = await this.alertController.create({
      header: 'Usuario o Contraseña Incorrecta',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.clearInputs()
          },
        },
      ]
    });
    await alert.present();
  }
  public clearInputs(){
    let user=(document.getElementById("InputUser") as HTMLInputElement)
    let password=(document.getElementById("InputPassword") as HTMLInputElement)
    user.textContent=""
    password.textContent=""
  }

  public async GetRecipes() {
    try {
      let arrayDocument: any[] = []
      const docRef = await getDocs(collection(this.db, "Recipes"))
      for (let Element of docRef.docs) {
        arrayDocument.push(Element.data())
      }
      return arrayDocument
    } catch (error) { return "hay un error" }

  }

  public async GetClients() {
    try {
      let arrayDocument: any[] = []
      const docRef = await getDocs(collection(this.db, "Clients"))
      for (let Element of docRef.docs) {
        arrayDocument.push(Element.data())
      }
      return arrayDocument
    } catch (error) { return "hay un error" }

  }
  public async GetClient(Id:number) {
    try {
      let arrayDocument: any
      const docRef = doc(this.db, "Clients",Id.toString())
      const docSnap = await getDoc(docRef);
      arrayDocument = docSnap.data()
      return arrayDocument
    } catch (error) { return "hay un error" }

  }

  public async GetExtraInformationClient(id: number) {
    try {
      let arrayDocument: any
      const docRef = doc(this.db, "ClientInformation", "" + id);
      const docSnap = await getDoc(docRef);
      arrayDocument = docSnap.data()
      return arrayDocument
    } catch (error) { return "hay un error" }

  }
  public async GetMenus(id: number) {
    try {
      let arrayDocument: any
      const docRef = doc(this.db, "Menus", "" + id);
      const docSnap = await getDoc(docRef);
      arrayDocument = docSnap.data()
      return arrayDocument
    } catch (error) { return "hay un error" }

  }
  public async GetAllMenus() {
    try {
      let arrayDocument: any[] = []
      const docRef = await getDocs(collection(this.db, "Menus"))
      for (let Element of docRef.docs) {
        arrayDocument.push(Element.data())
      }
      return arrayDocument
    } catch (error) { return "hay un error" }

  }
  public async ModificateMenus(Element: string, value: string, Id: number) {
    try {
      const updateData: any = {};
      updateData[Element] = value
      const batch = writeBatch(this.db);
      const sfRef = doc(this.db, "Menus", "" + Id);
      await batch.update(sfRef, updateData);
      await batch.commit();
    } catch (error) { }
  }
  public async ModificateMenuClient(User: InterClient,Id:number ) {
    try {
      const batch = writeBatch(this.db);
      const sfRef = doc(this.db, "Clients", "" + Id);
      await batch.update(sfRef, {
        Menus:{
          "Friday":User.Menus.Friday,
          "Monday":User.Menus.Monday,
          "Saturday":User.Menus.Saturday,
          "Sunday":User.Menus.Sunday,
          "Thursday":User.Menus.Thursday,
          "Tuesday":User.Menus.Tuesday,
          "Wednesday":User.Menus.Wednesday
        }
      });
      await batch.commit();
    } catch (error) { }
  }
  public async UpdateRecipe(NewRecipe: InterRecipes) {
    try {
      const batch = writeBatch(this.db);
      const sfRef = doc(this.db, "Recipes", "" + NewRecipe.IdRecipes);
      await batch.update(sfRef, {
        "Carbohydrate": NewRecipe.Carbohydrate,
        "Name": NewRecipe.Name,
        "Fat": NewRecipe.Fat,
        "Ingredinets": NewRecipe.Ingredinets,
        "Procedure": NewRecipe.Procedure,
        "Protein": NewRecipe.Protein
      });
      await batch.commit();
    } catch (error) { }
  }
  public async DelateRecipes(Id: number) {
    try {
      const batch = writeBatch(this.db);
      const laRef = doc(this.db, "Recipes", "" + Id);
      batch.delete(laRef);
      await batch.commit();
    } catch (error) { }
  }
  public async DelateMenuDay(Id: number,User:InterClient) {
    try {
      const batch = writeBatch(this.db);
      const laRef = doc(this.db, "Menus", "" + Id);
      batch.delete(laRef);
      await batch.commit();
      this.ModificateMenuClient(User,User.IdClient)
    } catch (error) { }
  }
  public async DelateClientMENUS(ArrayMenus:number[]){
    try {
      console.log("arrays, ids a borrar")
      for(let id of ArrayMenus){
        console.log(id)
        const batch = writeBatch(this.db);
        const laRef = doc(this.db, "Menus", id.toString());
        batch.delete(laRef);
        await batch.commit();
      }
    } catch (error) { console.log(error) }
  }
  public async DelateClientInformation(id:number){
    try {
      console.log("cliente borrado")
        console.log(id)
        const batch = writeBatch(this.db);
        const laRef = doc(this.db, "Clients", id.toString());
        batch.delete(laRef);
        await batch.commit();
    } catch (error) { console.log(error) }
  }
  public async DelateClientExtraInforamtion(id:number){
    try {
      console.log("cliente borrado")
        console.log(id)
        const batch = writeBatch(this.db);
        const laRef = doc(this.db, "ClientInformation", id.toString());
        batch.delete(laRef);
        await batch.commit();
    } catch (error) { console.log(error) }
  }
  public async UpDateInformationClient(Infomation: any) {
    try {
      const batch = writeBatch(this.db);
      const sfRef = doc(this.db, "Clients", "" + Infomation.Id);
      await batch.update(sfRef, {
        "Name": Infomation.Name,
        "LastName": Infomation.LastName,
        "Phone": Infomation.Phone
      });
      await batch.commit();
    } catch (error) { }
  }
  public async UpDateExtraInformation(Information: any) {
    try {
      const batch = writeBatch(this.db);
      const sfRef = doc(this.db, "ClientInformation", "" + Information.Id);
      await batch.update(sfRef, {
        "TargetWeight": Information.TargetWeight,
        "ActualWeight": Information.ActualWeight,
        "Height": Information.Height,
        "Waist": Information.Waist,
        "Hip": Information.Hip,
        "Arms": Information.Arms,
        "Chest": Information.Chest,
        "Thigh": Information.Thigh,
        Weights: {
          "StarWeight":Information.Weights.StarWeight,
          "Weight3": Information.Weights.Weight3,
          "Weight2": Information.Weights.Weight2,
          "Weight1": Information.Weights.Weight1,
          "LastWeight": Information.Weights.LastWeight,
        }
      });
      await batch.commit();
    } catch (error) { }
  }

  public async UpDateInformationMenuDay(Information:any){
    try {
      const batch = writeBatch(this.db);
      const sfRef = doc(this.db, "Menus", "" + Information.IdMenu);
      await batch.update(sfRef, {
        "IdMenu": Information.IdMenu,
        "Breakfast": Information.Breakfast,
        "Dinner": Information.Dinner,
        "Lunch": Information.Lunch,
        "Meal": Information.Meal,
        "Refreshment": Information.Refreshment,
        "Snack": Information.Snack
      });
      await batch.commit();
    } catch (error) { }
  }

}
