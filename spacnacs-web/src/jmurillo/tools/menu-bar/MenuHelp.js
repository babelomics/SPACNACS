import React from "react";
import Button from "@material-ui/core/es/Button/Button";
import Menu from "@material-ui/core/es/Menu/Menu";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import IconHelp from '@material-ui/icons/Help';
import IconDescription from '@material-ui/icons/Description';
import IconCode from '@material-ui/icons/GitHub';
import IconCite from '@material-ui/icons/FormatQuote';
import IconVersion from '@material-ui/icons/Storage';
import IconContact from '@material-ui/icons/Mail';
import Modal from "@material-ui/core/es/Modal/Modal";
import Popover from "@material-ui/core/es/Popover/Popover";
import config from "../../../config";

const useStyles = makeStyles((theme) => ({
    menu:{
        '& .MuiListItem-root': {
            paddingRight:"1em",
            paddingLeft:"1em",
            paddingTop:"0.25em",
            paddingBottom:"0.25em",
			//backgroundColor:"red",
			width:"100%",
			textAlign:"right",
            fontFamily: "Open Sans, sans-serif",
			color: "#444",
		},
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },

    },
	link:{
    	textDecoration:"none",
		color:"#444"
	},
    info:{
        padding: "2em 3em 2em 3em",
        backgroundColor: "white",
        color:"#444",
        maxWidth:"550px",
        fontSize:"large",
        textAlign:"justify"
    },
    tableVersion: {
        border: "1px solid #ddd",
        //font-family: Arial, Helvetica, sans-serif;
        borderCollapse: "collapse",
    },
    tdVersion:{
        border: "1px solid #ddd",
        padding:"0.5em"
    }
}));

const MenuHelp = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [optionMenu, setOptionMenu] = React.useState("cite");

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenModal = (optionMenu) => {
        handleClose();
        setOptionMenu(optionMenu);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const [anchorElInfo, setAnchorElInfo] = React.useState(null);

    const handleClickInfo = (event, optionMenu) => {
        handleClose();
        setOptionMenu(optionMenu);
        setAnchorElInfo(event.currentTarget);
    };

    const handleCloseInfo = () => {
        setAnchorElInfo(null);
    };

    const openInfo = Boolean(anchorElInfo);
    const idInfo = openInfo ? 'simple-popover' : undefined;


    return (
		<div>
			<IconButton edge="start"  color="inherit" aria-label="menu" onClick={handleClickMenu}>
				<IconHelp/>
			</IconButton>

			<Menu
			 	className={classes.menu}
				id="simple-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				<MenuItem onClick={e=>handleClose}>
					<a className={classes.link} href={"https://github.com/babelomics/SPACNACS/wiki"} target={"_blank"}>
						<IconDescription/>&nbsp;Documentation</a></MenuItem><br/>
				<MenuItem onClick={e=>handleClose}>
					<a className={classes.link} href={"https://github.com/babelomics/SPACNACS"} target={"_blank"}>
						<IconCode/>&nbsp;Source code</a></MenuItem><br/>
				<MenuItem onClick={e=>handleClickInfo(e,"contact")}><IconContact/>&nbsp;Contact</MenuItem><br/>
                {/*<MenuItem onClick={e=>handleClickInfo(e,"cite")}><IconCite/>&nbsp;How to cite</MenuItem><br/>*/}
				<MenuItem onClick={e=>handleClickInfo(e,"version")}><IconVersion/>&nbsp;Database version</MenuItem><br/>
			</Menu>

			<Popover
				id={idInfo}
				open={openInfo}
				anchorEl={anchorElInfo}
				onClose={handleCloseInfo}
				anchorReference="anchorPosition"
				anchorPosition={{ top: 400, left: 700 }}
				anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
				transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
			>
                <div className={classes.info}>
                    {optionMenu === "version" && <div>
                        <h3>Database versions:</h3>
                        <table className={classes.tableVersion}>
                            <tr>
                                <th style={{  color: "#fff",
                                    backgroundColor: "#3f51b5"}} colSpan={3}>{config.cnv.shortTitle} 1.0</th>
                            </tr>
                            <tr style={{backgroundColor:"#E8F4FD"}} >
                                <th className={classes.tdVersion} style={{backgroundColor:"#E8F4FD"}} >DataBase</th>
                                <th className={classes.tdVersion} style={{backgroundColor:"#E8F4FD"}}>Version Annotation</th>
                            </tr>

                            <tr>
                                <td className={classes.tdVersion}>Gnomad</td>
                                <td className={classes.tdVersion}>SV 2.1 (controls)</td>
                            </tr>
                            <tr>
                                <td className={classes.tdVersion}>1000 genomes project</td>
                                <td className={classes.tdVersion}>Structural variants phase 3</td>
                            </tr>
                            <tr>
                                <td className={classes.tdVersion}>Ensembl</td>
                                <td className={classes.tdVersion}>2020-12-18</td>
                            </tr>
                            <tr>
                                <td className={classes.tdVersion}>DisGeNET</td>
                                <td className={classes.tdVersion}>7.0, January 2020</td>
                            </tr>
                            <tr>
                                <td className={classes.tdVersion}>Gene Ontology Annotation</td>
                                <td className={classes.tdVersion}>2021-02-01</td>
                            </tr>
                            <tr>
                                <td className={classes.tdVersion}>Clinvar</td>
                                <td className={classes.tdVersion}>2021-04-18</td>
                            </tr>
                            <tr>
                                <td className={classes.tdVersion}>Clingen</td>
                                <td className={classes.tdVersion}>20 January 2021</td>
                            </tr>
                            <tr>
                                <td className={classes.tdVersion}>The Human Phenotype Ontology</td>
                                <td className={classes.tdVersion}>08-jun-2021</td>
                            </tr>
                            <tr>
                                <td className={classes.tdVersion}>UCSC</td>
                                <td className={classes.tdVersion}>2011-05-04</td>
                            </tr>
                        </table>
                    </div>}

                    {/*optionMenu == "cite" && <div >
                        <h3>How to cite</h3>
                        <p>By downloading data from the <b>Spanish CNV DataBase </b> you accept the obligation of
                            acknowledge its use in any publication, presentation, conference, poster or any public
                            event in which you present results obtained in any way using the data downloaded.</p>

                        <p>To acknowledge the use of <b>Spanish CNV DataBase </b> data use a sentence similar to this one:
                            “These results were obtained using <b>Spanish CNV DataBase data</b>  (<a href="http://csvs.babelomics.org/cnv" target={"_blank"}> http://csvs.babelomics.org/cnv</a>)."
                            </p>
                        <p></p>

                    </div>*/}
                    {optionMenu === "contact" && <div >
                        <h3>Contact</h3>
                        <p>Fundación Progreso y Salud</p>
                        <p>Clinical Bioinformatics Area, FPS</p>
                        <p>URL: <a href="http://www.clinbioinfosspa.es" target="_blanck">http://www.clinbioinfosspa.es</a> </p>
                        <p>Mail: <a href="mailto:csvs@clinbioinfosspa.es?subject=CNV Spanish:">csvs@clinbioinfosspa.es</a></p>
                    </div>}
                    <div style={{paddingTop:"1em"}}>
                        <Button aria-describedby={idInfo} variant="contained"  onClick={handleCloseInfo}>
                            Close
                        </Button>
                    </div>
                </div>
			</Popover>
		</div>
    );
};

export default MenuHelp;