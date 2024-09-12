import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { doc, getDoc, setDoc, getDocs, getFirestore, collection, writeBatch } from "firebase/firestore";
import { InterMenu, InterRecipes, InterClient, InterExtraInformationClient } from '../Interface/interfaces.service';
import { BdService } from './bd.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private bd:BdService,private router:Router,
    private alertController: AlertController,
    private Http:HttpClient
  ) { }
  private app = initializeApp(environment.firebase);
  private db = getFirestore(this.app);
  private cosa:any=[]
  //Create
  public CreateUser(User:any):Observable<any>{
    try {
      let Url:string="https://createuser-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,User)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  //GETS
  public GetUser(TextUser:string,TextPassword:string): Observable<any>{
    let User:any={
      User:TextUser,
      Password:TextPassword
    }
    try {
      let Url:string="https://getuser-pycjk7zayq-uc.a.run.app"
      let DatesUser:any=this.Http.post<any>(Url,User)

      return DatesUser
      
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public GetClients():Observable<any> {
    try {
      let Url:string="https://getclients-pycjk7zayq-uc.a.run.app"
      let Information:any=this.Http.get<any>(Url)
      return Information
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public GetClient(Id:number):Observable<any> {
    try {
      let Url:string="https://getclient-pycjk7zayq-uc.a.run.app"
      let NumberId={
        Id:Id
      }
      let InformationClient=this.Http.post<any>(Url,NumberId)
      return InformationClient
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }

  }
  public GetExtraInformationClient(id: number):Observable<any> {
    try {
      let Url:string="https://getextrainforamtionclient-pycjk7zayq-uc.a.run.app"
      let NumberId={
        Id:id
      }
      console.log("informacion del service del firebase")
      console.log(NumberId)
      
      let ExtraInformationClient:any=this.Http.post<any>(Url,NumberId)
      return ExtraInformationClient
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }

  }
  public GetRecipes():Observable<any> {
    try {
      let Url:string="https://getrecipes-pycjk7zayq-uc.a.run.app"
      let AllRecipes:any=this.Http.get<any>(Url)
      return AllRecipes
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }

  }
  public GetMenu(id: any):Observable<any>{
    try {
      let Url:string="https://getmenu-pycjk7zayq-uc.a.run.app"
      /*let NumberId={
        Id:id
      }*/
      let InformationMenu:any=this.Http.post<any>(Url,id)
      return InformationMenu
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }

  }
  public GetAllMenus():Observable<any> {
    
    try {
      let Url:string="https://getmenus-pycjk7zayq-uc.a.run.app"
      let AllMenus:any=this.Http.get<any>(Url)
      return AllMenus
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }

  }
  //ADD
  public AddDate(User: InterClient):Observable<any> {
    try {
      let InformationClient:any = {
        IdClient: User.IdClient.toString(),
        IdUser: User.IdUser.toString(),
        IdClientInformation: User.IdClientInformation.toString(),
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
      }
      let Url:string="https://addinformationclient-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,InformationClient)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public AddExtraInformation(Extra: InterExtraInformationClient):Observable<any> {
    try {
      let Url:string="https://addextrainformationclient-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,Extra)
        
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public AddNewRecipe(Recipe: InterRecipes):Observable<any>{
    try {
      let Url="https://addnewrecipe-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,Recipe)
    }catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public AddMenu(Menu: InterMenu[]):Observable<any> {
    try {
      let Url="https://addmenu-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,Menu)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  //Update
  public ModificateMenus(Element: string, value: string, Id: number):Observable<any> {
    try {
      let Information={
        Id:Id,
        Parameter:Element,
        Value:value
      }
      let Url:string="https://updatemenu-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,Information)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public ModificateMenuClient(User: InterClient,Id:number ):Observable<any> {
    try {
      let Menus={
        Id:Id,
        Friday:User.Menus.Friday,
        Monday:User.Menus.Monday,
        Saturday:User.Menus.Saturday,
        Sunday:User.Menus.Sunday,
        Thursday:User.Menus.Thursday,
        Tuesday:User.Menus.Tuesday,
        Wednesday:User.Menus.Wednesday
      }
      let Url:string="https://updatemenuclient-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,Menus)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public UpdateRecipe(NewRecipe: InterRecipes):Observable<any> {
    try {
      let InformationRecipe={
        Id:NewRecipe.IdRecipes,
        Carbohydrate: NewRecipe.Carbohydrate,
        Name: NewRecipe.Name,
        Fat: NewRecipe.Fat,
        Ingredinets: NewRecipe.Ingredinets,
        Procedure: NewRecipe.Procedure,
        Protein: NewRecipe.Protein
      }
      let Url:string="https://updaterecipe-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,InformationRecipe)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public UpDateInformationClient(Infomation: any):Observable<any> {
    try {
      let Url:string="https://updateinformationclient-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,Infomation)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public UpDateExtraInformation(Information: any):Observable<any> {
    try {
      let Url:string="https://updateextrainformation-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,Information)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public UpDateInformationMenuDay(Information:any):Observable<any>{
    try {
      let Url:string="https://updatemenuday-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,Information)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  //DELATE
  public DeleteRecipes(Id: number):Observable<any> {
    try {

      let NumerId={
        Id:Id
      }

      let Url:string="https://deleterecipe-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,NumerId)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public DelateClientInformation(id:number):Observable<any>{
    try {

      let NumerId={
        Id:id
      }
      console.log("Informacion Id:"+NumerId.Id)
      let Url:string="https://deleteclientinforamtion-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,NumerId)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public DelateClientExtraInforamtion(id:number):Observable<any>{
    try {

      let NumerId={
        Id:id
      }
      console.log("Informacion EXTRA Id:"+NumerId.Id)
      let Url:string="https://deleteextrainformation-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,NumerId)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }
  public DelateMenuDay(Id: number,User:InterClient):Observable<any> {
    try {
      let NumerId={
        Id:Id
      }
      let Url:string="https://deletemenuday-pycjk7zayq-uc.a.run.app"
      let varreturn=this.Http.post<any>(Url,NumerId)

      this.ModificateMenuClient(User,User.IdClient).subscribe((res)=>{
        return res
      })
      return varreturn
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }

  public DelateClientMENUS(ArrayMenus:number[]):Observable<any>{
    try {
      let Url:string="https://deleteclientmenus-pycjk7zayq-uc.a.run.app"
      return this.Http.post<any>(Url,ArrayMenus)
    } catch (error) { 
      let InformationError:any=error
      return InformationError
    }
  }


  //
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

    
  
  
  
  
  

  

}
