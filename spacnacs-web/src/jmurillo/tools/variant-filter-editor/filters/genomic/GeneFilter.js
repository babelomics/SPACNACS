import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { Chip, IconButton, FormControl, FormLabel, withStyles, Paper, InputBase } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        //padding: theme.spacing(1),
        backgroundColor: "#fcf9f9",
        //width: "100%",
        //	margin:"1rem"
    },
    container: {
        //padding: theme.spacing(1),
        display: "flex",
        alignItems: "center",
    },
    textInput: {
        //paddingTop: theme.spacing(0.5),
        //paddingBottom: theme.spacing(0.5),
        //paddingLeft: theme.spacing(1),
        //paddingRight: theme.spacing(1),
        flex: 1,
    },
    textPaper: {
        //margin: theme.spacing(1),
        display: "flex",
        // flex: 1,
        alignItems: "center",
        paddingLeft: "15px"
    },
});

const Region = ({ region, onDelete }) => {
	const label = `${region.chromosome}:${region.start || 0}-${region.end || "-"}`;
	return (
		<Chip  size="small" onDelete={() => { onDelete(region); }} label={label} />
	);
};

class GeneFilter extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			chromosome: "",
			start: 0,
			end: 0,
			region:"",
			error: false,
			message: "",
		};
        /*this.onChromosomeChange = this.onChromosomeChange.bind(this);
		this.onStartChange = this.onStartChange.bind(this);
		this.onEndChange = this.onEndChange.bind(this);*/

		this.onRegionChange = this.onRegionChange.bind(this);
		this.onAddRegion = this.onAddRegion.bind(this);
		this.onClearRegion = this.onClearRegion.bind(this);
	}
	/*
	onChromosomeChange(event) {
		const value = event.target.value;
		this.setState({ ...this.state, chromosome: value });
	}

	onStartChange(event) {
		const value = event.target.value;
		this.setState({ ...this.state, start: value });

	}

	onEndChange(event) {
		const value = event.target.value;
		this.setState({ ...this.state, end: value });
	}
	*/

    onRegionChange(event) {
        const value = event.target.value;
        this.setState({ ...this.state, region: value
        });
    }
	onAddRegion(event) {
        const chromosome = this.state.region.split(":")[0];
        const start = this.state.region.split(":")[1].split("-")[0];
        const end = this.state.region.split(":")[1].split("-")[1];
        this.setState({ ...this.state,
            chromosome: chromosome,
            start: start,
            end: end});

		const region = {
			chromosome: this.state.chromosome,
			start: this.state.start,
			end: this.state.end,
		};
		this.props.addGenomicRegion(region);
	}
    onClearRegion(event){
		console.log(this)
        this.setState({...this.state , region: "", chromosome: "",
            start: 0,
            end: 0,
            error: false,
            message: ""});
	}

	isValid() {
        const region = this.state.region;

        const chromosome = region.split(":")[0];
        const start = region.split(":")[0].split("-")[0];
        const end = region.split(":")[0].split("-")[1];
        this.setState({ ...this.state,
            chromosome: chromosome,
            start: start,
            end: end});


        //const region = this.state.region;
	//	const chromosome = this.state.chromosome;
//		const start = this.state.start;
//		const end = this.state.end

		const chromosomePattern = /[1-2]+[1-9]+[X|Y|MT]+/;
		const integerPattern = /[0-9]+/;

		if (!chromosome) {
			return false;
		} else if (chromosomePattern.test(chromosome.trim())) {
			return false;
		} else if (!!start || !!end) {
			if (!start) {
				return false;
			} else if (!end) {
				return false;
			} else if (!integerPattern.test(start.trim())) {
				return false;
			} else if (!integerPattern.test(end.trim())) {
				return false;
			} else if (parseInt(start) > parseInt(end)) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	}

	render() {
        const { classes } = this.props;

        return (
			<FormControl style={{ padding:"0px", margin:"0px"}} >
				<FormGroup row style={{ padding:"0px", margin:"0px"}}>
					<label style={{ color:"#666"}}>Gene:</label>

					<Paper className={classes.textPaper} style={{width:"100%"}}>
						<InputBase className={classes.textInput} placeholder="PPL"  value={this.state.region}
								   onChange={this.onRegionChange}   error={!this.isValid.bind(this)} />

						<IconButton type="submit"  aria-label="clear"  onClick={this.onClearRegion} size="small" >
							<ClearIcon  size="small"/>
						</IconButton>
					</Paper>
					<p>{this.state.message}</p>
				</FormGroup>
				<div style={{ padding:"0px", margin:"0px"}}>
					{/*
						!!this.props.regions && this.props.regions.map(region => {
							const onRemove = () => {
								//this.props.setRegions(this.props.regions.filter(r => r !== region));
								this.props.removeGenomicRegion(region);
							};
							return (
								<Region key={region} region={region} onDelete={onRemove} />
							);
						})
					*/}
				</div>
			</FormControl>
		);
	}
}


GeneFilter.propTypes = {
	regions: PropTypes.array,
	addGenomicRegion: PropTypes.func.isRequired,
	removeGenomicRegion: PropTypes.func.isRequired,
};


export default withStyles(styles)( GeneFilter);