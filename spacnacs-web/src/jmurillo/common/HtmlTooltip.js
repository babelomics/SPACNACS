import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 500,
        textAlign: "justify",
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        maxHeight: 400,
        overflowY: "auto"
    },
}))(Tooltip);



export default HtmlTooltip;