import { connect } from 'react-redux';

import MenuBar from './MenuBar';
import ToolQuerist from '../state-querist';
import config from './../../../config'


const mapStateToProps = state => ({
    title2: ToolQuerist.name(state),
    title: !!config && !!config.cnv && config.cnv.title  || "PrioCNV"
});


export default connect(mapStateToProps)(MenuBar);