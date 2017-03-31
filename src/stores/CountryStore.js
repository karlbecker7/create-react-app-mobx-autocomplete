import {extendObservable, action} from 'mobx'
import Fetch from '../core/Fetch.js'

class CountryStore{
	fetchByName = new Fetch()
	fetchByCode = new Fetch()

	constructor(){
		extendObservable(this, {
			value:'',
			countries:[]
		})
	}

	handleValueChange = value=>{		
		this.value = value
		this.loadCountries()		

	}

	loadCountries = async ()=>{

		await this.fetchByName.fetch({
			method:'get',
			url:`name/${this.value}`,
		})

	}
}

const contryStore = new CountryStore()

export default contryStore