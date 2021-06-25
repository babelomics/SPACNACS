import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

let style = {
  //position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
}

const Footer = props => (
  <footer style={style} className={props.classes.footer}>
    <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
      Fundación Progreso y Salud
    </Typography>
    <Typography className="footerText"
      variant="subtitle1"
      align="center"
      color="textSecondary"
      component="p"
    >
      Clinical Bioinformatics Area, FPS
        <span style={{fontSize:"small"}}>&nbsp; 2020-2021</span>
        <br />
      <a href="http://www.clinbioinfosspa.es">http://www.clinbioinfosspa.es</a>
    </Typography>
  </footer>
);

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Footer;
