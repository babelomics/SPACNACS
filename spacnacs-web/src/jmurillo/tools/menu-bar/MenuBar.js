import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import logoBar from "../../../images/logo.svg";

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import HtmlTooltip from "./../../common/HtmlTooltip";
import Button from "@material-ui/core/es/Button/Button";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import MenuHelp from "./MenuHelp";
import config from "../../../config";


// dark mode
// import DarkModeToggle from "../../darkMode/DarkModeToggle";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    /*menuButton: {
        marginRight: theme.spacing(2),
    },*/
    title: {
        flexGrow: 1,
    },

    logo:{
        height: "3rem",
    },
	menuSummary:{
        paddingLeft :"1.5rem"
	},
	marginLogo:{
        paddingLeft: '12px',
        paddingRight: '12px',
	},
    marginTitle2:{
        paddingLeft: '30px',
        paddingRight: '30px',
    },
	toolBar:{
        color: "#fff",
        backgroundColor: "#3f51b5"
}
}));

const MenuBar = ({ title, title2 }) => {
    const classes = useStyles();

    return (<AppBar position="static">
		<Toolbar className={classes.toolBar}>
			<div className={classes.marginLogo}>
                 <HtmlTooltip title={config.cnv.shortTitle} >

					<Link to="/spacnacs/" style={{color: "white"}}>
						<img src={logoBar}
							 className={classes.logo}
							 alt="Logo Menu Bar"
						/>
					</Link>
				</HtmlTooltip>
			</div>


			<Typography variant="h5" color="inherit" noWrap>
				<div style={{color: "white"}}>{title}</div>
			</Typography>




			<Typography variant="h6" color="inherit" noWrap className={classes.marginTitle2} >
                {title2}
			</Typography>
			<div className={classes.title} />


			<MenuHelp/>

			{/*<DarkModeToggle />*/}
		</Toolbar>
	</AppBar>
	);
}

MenuBar.propTypes = {
    title2: PropTypes.string,
    nameUser: PropTypes.string,
    userId: PropTypes.string,
	title: PropTypes.string.isRequired,
	isLogged: PropTypes.bool,
	tools: PropTypes.array.isRequired,
	breadcrumbs: PropTypes.array.isRequired
};

MenuBar.defaultProps = {
    title2: "",
	title: "CNV",
	tools: [],
	breadcrumbs: []
};

export default MenuBar;
