import React from 'react';
import PropTypes from 'prop-types';
import {  Radio, FormControlLabel  } from '@material-ui/core';


const pipelines = [
    {
        id: "gridss",
        label: "Gridss",
    },
    {
        id: "manta",
        label: "Manta",
    },
];

const PipelineFilter = ({ filterPipeline, addFilterPipeline }) => {



    const handleChange = (event, checked) => {
        //if (!!checked) {
            addFilterPipeline(pipelines.find(s => s.id == event.target.value));
        /*} else {
            removeFilterSequencingTypes(sequencingTypes.find(s => s.id == event.target.value));
        }*/
    };
    function getIsChecked(id, filterPipeline) {
        return !!filterPipeline && filterPipeline.id == id;
    }

	return(<React.Fragment>
        {
            pipelines.map(pipeline => (
				<FormControlLabel
					key={pipeline.id}
					label={pipeline.label}
					control={
						<Radio value={pipeline.id}
								  checked={getIsChecked(pipeline.id, filterPipeline)}  onChange={handleChange}/>
                    }
				/>
            ))
        }
	</React.Fragment>)
};


PipelineFilter.propTypes = {
    filterPipeline: PropTypes.array.isRequired,
    addFilterPipeline: PropTypes.func.isRequired,
    //removeFilterPipeline: PropTypes.func.isRequired,
};


export default PipelineFilter;