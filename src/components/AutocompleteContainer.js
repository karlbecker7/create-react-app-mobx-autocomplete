import React, {Component} from 'react'
import {observer} from 'mobx-react'
import Autocomplete from './Autocomplete'
import CountryStore from '../stores/CountryStore'
import {debounce} from 'lodash'

class AutocompleteContainer extends Component{
	handleChange = (value)=>{
		CountryStore.handleValueChange(value);
		this.fetchCountries();
	}

	fetchCountries=()=>{
		if(this.debounced)
			this.debounced.cancel();
		this.debounced = debounce(CountryStore.fetchCountries, 400);
		this.debounced();
	}

	render(){
		return(
			<Autocomplete 
				value={CountryStore.value}
				onChange={this.handleChange}
			/>
		)
	}
}
export default observer(AutocompleteContainer)