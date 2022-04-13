import React from 'react';
import PropTypes from 'prop-types';
import {   FormControlLabel  } from '@material-ui/core';
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";


const genders = [
    {
        id: "XY",
        label: "Male",
    },
    {
        id: "XX",
        label: "Female",
    },

];


const GenderFilter = ({ filterGender, addFilterGender, removeFilterGender}) => {
    const handleChange = (event, checked) => {
        if (!!checked) {
            addFilterGender(genders.find(g => g.id === event.target.value));
        } else {
            removeFilterGender(genders.find(g => g.id === event.target.value));
        }
    };

    function getIsChecked(id, filterGender) {
        return !!filterGender.find(g => g.id === id);
    }
    return(<React.Fragment>
        <div>
            <div>
                <label style={{ color:"#666"}}>Gender:</label>
            </div>
            {
                genders.map(gender => (
				<FormControlLabel
					key={gender.id}
					label={gender.label}
					control={
						<Checkbox value={gender.id}
								  checked={getIsChecked(gender.id, filterGender)} onChange={handleChange}/>
                    }
				/>
            ))

        }
        </div>
	</React.Fragment>)
};


GenderFilter.propTypes = {
	filterGender: PropTypes.array.isRequired,
    addFilterGender: PropTypes.func.isRequired,
    removeFilterGender: PropTypes.func.isRequired,
};


export default GenderFilter;