import React, {Component, PropTypes} from 'react'
import Block from 'jsxstyle/Block'
import {debounce} from 'lodash'


class Autocomplete extends Component{

	state={
		value:'',
		selectedValue:{},
		showResults:false
	}

	static propTypes={
		fetching: PropTypes.bool,
		fetch:PropTypes.func.isRequired,
		onSelect:PropTypes.func.isRequired,
		value:PropTypes.string,
		results:PropTypes.arrayOf(PropTypes.shape({
			label:PropTypes.string.isRequired,
			value:PropTypes.string.isRequired			
		}))		
		
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.results !== this.props.results){
			this.setState({
				showResults: true
			})
		}
	}

	handleChange=value=>{
		this.setState({
			value,
			showResults:false
		})

		this.fetch(value);
	}

	fetch = value=>{
		if( this.debounced  ){
			this.debounced .cancel();
		}
		this.debounced  = debounce (()=>this.props.fetch(value), 300)
		this.debounced()
	}

	handleSelectValue = selectedValue=>{
		this.setState({
			selectedValue,
			value:selectedValue.label
		})
		this.props.onSelect(selectedValue);
	}

	render(){
		return(
			<div>
				<Block position="relative">
					<input
						style={{
							width:'100%'
						}}
						className="form-control"
						type="text"
						onChange={(e)=>this.handleChange(e.target.value)}
						value={this.state.value}
						disabled={this.props.fetching}
					/>
					{this.props.fetching && (
						<Block
							position="absolute"
							right={5}
							top={7}
						>
						</Block>
					)}
				</Block>

				{!this.props.fetching && this.state.showResults && (
					<div className="list-group">
						{this.props.results && this.props.results.map((result, index)=>(
							<a
								key={result.value}
								href="#"
								className="list-group-item"
								onClick={()=>this.handleSelectValue(result)}
							>
								{result.label}
							</a>
						))}
					</div>
				)}
			</div>
		)
	}

}

export default Autocomplete