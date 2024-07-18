import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { InterClient } from '../Interface/interfaces.service';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  private Key:string="AppNutritionClients#"
  constructor() { }

  public SaveRecents(RecentsClients:InterClient[]){
    this.Set(RecentsClients)
  }

  private Set(RecentsClients:InterClient[]){
    Preferences.set({
      key: this.Key,
      value: JSON.stringify(RecentsClients),
    });
  }

  public async Get(){
    const { value } = await Preferences.get({ key: this.Key });
    var array = (value ? JSON.parse(value) : []) as InterClient[];
    return array
  }
}
