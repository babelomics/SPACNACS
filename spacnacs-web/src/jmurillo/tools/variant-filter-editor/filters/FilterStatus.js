import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';


const FilterStatus = ({ active, filterData, onRemove }) => {
	const onClick = !active ? () => {} : event => {
        event.stopPropagation();
		onRemove(filterData);
	};
	return (
		<IconButton disabled={ !active } onClick={ onClick } color="inherit">
			<CancelIcon />
		</IconButton>
	);
};


FilterStatus.propTypes = {
	active: PropTypes.bool.isRequired,
	filterData: PropTypes.any,
	onRemove: PropTypes.func.isRequired,
};


FilterStatus.defaultProps = {
	active: false,
	onRemove: () => {},
};


export default FilterStatus;
