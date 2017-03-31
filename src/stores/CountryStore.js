import {extendObservable, action} from 'mobx'
import Fetch from '../core/Fetch'
import { flatten, uniqBy, find } from 'lodash'

class CountryStore{
	fetchByName = new Fetch()
	fetchByCode = new Fetch()

	constructor(){
		extendObservable(this, {			
			countries:[],
			selectedCountry:{}
		})
	}

	handleSelectCountry = selectedCountry=>{		
		this.selectedCountry = find(this.countries, country=>country.alpha2Code===selectedCountry.value)
	}

	fetchCountries = (value)=>{

		const fetchByName = this.fetchByName.fetch({
			url:`name/${value}`
		})

		const fetchByCode = this.fetchByCode.fetch({
			url:`alpha/${value}`
		})


		Promise.all([fetchByName,fetchByCode]).then(values=>{

			this.countries = uniqBy(
				flatten(values).filter(country => !!country),
				country => country.alpha2Code
	       	)

	       	console.log(this.countries);
			


		})
	}
}

const contryStore = new CountryStore()

export default contryStore