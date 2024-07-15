import { Component } from '@angular/core';
import { Country } from './model/country';
import { State } from './model/state';
import { City } from './model/city';
import { CountrystatecityService } from './services/countrystatecity.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Country Names';

constructor(private countrystatecityService: CountrystatecityService){}

  listcountry!: Country[]
  countrySelected!: string
  listState!: State[]
  selectedState!: string
  listCity!: City[]

ngOnInit(){
  this.fetchCountry();
}

private fetchCountry(){
  this.countrystatecityService.getCountry().subscribe(data=>{
  this.listcountry = data
  console.log('Countries fetched', this.listcountry)
  })

}

onCountrySelected(countryIso: any){
  this.countrystatecityService.getStateOfSelectedCountry(countryIso).subscribe(data=>{
    this.listState = data
    console.log('States Retrieved', this.listState)
  })
}
onStateSelected(countryparam = this.countrySelected, stateparam = this.selectedState){
this.countrystatecityService.getCitiesOfSelectedState(countryparam, stateparam).subscribe(data=>{
  this.listCity = data
  console.log('Cities retrieved', this.listCity)
})
}
}
