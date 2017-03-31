import { extendObservable } from 'mobx'
import axios from 'axios'

class Fetch{
	constructor(){
		extendObservable(this,{
			fetching:false,
			response:null,
			data:null,
			error:null
		})
	}

	fetch = (params=>{
		this.fetching = true
		return axios.request({
			method: params.method || 'get',
			url:`https://restcountries.eu/rest/v2/${params.url}`,
			params: params.query,
			data:params.body,
			headers:params.headers
		}).then(response=>{			
			this.fetching = false
			this.response = response
			this.data = response.data			
			this.error = null
			return response.data
		}).catch(error=>{
			this.fetching=false
			this.response=error.response || error
			this.error = error.response? error.response.data:error
		})
	})

}

export default Fetch