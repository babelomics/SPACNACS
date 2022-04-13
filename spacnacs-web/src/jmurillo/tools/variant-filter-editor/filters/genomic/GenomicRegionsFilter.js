import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import { Chip, IconButton, FormControl, FormLabel, withStyles, Paper, InputBase } from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
import HtmlTooltip from "./../../../../common/HtmlTooltip";
import Box from '@material-ui/core/Box';


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
        paddingLeft: theme.spacing(1),
        //paddingRight: theme.spacing(1),
        flex: 1,
    },
    textPaper: {
        //margin: theme.spacing(1),
        display: "flex",
       // flex: 1,
        alignItems: "center",
		width:"100%"

    },
});

const Region = ({ region, onDelete }) => {
	const label = `${region.chromosome}:${region.start || 0}-${region.end || "-"}`;
	return (
		<Chip  size="small" onDelete={() => { onDelete(region); }} label={label} />
	);
};

class GenomicRegionsFilter extends React.Component {

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
		this.removeTerm = this.removeTerm.bind(this);
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
        this.setState({ ...this.state,
			region: value,
            message: ""
        });
    }
	onAddRegion(event) {
        const chromosome = this.state.region.split(":")[0];
        const start = this.state.region.split(":").length> 1 ? this.state.region.split(":")[1].split("-")[0]: -1;
        const end = this.state.region.split(":").length> 1 ? this.state.region.split(":")[1].split("-")[1]: -1;
        this.setState({ ...this.state,
            chromosome: chromosome,
            start: start,
            end: end});

		/*const region = {
			chromosome: this.state.chromosome,
			start: this.state.start,
			end: this.state.end,
		};*/

        if (this.isValid()){
            this.props.addGenomicRegion(this.state.region);
            this.setState({ ...this.state,
            			region: "",
                        message: ""
                    });
		} else {
            this.setState({ ...this.state,
                message: "Invalid region."});
		}

	}

    removeTerm(term){
        console.log(term);
        if (term.annotationField == "all")
            term.searchText = "";
        this.props.removeGenomicRegion(term.constructor.name == "Array" ? term[0] : term);
    }

    onClearRegion(event){
        this.setState({...this.state , region: "", chromosome: "",
            start: 0,
            end: 0,
            error: false,
            message: ""});
	}

	isValid() {
        const region = this.state.region;

        const chromosome = region.split(":")[0];
        const start = region.split(":").length> 1 ? region.split(":")[1].split("-")[0] : -1;
        const end = region.split(":").length> 1 ? region.split(":")[1].split("-")[1]: -1;
        this.setState({ ...this.state,
            chromosome: chromosome,
            start: start,
            end: end});


		const chromosomePattern = /^(chr)?(1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|x|y|mt)$/;

		const integerPattern = /^[0-9]+$/;

		if (!chromosome)
			return false;
		if (!chromosomePattern.test(chromosome.toLowerCase().trim()))
			return false;

        if (start == undefined || end == undefined)
        	return false;

		if (start != -1 && !integerPattern.test(start.trim()))
			return false;

		if (end != -1 &&  !integerPattern.test(end.trim()))
			return false;

		if (start != -1 && end != -1 && parseInt(start) > parseInt(end))
			return false;

		return true;

	}

	render() {
        const { classes } = this.props;
		return (
		    <div>
                <label style={{ color:"#666"}}>Region:</label>
                        {!!this.props && !!this.props.regions && this.props.regions.length > 0 &&
                            <Box component="span" m={0.5}>
                            <Chip  size="small"
                                   label={this.props.regions}
                                   onDelete={event => {
                                       this.removeTerm(this.props.regions);
                                   }}
                            />
                            </Box>
                        }
                <FormControl >
                    <FormGroup row>




                        <Paper className={classes.textPaper}>
                            <InputBase className={classes.textInput} placeholder="1:1-10000" value={this.state.region}
                                       onChange={this.onRegionChange}   error={!this.isValid.bind(this)} />
                            <IconButton aria-label="search" onClick={this.onAddRegion} disabled={!this.isValid.bind(this)}  size="large">
                                <CheckCircleIcon  size="small"/>
                            </IconButton>
                            <IconButton type="submit"  aria-label="clear"  onClick={this.onClearRegion} size="small" >
                                <ClearIcon  size="small"/>
                            </IconButton>
                        </Paper>


                        {/*<TextField inputProps={{ maxLength: 22}}
                                   label="" value={this.state.region}  onChange={this.onRegionChange}
                                   variant="outlined"  size="small" margin="dense"  placeholder="1:1-10000"
                                   error={!this.isValid.bind(this)} />*/}

                        {/*<TextField inputProps={{ maxLength: 2}} label="chromosome" value={this.state.chromosome} onChange={this.onChromosomeChange} margin="small" error={!this.isValid.bind(this)} />
                        <TextField inputProps={{ maxLength: 9}} label="start" value={this.state.start} onChange={this.onStartChange} margin="small" error={!this.isValid.bind(this)} />
                        <TextField inputProps={{ maxLength: 9}} label="end" value={this.state.end} onChange={this.onEndChange} margin="small" error={!this.isValid.bind(this)} />*/}
                        {/*<IconButton onClick={this.onAddRegion} disabled={!this.isValid.bind(this)}>
                            <CheckCircleIcon />
                        </IconButton>
                        <IconButton onClick={this.onClearRegion} >
                            <ClearIcon />
                        </IconButton>*/}
                        <p style={{color:"#f44336"}}>{this.state.message}</p>
                    </FormGroup>
                    <div>
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
			</div>
		);
	}
}


GenomicRegionsFilter.propTypes = {
	regions: PropTypes.array,
	addGenomicRegion: PropTypes.func.isRequired,
	removeGenomicRegion: PropTypes.func.isRequired,
};


export default withStyles(styles)(GenomicRegionsFilter);