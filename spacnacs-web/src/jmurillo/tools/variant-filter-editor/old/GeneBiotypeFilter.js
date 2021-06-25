import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';

import { Chip, IconButton, InputLabel, FormControl, FormLabel, MenuItem, Select } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const geneBiotypes = {
	"3prime_overlapping_ncrna": {
	},
	"antisense": {
	},
	"IG_C_gene": {
	},
	"IG_C_pseudogene": {
	},
	"IG_D_gene": {
	},
	"IG_J_gene": {
	},
	"IG_J_pseudogene": {
	},
	"IG_V_gene": {
	},
	"IG_V_pseudogene": {
	},
	"lincRNA": {
	},
	"miRNA": {
	},
	"misc_RNA": {
	},
	"Mt_rRNA": {
	},
	"Mt_tRNA": {
	},
	"non_stop_decay": {
	},
	"nonsense_mediated_decay": {
	},
	"polymorphic_pseudogene": {
	},
	"processed_pseudogene": {
	},
	"processed_transcript": {
	},
	"protein_coding": {
	},
	"pseudogene": {
	},
	"retained_intron": {
	},
	"rRNA": {
	},
	"sense_intronic": {
	},
	"sense_overlapping": {
	},
	"snoRNA": {
	},
	"snRNA": {
	},
	"TR_C_gene": {
	},
	"TR_D_gene": {
	},
	"TR_J_gene": {
	},
	"TR_J_pseudogene": {
	},
	"TR_V_gene": {
	},
	"TR_V_pseudogene": {
	},
	"transcribed_processed_pseudogene": {
	},
	"transcribed_unprocessed_pseudogene": {
	},
	"translated_processed_pseudogene": {
	},
	"unitary_pseudogene": {
	},
	"unprocessed_pseudogene": {
	},
};


class GeneBiotypeAdder extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: undefined,
		};
		this.onChange = this.onChange.bind(this);
		this.onAddBiotype = this.onAddBiotype.bind(this);
	}

	onChange(event) {
		this.setState({
			...this.state,
			selected: event.target.value,
		});
	}

	onAddBiotype(event) {
		this.props.setFilterGeneBiotypes([...this.props.filterGeneBiotypes, this.state.selected]);
		this.setState({
			...this.state,
			selected: undefined,
		});
	}

	render() {
		return (
			<FormGroup row>
				<InputLabel htmlFor="gene-biotype-adder">Add gene biotype:</InputLabel>
				<Select value={this.state.selected} onChange={this.onChange} inputProps={{ id: 'gene-biotype-adder' }} fullWidth>
					{
						Object.keys(geneBiotypes).filter(geneBiotypeId => (!this.props.filterGeneBiotypes.includes(geneBiotypeId))).map(geneBiotypeId => (
							<MenuItem key={geneBiotypeId} value={geneBiotypeId}>{geneBiotypeId}</MenuItem>
						))
					}
				</Select>
				<IconButton onClick={this.onAddBiotype} disabled={!this.state.selected}>
					<CheckCircleIcon />
				</IconButton>
			</FormGroup>
		);
	}
}


const GeneBiotypeFilter = ({ geneBiotypes, setGeneBiotypes }) => (
	<FormControl>
		<FormLabel>Gene biotype</FormLabel>
		<FormGroup row>
			<GeneBiotypeAdder filterGeneBiotypes={geneBiotypes} setFilterGeneBiotypes={setGeneBiotypes} />
		</FormGroup>
		<div>
			{
				geneBiotypes.map(filterBiotypeId => {
					const onRemove = () => {
						setGeneBiotypes(geneBiotypes.filter(biotype => biotype !== filterBiotypeId));
					};
					// const filterGeneBiotype = geneBiotypes[filterBiotypeId];
					// TODO: replace with biotype label
					// const label = (!!filterGeneBiotype && filterGeneBiotype.id) || geneBiotype.id;
					const label = filterBiotypeId;
					return (
						<Chip onDelete={onRemove} label={label} />
					);
				})
			}
		</div>
	</FormControl>
);


GeneBiotypeFilter.propTypes = {
	geneBiotypes: PropTypes.array.isRequired,
	setGeneBiotypes: PropTypes.func.isRequired,
};


export default GeneBiotypeFilter;