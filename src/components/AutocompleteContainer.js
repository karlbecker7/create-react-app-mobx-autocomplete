import React from 'react'
import {observer} from 'mobx-react'
import Autocomplete from './Autocomplete'
import CountryStore from '../stores/CountryStore'


const AutocompleteContainer=()=>(
	<div>
		SelectedCountry: {CountryStore.selectedCountry.name}
		<Autocomplete
			fetching={CountryStore.fetchByCode.fetching || CountryStore.fetchByName.fetching}
			fetch={CountryStore.fetchCountries}
			onSelect={CountryStore.handleSelectCountry}
			value={CountryStore.value}
			results={CountryStore.countries.map(country=>({
				label:country.name,
				value:country.alpha2Code
			}))}
		/>
	</div>
)
export default observer(AutocompleteContainer)