import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { InterClient, InterMenu, InterRecipes } from 'src/app/Interface/interfaces.service';
import { BdService } from 'src/app/Service/bd.service';
import { ElementsService } from 'src/app/Service/elements.service';
import { FirebaseService } from 'src/app/Service/firebase.service';
import { PreferenceService } from 'src/app/Service/preference.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  FlagMenu:boolean=false
  ArrayUser:InterClient[]=[]
  RecentsUser:InterClient[]=[]
  Users:InterClient[]=[]
  ClientsShown:number=0
  Recents:boolean=false
  ArrayRecipes:InterRecipes[]=[]
  CopyRecipes:InterRecipes[]=[]
  RecipesShow:number=0

  @ViewChild(IonModal) modal!: IonModal;
  ModalOpen: boolean = false
  constructor(private route:Router,
    private bd:BdService,
    private Preference:PreferenceService,
    private Firebase:FirebaseService,
    private Elemento:ElementsService ) { }
  ngOnInit() {
    this.GetsUsers()//Get ALL CLIENTS
    this.GetRecipes()


    document.getElementById("BtnMenu")?.addEventListener("click",()=>{
      let modal=document.getElementById("modal")!
      if(!this.FlagMenu){
        this.FlagMenu=true
        modal.style.transform="translateX(0%)"
      }else{
        this.FlagMenu=false
        modal.style.transform="translateX(200%)"
      }
    })
    document.getElementById("modal")?.addEventListener("click",()=>{
      let modal=document.getElementById("modal")!
      this.FlagMenu=false
        modal.style.transform="translateX(200%)"
    })
    document.getElementById("AddClient")?.addEventListener("click",()=>{
      this.route.navigate(["/createClient"])
    })
    document.getElementById("AddRecipes")?.addEventListener("click",()=>{
      this.route.navigate(["/createRecipes"])
    })
    document.getElementById("BtnBack")?.addEventListener("click",()=>{
      this.ClientsShown-=5
      document.getElementById("BtnNext")!.style.display="block"
      this.PushArrayClients()
        this.CreateCards()
      if((this.ClientsShown-5)<0){
        document.getElementById("BtnBack")!.style.display="none"
      }
      
    })
    document.getElementById("BtnNext")?.addEventListener("click",()=>{
      this.ClientsShown+=5
      document.getElementById("BtnBack")!.style.display="block"
      this.PushArrayClients()
        this.CreateCards()
      if((this.ClientsShown+5)>this.ArrayUser.length){
        document.getElementById("BtnNext")!.style.display="none"
      }
      
    })
    document.getElementById("SeeRecipe")?.addEventListener("click",()=>{
      this.PushArrayRecipe()
      this.ModalOpen=true;
    })
    
  }


  private CreateCards(){
    document.getElementById("ContentShowClient")!.innerHTML=""
    var Content=document.getElementById("ContentShowClient")
    this.Users.forEach(element => {
      var Card=document.createElement("div")
      Card.className='ContentContact'
      Card.addEventListener("click",()=>{
        this.InformationClient(element)
      })
      var ImgAvatar=document.createElement("img")
      ImgAvatar.className="ImgContact"
      ImgAvatar.src="./../../../assets/icon/Avatar.png"
      var ContentText=document.createElement("div")
      ContentText.className="InformationContact"
      var h5=document.createElement("h5")
      h5.textContent=element.Name
      var p=document.createElement("p")
      p.textContent=element.Phone
      ContentText.appendChild(h5)
      ContentText.appendChild(p)
      Card.appendChild(ImgAvatar)
      Card.appendChild(ContentText)
      Content?.appendChild(Card)
    });
  }

  private async GetsUsers(){
    let Users:any= await this.Firebase.GetClients()
    this.ArrayUser=Users
    this.PushArrayClients()//Put five elements in the array 
    //this.DeleteDatePreference()
    this.GetRecents()//Get CLIENTS of the preference
  }

  private PushArrayClients(){
    this.Users=[]
    for (let index = this.ClientsShown; index < this.ArrayUser.length; index++) {
      if(index<(this.ClientsShown+5)){
        this.Users.push(this.ArrayUser[index])
      }else{
        index=10000
      }
    }
    let BtnNext=document.getElementById("BtnNext")!//see btn next
    if(this.ArrayUser.length>5){
      BtnNext.style.display="block"
    }else{
      BtnNext.style.display="none"
    }
  }

  public InformationClient(User:InterClient){
    this.Reorder(User)
    this.bd.InformationClient=User
    this.SaveArrayPreference()
    this.route.navigate(["/informationClient"])
  }

  public recents(){
    if(this.RecentsUser[0]){
      this.Recents=true;
    }else{
      this.Recents=false
    }
  }

  public async GetRecents(){
    var arrayCopia:InterClient[]=await this.Preference.Get()
    this.RecentsUser=arrayCopia
    this.recents()
  }

  public Reorder(User:InterClient){
    var flag:boolean=true
    for (let index = 0; index < 3; index++) {//if the client its found in the array
      if(this.RecentsUser[index]==null){
        index=78
      }else{
        if(this.RecentsUser[index].IdClient==User.IdClient){
          index=78
          flag=false
        }
      }
      
    }
    if(flag){//the client is not found in the array 
      if(this.RecentsUser.length<3){
        this.RecentsUser.push(User)
      }else{//Reorder array
        this.RecentsUser[2]=this.RecentsUser[1]
        this.RecentsUser[1]=this.RecentsUser[0]
        this.RecentsUser[0]=User
      }
    }
  }

  private SaveArrayPreference(){
    this.Preference.SaveRecents(this.RecentsUser)
  }
  private async DeleteDatePreference(){
    var arrayCopia:InterClient[]=await this.Preference.Get()
    let NewArray:InterClient[]=[]
    for(let Element of this.Users){
      if((Element.IdClient==arrayCopia[0].IdClient)||(Element.IdClient==arrayCopia[1].IdClient)||(Element.IdClient==arrayCopia[2].IdClient)){
        NewArray.push(Element)
      }
    }
    await this.Preference.SaveRecents(NewArray)
  }
  //Modal Recipes
  public CloseModal() {
    this.ModalOpen = false
  }
  private async GetRecipes(){
    let Dates:any=await this.Firebase.GetRecipes()
    this.CopyRecipes=Dates
    
  }
  private PushArrayRecipe(){
    this.ArrayRecipes=[]
    for (let index = this.RecipesShow; index < this.CopyRecipes.length; index++) {
      if(index<(this.RecipesShow+6)){
        this.ArrayRecipes.push(this.CopyRecipes[index])
      }else{
        index=10000
      }
    }
    let BtnNext=document.getElementById("ModalRecipeBtnNext")//see btn next
    if(this.CopyRecipes.length<6){
      BtnNext!.style.display="none"
    }
  }
  public BtnModalNext(){
    this.RecipesShow+=6
    document.getElementById("ModalRecipeBtnBack")!.style.display="block"
    this.PushArrayRecipe()
    this.CreateItemSearchRecipes(this.ArrayRecipes)
    if((this.RecipesShow+6)>this.ArrayRecipes.length){
      document.getElementById("ModalRecipeBtnNext")!.style.display="none"
    }
  }
  public BtnModalBack(){
    this.RecipesShow-=6
      document.getElementById("ModalRecipeBtnNext")!.style.display="block"
      this.PushArrayRecipe()
      this.CreateItemSearchRecipes(this.ArrayRecipes)
    console.log(this.ArrayRecipes)
      if((this.RecipesShow-6)<0){
        document.getElementById("ModalRecipeBtnBack")!.style.display="none"
      }
  }
  public SearchRecipes(){
    let TextSearchRecipe:string=(document.getElementById("InputSearch") as HTMLInputElement).value
    let ArrayRecipesSearch:InterRecipes[]=this.ArrayRecipes.filter((Recipe)=>{
      return Recipe.Name.toString().includes(TextSearchRecipe)
    })
    this.CreateItemSearchRecipes(ArrayRecipesSearch)
  }
  private CreateItemSearchRecipes(ArraySearch:InterRecipes[]){
    let Content=document.getElementById("ContentRecipes")
    Content!.innerHTML=""
    ArraySearch.forEach(element => {
      let item=document.createElement("ion-item-sliding")
    let Name=document.createElement("ion-item")
    Name.button=true
    Name.addEventListener("click",()=>{
      this.InfomationRecipe(element)
    })
    let h2=document.createElement("h2")
    h2.textContent=element.Name
    Name.appendChild(h2)
    //Options
    let Options=document.createElement("ion-item-options")
    Options.slot="end"
    //Option Edit
    let OptionEdit=document.createElement("ion-item-option")
    OptionEdit.addEventListener("click",()=>{
      this.EditRecipe(element)
    })
    OptionEdit.color="warning"
    let OptionIconEdit=document.createElement("ion-icon")
    OptionIconEdit.slot="icon-only"
    OptionIconEdit.src="./../../../assets/icon/Edit.svg"
    OptionEdit.appendChild(OptionIconEdit)
    //Options Delate
    let OptionDelate=document.createElement("ion-item-option")
    OptionDelate.addEventListener("click",()=>{
      this.DelateRecipe(element.IdRecipes)
    })
    OptionDelate.color="danger"
    OptionDelate.expandable=true
    let OptionIconDelate=document.createElement("ion-icon")
    OptionIconDelate.slot="icon-only"
    OptionIconDelate.src="./../../../assets/icon/Trash.svg"
    OptionDelate.appendChild(OptionIconDelate)
    //
    Options.appendChild(OptionEdit)
    Options.appendChild(OptionDelate)
    item.appendChild(Name)
    item.appendChild(Options)
    //
    Content?.appendChild(item)
    });
    

  }
  public InfomationRecipe(item:InterRecipes){
    this.modal.dismiss()
    this.CloseModal()
    this.bd.InformationRecipes=item
    this.route.navigate(['/informationRecipes'])
  }
  public EditRecipe(item:InterRecipes){
    this.modal.dismiss()
    this.CloseModal()
    this.bd.InformationRecipes=item
    this.route.navigate(['/EditInformation'])
  }
  public DelateRecipe(Id:number){
    this.modal.dismiss()
    this.CloseModal()
    try {
      this.DelateRecipeAllBD(Id).finally(()=>{
        this.GetRecipes()
        this.route.navigate(['/homeNutritionist'])
      }).catch(()=>{
        this.Elemento.ErrorRecipeToast()
      })
    } catch (error) {
      this.Elemento.ErrorToast(error)
    }
    
  }
  private async DelateRecipeAllBD(Id:number){
    await this.Firebase.DelateRecipes(Id)
    let ArrayMenus:any=await this.Firebase.GetAllMenus()
    let ArrayMenusCopia:InterMenu[]=ArrayMenus
    //Seach all Menu with content the Recipe
    let ArraysModification=ArrayMenusCopia.filter((Menu)=>{
      return Object.values(Menu).includes(Id)
    })
    //Create array with only values to change  
    let ValuesModificate=await ArraysModification.map((Menu)=>{
      let Parametro=Object.entries(Menu).filter(([key,value])=>value==Id).map(([key])=>({key:key}))
      return {idMenu:Menu.IdMenu,Parametro}
    })
    //Modificate date for one a one 
    ValuesModificate.forEach(async Element=>{
      for (let index = 0; index < Element.Parametro.length; index++) {
        await this.Firebase.ModificateMenus(Element.Parametro[index].key,"0",Element.idMenu)
      }
    })
  }


}
