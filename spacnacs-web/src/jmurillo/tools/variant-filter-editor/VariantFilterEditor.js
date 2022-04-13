import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Paper } from '@material-ui/core';
// import { ToggleButton } from '@material-ui/lab';
import { AppBar, Tab, Tabs } from '@material-ui/core';

import uiFilters from './filters';


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


const VariantFilterEditor = ({ activeEditor, selectEditor, numSamples }) => {
	const onEditorChange = (_, value) => {
		if (activeEditor !== value) {
			selectEditor(value);
		}
	};

    let uiFiltersShow ={};
    let selectNewActive = false;

    if (!!uiFilters) {
        Object.keys(uiFilters).map(key => {
        	let f= uiFilters[key];

            if (!f.hasOwnProperty("showNumSample"))
                uiFiltersShow[key] = f;

            if (!!f.hasOwnProperty("showNumSample") && f.showNumSample === 1 && numSamples === 1)
                uiFiltersShow[key] = f;

            if (!!f.hasOwnProperty("showNumSample") && f.showNumSample === 2 && numSamples >= 2)
                uiFiltersShow[key] = f;

            if (key === activeEditor && !uiFiltersShow.hasOwnProperty(key))
                selectNewActive = true;
        });
    }

    if (selectNewActive && Object.keys(uiFiltersShow).length > 0){
        selectEditor(Object.keys(uiFiltersShow)[0]);
	}

	return (
		<Paper style={{ margin: "1em" }}>
			<AppBar position="static">
				<Tabs value={activeEditor} onChange={onEditorChange} scrollButtons="auto" variant="scrollable">
					{
                        Object.keys(uiFiltersShow).map(key =>
									<Tab key={key} label={<FilterTabLabel filter={uiFilters[key]}/>}
										 value={key} component="div"/>
						)
					}
				</Tabs>
			</AppBar>
			{
                 Object.keys(uiFiltersShow).map(key => {
					const uiFilter = uiFilters[key];
					const Component = uiFilter.Component;
					return (
						<Collapse key={key} in={key === activeEditor} mountOnEnter unmountOnExit>
							<Component />
						</Collapse>
					);
				})
			}
		</Paper>
	);
};


VariantFilterEditor.propTypes = {
	activeEditor: PropTypes.string.isRequired,
	selectEditor: PropTypes.func.isRequired,
    numSamples: PropTypes.number
};


export default VariantFilterEditor;