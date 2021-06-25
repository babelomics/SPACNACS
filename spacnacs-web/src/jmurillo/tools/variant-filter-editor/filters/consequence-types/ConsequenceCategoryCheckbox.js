import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@material-ui/core';

const ConsequenceCategoryCheckbox = ({ checked, indeterminate, onChange }) => (
	<Checkbox
		checked={!!checked}
		indeterminate={!!indeterminate}
		onChange={onChange}
		color="primary" />
);


ConsequenceCategoryCheckbox.propTypes = {
	checked: PropTypes.bool,
	indeterminate: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
};


export default ConsequenceCategoryCheckbox;