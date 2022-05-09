import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Paper } from '@material-ui/core';
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
import Chip from "@material-ui/core/es/Chip/Chip";
import HtmlTooltip from "../../common/HtmlTooltip";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import SequencingTypeFilter from "../variant-filter-editor/filters/genomic/SequencingTypeFilter";
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    gridFilter:{
        backgroundColor: '#E8F4FD',
        borderRadius: "4px"
    },
    gridFilterIcon:{
        color: '#2196f3'
    }
}));

//==============================================================================


const ListFilters = ({filters, onRemoveFilter, onLocus, locusVariantActual}) => {
    const classes = useStyles();

/*	const onEditorChange = (_, value) => {
		if (activeEditor !== value) {
			selectEditor(value);
		}
	};

*/

	return (
		<Paper style={{ margin: "0.5em", padding: '0.5em',  }}>
            <Grid container direction="row" alignItems="center" spacing={2} className={classes.gridFilter} >
              <Grid item>
                 <InfoOutlined className={classes.gridFilterIcon} />
              </Grid>
              <Grid item>
               <strong> Summary filters selected: </strong>
              </Grid>
              <Grid item>
                {
                    filters.genomicRegions.map(f => {
                        return (
                           <Box component="span" m={0.5}>
                                <IconButton color="primary" aria-label="Go to" component="span" size="small" onClick={event => {onLocus(f, locusVariantActual)}}>
                                     <HtmlTooltip interactive title={
                                         <React.Fragment>
                                             Go to location: {f}
                                         </React.Fragment>}>
                                        <LocationOnIcon />
                                    </HtmlTooltip>
                                </IconButton>
                                <Chip size="small" label={f} onDelete={event => {onRemoveFilter("genomicRegions", f)}}/>
                            </Box>
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
                            <Box component="span" m={0.5}>
                                <IconButton color="primary" aria-label="upload picture" component="span"  size="small" onClick={event => {onLocus(location, locusVariantActual)}}>
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
                                            <li>Gene: {term.id}</li>
                                            }
                                            {!!term.name &&
                                            <li>Name: {term.name}</li>
                                            }

                                            {!!term.description &&
                                            <li>
                                                {term.annotationField === "gene" && !!term.description &&
                                                <span>Synonyms: {term.description}</span>
                                                }
                                            </li>
                                            }
                                            <li>Location: {term.chromosome}:{term.start}-{term.end}</li>
                                        </ul>
                                    </React.Fragment>}>
                                    <Chip size="small" label={label} onDelete={event => {onRemoveFilter("genes", term)}}/>
                                </HtmlTooltip>
                            </Box>
                        )
                    })
                }
                {
                    filters.variantTypes.map(f => {
                        return (
                            <Box component="span" m={0.5}>
                                <Chip size="small" label={f} onDelete={event => {onRemoveFilter("variantTypes", f)}} />
                            </Box>
                        )
                    })
                }
                {
                   filters.clinvars.map(f => {
                       return (
                            <Box component="span" m={0.5}><Chip size="small" label={f} onDelete={event => {onRemoveFilter("clinvars", f)}}/></Box>
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
                            <Box component="span" m={0.5}>
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
                                                {term.annotationField === "gene" &&
                                                <span>Synonyms: {term.description}</span>
                                                }
                                                {term.annotationField !== "gene" &&
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
                            </Box>
                        )
                    })
                }
                {
                    filters.populationFrequency.map(f => {
                        let label = `${f.population} frequency: `;
                        if (f.min !== undefined && f.min !== "")
                            label = label + `${f.min}`;
                        else
                            label = label + `0`;
                        label = label + "-";
                        if (f.max !== undefined && f.max !== "")
                            label = label + `${f.max}`;
                        else
                            label = label + `1`;


                        return (
                            <Box component="span" m={0.5}><Chip size="small" label={label} onDelete={event => {onRemoveFilter("populationFrequency", f)}}/></Box>
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
                           <Box component="span" m={0.5}>
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
                            </Box>
                        )
                    })
                }
                {
                   filters.genders.map(f => {
                        return (
                            <Box component="span" m={0.5}><Chip size="small" label={f.label} onDelete={event => {onRemoveFilter("genders", f)}}/></Box>
                        )
                    })
                }
                {
                    !!filters.subpopulations && filters.subpopulations.length > 0 &&
                        <Box component="span" m={0.5}>
                             <HtmlTooltip interactive title={
                                 <React.Fragment>
                                     <ul>
                                     {filters.subpopulations.map(f => {
                                       return(  <li>
                                             {f.label || ""}
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
                        </Box>
                }

                {
                    !!filters.sequencingTypes && filters.sequencingTypes.map(s => {
                        return (
                    <Box component="span" m={0.5}><Chip size="small" label={s.label} onDelete={event => {onRemoveFilter("sequencingTypes", s)}}/></Box>
                )
                })
                }

                {
                    !!filters.pipeline  &&
                    <span>
                    <HtmlTooltip interactive title="Pipeline">
                        <Box component="span" m={0.5}><Chip size="small" label={filters.pipeline.label} onDelete={event => {onRemoveFilter("pipeline", filters.pipeline)}}/></Box>
                    </HtmlTooltip>
                    </span>
                }

              </Grid>
        </Grid>
	</Paper>
	);
};


ListFilters.propTypes = {
    filters: PropTypes.object.isRequired,
    locusVariantActual: PropTypes.string,
    onRemoveFilter: PropTypes.func.isRequired,
    onLocus: PropTypes.func.isRequired
};


export default ListFilters;