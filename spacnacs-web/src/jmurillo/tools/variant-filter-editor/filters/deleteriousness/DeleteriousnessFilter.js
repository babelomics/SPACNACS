import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';

import MenuBar from './MenuBar';
import ConnSiftFilter from './ConnSiftFilter';
import ConnPolyphenFilter from './ConnPolyphenFilter';
import ConnCaddFilter from './ConnCaddFilter';


const DeleteriousnessFilter = props => (
	<React.Fragment>
		<MenuBar />
		<Collapse in={"sift" === props.activeSubfilter} mountOnEnter unmountOnExit>
			<ConnSiftFilter />
		</Collapse>
		<Collapse in={"polyphen" === props.activeSubfilter} mountOnEnter unmountOnExit>
			<ConnPolyphenFilter />
		</Collapse>
		<Collapse in={"cadd" === props.activeSubfilter} mountOnEnter unmountOnExit>
			<ConnCaddFilter />
		</Collapse>
	</React.Fragment>
);


DeleteriousnessFilter.propTypes = {
	activeSubfilter: PropTypes.string.isRequired,
};


export default DeleteriousnessFilter;