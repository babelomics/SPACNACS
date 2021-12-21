import React from 'react';
import PropTypes from 'prop-types';
import {  Checkbox, FormControlLabel  } from '@material-ui/core';


const sequencingTypes = [
    {
        id: "E",
        label: "Exome",
    },
    {
        id: "G",
        label: "Genome",
    },

];

const SequencingTypeFilter = ({ filterSequencingTypes, addFilterSequencingTypes, removeFilterSequencingTypes }) => {



    const handleChange = (event, checked) => {
        if (!!checked) {
            addFilterSequencingTypes(sequencingTypes.find(s => s.id == event.target.value));
        } else {
            removeFilterSequencingTypes(sequencingTypes.find(s => s.id == event.target.value));
        }
    };
    function getIsChecked(id, sequencingTypes) {
        return !!sequencingTypes.find(s => s.id == id);
    }

	return(<React.Fragment>
        {
            sequencingTypes.map(sequencingType => (
				<FormControlLabel
					key={sequencingType.id}
					label={sequencingType.label}
					control={
						<Checkbox value={sequencingType.id}
								  checked={getIsChecked(sequencingType.id, filterSequencingTypes)}  onChange={handleChange}/>
                    }
				/>
            ))
        }
	</React.Fragment>)
};


SequencingTypeFilter.propTypes = {
	filterSequencingTypes: PropTypes.array.isRequired,
    addFilterSequencingTypes: PropTypes.func.isRequired,
    removeFilterSequencingTypes: PropTypes.func.isRequired,
};


export default SequencingTypeFilter;