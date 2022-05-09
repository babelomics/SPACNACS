import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
import Button from '@material-ui/core/Button';

import Footer from "./Footer";
import logo from "./images/logo-extendido.svg";
import config from './config';
import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(6),

    [theme.breakpoints.up(1100 + theme.spacing(3) * 2)]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  toolbarMain: {
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between"
  },
  mainFeaturedPost: {
    //backgroundColor: theme.palette.grey[800],
    //color: theme.palette.common.white,
    marginBottom: theme.spacing(4)
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing(6)}px`,
    [theme.breakpoints.up("md")]: {
      paddingRight: 0
    }
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },

  footer: {
   // backgroundColor: theme.palette.background.paper,
    //marginTop: theme.spacing(1) ,
    //padding: `${theme.spacing(6)}px 0`,
      paddingBottom : "10px",
      paddingTop : "40px"
  },


});



const HomePage = props => (

  <React.Fragment>
    <div className="HomePageCNV-layout">
      <main>
        <Paper className="cardDataStyle">
          <Grid
            container>


            <Grid item md={7} lg={7} sm={12} xs={12} className="HomePage-mainGrid" >
              <div className="HomePage-mainFeaturedPost" style={{textAlign: "justify", height: "100%"}}>

                <Typography variant="h6" color="inherit" paragraph={true}>
                  Welcome to the {config.cnv.title}.


                </Typography>
                <Typography  variant="h6" color="inherit" paragraph={true}>
                  <b>{config.cnv.shortTitle} </b>is a crowdsourcing initiative to provide information about <b>C</b>opy <b>N</b>umber <b>V</b>ariations
                  of the Spanish population to the scientific/medical community.
                </Typography>
                  <Typography  variant="h6" color="inherit" paragraph={true}>We accept submissions from WES or WGS,
                  no matter whether these come from healthy or diseased individuals.

                  </Typography>
                <Typography  variant="h6" color="inherit" paragraph={true}>
                  <b>{config.cnv.shortTitle}</b> currently stores information on {config.cnv.individuals} unrelated individuals of Spanish (Iberian) ancestry.
                </Typography>
                <br/>
                <br/>
                <Typography  variant="h6" color="inherit" paragraph={true}>
                  Supported by:
                </Typography>
                <Typography  variant="h6" color="inherit" paragraph={true}>
                  <a title="ciberer BIER" href="http://bier.ciberer.es/" target="_blank"><img style={{margin:"3px",height:"40px"}} src="http://csvs.clinbioinfosspa.es/images/logobier.jpg" /></a>
                  <a title="ciberer" href="https://www.ciberer.es/" target="_blank" ><img style={{margin:"3px",height:"40px"}} src="http://csvs.clinbioinfosspa.es/images/logo_Ciberer.jpg"/></a>
                  <a title="Fundación Progreso y Salud" href="https://www.sspa.juntadeandalucia.es/fundacionprogresoysalud/es" target="_blank" ><img style={{margin:"3px",height:"40px",backgroundColor: "#05723A"}} src="http://csvs.clinbioinfosspa.es/images/logo_FPS.png"/></a>
                  <a title="babelomics" href="http://babelomics.bioinfo.cipf.es/" target="_blank" ><img style={{margin:"3px",height:"40px",backgroundColor: "#05723A"}} src="http://csvs.clinbioinfosspa.es/images/logoBabelomics_positive_trans.svg" /></a>
                  <a title="Instituto de Salud Carlos III" href="https://www.isciii.es/Paginas/Inicio.aspx" target="_blanck" ><img style={{margin:"3px",height:"40px"}} src="http://csvs.clinbioinfosspa.es/images/LOGO_Micinn_Isciii.jpg"/></a>
                  <a title="ELIXIR SPAIN" href="https://elixir-europe.org/about-us/who-we-are/nodes/spain" target="_blank" ><img style={{margin:"3px",height:"40px",backgroundColor:"white"}} src="http://csvs.clinbioinfosspa.es/images/logo_ELIXIR_spain.png" /></a>
                </Typography>

              </div>
            </Grid>
            <Grid item md={5} lg={5} sm={12} xs={12} className="HomePage-mainGrid">
              <div className="HomePage-mainFeaturedPost" >
                  <img src={logo} className="App-logoCNV" alt="logo" style={{paddingTop:"5em"}}/>
              </div>
              <div>
                <br/>
                <Button variant="outlined" size="large" component={RouterLink} to="/spacnacs/igv" style={{minWidth:"10em"}} >Start</Button>
              </div>
            </Grid>
          </Grid>
        </Paper>

      </main>
    </div>
    <Footer {...props} />
  </React.Fragment>

);

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);
