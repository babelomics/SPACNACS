import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Paper } from '@material-ui/core';
// import { ToggleButton } from '@material-ui/lab';
import { AppBar, Tab, Tabs } from '@material-ui/core';

import uiFilters from './filtersDB';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

//==============================================================================
// TODO: put this somewhere else where it fits


// const SectionHeader = ({ filterId, filter, selected, selectEditor }) => {
// 	const { StatusIndicator } = filter;
// 	const onChange = _ => {
// 		selectEditor(selected ? "" : filterId);
// 	};
// 	return (
// 		<ToggleButton value={filterId} selected={selected} onClick={onChange} style={{ width: "8rem" }}>
// 			<StatusIndicator>
// 				{filter.label}
// 			</StatusIndicator>
// 		</ToggleButton>
// 	);
// };


//==============================================================================


// const style = {
// 	width: "4rem",
// 	flexShrink: 0,
// 	flexGrow: 0,
// 	overflowX: "hidden",
// 	background: "gray",
// };


// const filterPanelStyle = {
// 	transition: "width 150ms ease-in-out",
// 	flexShrink: 0,
// 	flexGrow: 0,
// 	background: "gray",
// };


const FilterTabLabel = ({ filter }) => {
	const StatusIndicator = filter.StatusIndicator;
	return (
		<React.Fragment>
			<span style={{paddingRight: 0}}>{filter.label}</span>
			<StatusIndicator/>
		</React.Fragment>
	);
};


const VariantFilterEditorBD = ({ activeEditor, selectEditor, numSamples }) => {
    const classes = useStyles();

/*	const onEditorChange = (_, value) => {
		if (activeEditor !== value) {
			selectEditor(value);
		}
	};

*/


	return (
		<div>
		<Paper style={{ margin: "0.5em" }}>
			{/*<AppBar position="static">
				<Tabs value={activeEditor} onChange={onEditorChange} scrollButtons="auto" variant="scrollable">
					{
                        Object.keys(uiFiltersShow).map(key =>
									<Tab key={key} label={<FilterTabLabel filter={uiFilters[key]}/>}
										 value={key} component="div"/>
						)
					}
				</Tabs>
			</AppBar>*/}
			{/*
                 Object.keys(uiFiltersShow).map(key => {
					const uiFilter = uiFilters[key];
					const Component = uiFilter.Component;
					return (
						<Collapse key={key} in={key === activeEditor} mountOnEnter unmountOnExit>
							<Component />
						</Collapse>
					);
				})
			*/}

			<div className={classes.root} >
                {
                    Object.keys(uiFilters).map(key => {
                        const uiFilter = uiFilters[key];
                        const Component = uiFilter.Component;
                        const sections = uiFilter.sections;
                        return (
							<Accordion>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon/>}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>{<FilterTabLabel
										filter={uiFilters[key]}/>}</Typography>
								</AccordionSummary>
								<AccordionDetails>
                                    {!!uiFilter.Component &&
									<Component />}

										<div >
											{!!sections && sections.map(k=>{
												const ComponentSection = k.Component;
												return(
														<div >
															{/*<Typography variant="subtitle2">{k.label}</Typography>*/}
															<ComponentSection/>
														</div>
													)
											})
											}

										</div>


								</AccordionDetails>
							</Accordion>
                        )
                    })
				}
			</div>
		</Paper>
			<Paper style={{ margin: "0.5em", marginTop:"15px", padding: "0.5em", }}>
			<Typography className={classes.heading}><b>Legend CNV / Gnomad / 1000GP:</b></Typography>
			<table style={{textAlign: "left"}}>
				<tr><td><div class='Legend'  style={{backgroundColor:"#ff2101"}}></div></td><td>DEL</td></tr>
				<tr><td><div class='Legend'  style={{backgroundColor:"#028401"}} ></div></td><td>DUP</td></tr>
				<tr><td><div class='Legend'  style={{backgroundColor:"#40E0D0"}} ></div></td><td>MCNVs</td></tr>
			</table>

		</Paper>
			<Paper style={{ margin: "0.5em", marginTop:"15px", padding: "0.5em", }}>
				<Typography className={classes.heading}><b>Legend regulatory regions:</b></Typography>
				<table style={{textAlign: "left"}}>
					<tr><td><div class='Legend' style={{backgroundColor:"#FF0000"}}></div></td><td>promoter</td></tr>
					<tr><td><div class='Legend' style={{backgroundColor:"#FF6969"}}></div></td><td>promoter_flanking_region</td></tr>
					<tr><td><div class='Legend' style={{backgroundColor:"#FACA00"}}></div></td><td>enhancer</td></tr>
					<tr><td ><div class='Legend' style={{backgroundColor:"#40E0D0"}}></div></td><td>ctcf_binding_site</td></tr>
					<tr><td ><div class='Legend' style={{backgroundColor:"#CD96CD"}}></div></td><td>tf_binding_site</td></tr>
					<tr><td ><div class='Legend' style={{backgroundColor:"#D9D9D9"}}></div></td><td>open_chromatin_region</td></tr>
				</table>

			</Paper>
			<Paper style={{ margin: "0.5em", marginTop:"15px", padding: "0.5em", }}>
				<Typography className={classes.heading}><b>Legend Clinvar:</b></Typography>
				<table style={{textAlign: "left"}}>
					<tr><td><div class='Legend' style={{backgroundColor:"#FF0000"}}></div></td><td >Pathogenic</td></tr>
					<tr><td><div class='Legend' style={{backgroundColor:"#FE8787"}} ></div></td><td>Likely pathogenic</td></tr>
					<tr><td><div class='Legend' style={{backgroundColor:"#91EE91"}}></div></td><td>Likely bening</td></tr>
					<tr><td><div class='Legend' style={{backgroundColor:"#028401"}}></div></td><td >Bening</td></tr>
					<tr><td><div class='Legend' style={{backgroundColor:"grey"}}></div></td><td>Others</td></tr>
				</table>
			</Paper>
		</div>


	);
};


VariantFilterEditorBD.propTypes = {
	activeEditor: PropTypes.string.isRequired,
	selectEditor: PropTypes.func.isRequired,
    numSamples: PropTypes.number
};


export default VariantFilterEditorBD;