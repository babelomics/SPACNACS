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
import Alert from "@material-ui/lab/es/Alert/Alert";
import Chip from "@material-ui/core/es/Chip/Chip";
import HtmlTooltip from "../../common/HtmlTooltip";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from "@material-ui/core/es/IconButton/IconButton";

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




const ListFilters = ({filters, onRemoveFilter, onLocus}) => {
    const classes = useStyles();

/*	const onEditorChange = (_, value) => {
		if (activeEditor !== value) {
			selectEditor(value);
		}
	};

*/


	return (
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
            <Alert severity="info"><strong>Summary filters selected:</strong>
                {console.log("filters",filters)}
                {
                    filters.genomicRegions.map(f => {
                        return (
                            <span>
                                <IconButton color="primary" aria-label="upload picture" component="span" size="small" onClick={event => {onLocus(f)}}>
                                     <HtmlTooltip interactive title={
                                         <React.Fragment>
                                             Go to location: {f}
                                         </React.Fragment>}>
                                        <LocationOnIcon/>
                                    </HtmlTooltip>
                                </IconButton>
                                <Chip size="small" label={f} onDelete={event => {onRemoveFilter("genomicRegions", f)}}/>
                            </span>
                        )
                    })
                }
                {
                    filters.genes.map(term => {
                        let label = `${term.id}  ${term.name}`;
                        if (label.length > 50){
                            label = label.slice(0,50).concat("...");
                        }
                        let location = `${term.chromosome}:${term.start}-${term.end}`;
                        return (
                            <span>
                                <IconButton color="primary" aria-label="upload picture" component="span"  size="small" onClick={event => {onLocus(location)}}>
                                     <HtmlTooltip interactive title={
                                         <React.Fragment>
                                             Go to gen {term.id}  (Location: {location})
                                         </React.Fragment>}>
                                        <LocationOnIcon/>
                                    </HtmlTooltip>
                                </IconButton>
                                <HtmlTooltip interactive title={
                                    <React.Fragment>
                                        <ul>
                                            {!!term.id &&
                                            <li>ID: {term.id}</li>
                                            }
                                            {!!term.name &&
                                            <li>Name: {term.name}</li>
                                            }

                                            {!!term.description &&
                                            <li>
                                                {term.annotationField == "gene" && !!term.description &&
                                                <span>Synonyms: {term.description}</span>
                                                }
                                            </li>
                                            }
                                            <li>Location: {term.chromosome}:{term.start}-{term.end}</li>
                                        </ul>
                                    </React.Fragment>}>
                                    <Chip size="small" label={label} onDelete={event => {onRemoveFilter("genes", term)}}/>
                                </HtmlTooltip>
                            </span>
                        )
                    })
                }
                {
                    filters.variantTypes.map(f => {
                        return (
                            <Chip size="small" label={f} onDelete={event => {onRemoveFilter("variantTypes", f)}}/>
                        )
                    })
				}
                {
                   filters.clinvars.map(f => {
                       return (
                           <Chip size="small" label={f} onDelete={event => {onRemoveFilter("clinvars", f)}}/>
                       )
                    })
                }
                {
                    filters.phenotypes.map(term => {
                        let label = `${term.id}  ${term.name}`;
                        if (label.length > 50){
                            label = label.slice(0,50).concat("...");
                        }
                        return (
                            <span>
                                <HtmlTooltip interactive title={
                                    <React.Fragment>
                                        <ul>
                                            {!!term.id &&
                                            <li>ID: {term.id}</li>
                                            }
                                            {!!term.name &&
                                            <li>Name: {term.name}</li>
                                            }

                                            {!!term.description &&
                                            <li>
                                                {term.annotationField == "gene" &&
                                                <span>Synonyms: {term.description}</span>
                                                }
                                                {term.annotationField != "gene" &&
                                                <span>Description: {term.description}</span>
                                                }

                                            </li>
                                            }
                                        </ul>
                                    </React.Fragment>}>
                                    <Chip size="small"
                                        label={label}
                                        onDelete={event => {
                                            onRemoveFilter("phenotypes", term);
                                        }}

                                    />
                                </HtmlTooltip>
                            </span>
                        )
                    })
                }
                {
                    filters.populationFrequency.map(f => {
                        let label = `${f.population} frequency: `;
                        if (f.min != undefined && f.min != "")
                            label = label + `${f.min}`;
                        else
                            label = label + `0`;
                        label = label + "-";
                        if (f.max != undefined && f.max != "")
                            label = label + `${f.max}`;
                        else
                            label = label + `1`;


                        return (
                            <Chip size="small" label={label} onDelete={event => {onRemoveFilter("populationFrequency", f)}}/>
                        )
                    })
                }

                {
                    filters.phenotypesSamples.map(term => {
                        let label = `Hpo sample: ${term.id}  ${term.name}`;
                        if (label.length > 50){
                            label = label.slice(0,50).concat("...");
                        }
                        return (
                            <span>
                                <HtmlTooltip interactive title={
                                    <React.Fragment>
                                        <div>
                                            <span>Hpo sample:</span>
                                            <ul>
                                                {!!term.id &&
                                                <li>ID: {term.id}</li>
                                                }
                                                {!!term.name &&
                                                <li>Name: {term.name}</li>
                                                }

                                                {!!term.description &&
                                                <li>
                                                    <span>Description: {term.description}</span>
                                                </li>
                                                }
                                            </ul>
                                        </div>
                                    </React.Fragment>}>
                                    <Chip size="small"
                                          label={label}
                                          onDelete={event => {
                                              onRemoveFilter("samples.phenotypes", term);
                                          }}
                                    />
                                </HtmlTooltip>
                            </span>
                        )
                    })
                }
                {
                   filters.genders.map(f => {
                        return (
                            <Chip size="small" label={f.label} onDelete={event => {onRemoveFilter("genders", f)}}/>
                        )
                    })
                }
                {
                    !!filters.subpopulations && filters.subpopulations.length > 0 &&
                        <span>
                             <HtmlTooltip interactive title={
                                 <React.Fragment>
                                     <ul>
                                     {filters.subpopulations.map(f => {
                                       return(  <li>
                                             {f.label}
                                         </li>)
                                     })}
                                     </ul>
                                 </React.Fragment>}>
                                    <Chip size="small"
                                          label="Subgroup"
                                          onDelete={event => {
                                              onRemoveFilter("subpopulations", "");
                                          }}
                                    />
                                </HtmlTooltip>
                        </span>
                }
            </Alert>
		</Paper>
	);
};


ListFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    onRemoveFilter: PropTypes.func.isRequired,
    onLocus: PropTypes.func.isRequired
};


export default ListFilters;