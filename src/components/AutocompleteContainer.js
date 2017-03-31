import React, {Component} from 'react'
import {observer} from 'mobx-react'
import Autocomplete from './Autocomplete'
import CountryStore from '../stores/CountryStore'

class AutocompleteContainer extends Component{
	handleChange = (value)=>{
		CountryStore.handleValueChange(value)
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