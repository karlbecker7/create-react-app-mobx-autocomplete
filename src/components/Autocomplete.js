import React, {PropTypes} from 'react'

const Autocomplete = props => (
	<div>
		<input type="text"
			onChange={e=>props.onChange(e.target.value)}
			value={props.value}
		/>

		<ul>
			{props.countries && props.countries.map(country=>{
				<li key={country.alpah2Code}>
					{country.name}
				</li>
			})}
		</ul>
	</div>
)


Autocomplete.propTypes = {
	value: PropTypes.string,
 	onChange: PropTypes.func.isRequired,
    countries: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    alpha2Code: PropTypes.string.isRequired,
   }))
}

export default Autocomplete