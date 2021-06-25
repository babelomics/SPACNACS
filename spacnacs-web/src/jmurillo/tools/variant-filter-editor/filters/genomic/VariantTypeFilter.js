import React from 'react';
import PropTypes from 'prop-types';
import {  Checkbox, FormControlLabel  } from '@material-ui/core';

const variantTypes = [
	{
		id: "DUP",
		label: "Duplication",
	},
	{
		id: "DEL",
		label: "Deletion",
	},

];


const VariantTypeFilter = ({ filterVariantTypes, addFilterVariantTypes, removeFilterVariantTypes }) => {
    const handleChange = (event, checked) => {
        if (!!checked) {
            addFilterVariantTypes(event.target.value);
        } else {
            removeFilterVariantTypes(event.target.value);
        }
    };
	return(<React.Fragment>
        {
            variantTypes.map(variantType => (
				<FormControlLabel
					key={variantType.id}
					label={variantType.label}
					control={
						<Checkbox value={variantType.id}
								  checked={filterVariantTypes.includes(variantType.id)} onChange={handleChange}/>
                    }
				/>
            ))
        }
	</React.Fragment>)
};


VariantTypeFilter.propTypes = {
	filterVariantTypes: PropTypes.array.isRequired,
    addFilterVariantTypes: PropTypes.func.isRequired,
    removeFilterVariantTypes: PropTypes.func.isRequired,
};


export default VariantTypeFilter;