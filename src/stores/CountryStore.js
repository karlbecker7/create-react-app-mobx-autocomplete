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
	}

	fetchCountries = async ()=>{

		await this.fetchByName.fetch({
			method:'get',
			url:`name/${this.value}`,
		})

		

		console.log( this.fetchByName.data[0])
/*
		this.countries=[
			...this.fetchByCode.data,
			...this.fetchByName.data
		]
*/		
	}
}

const contryStore = new CountryStore()

export default contryStore