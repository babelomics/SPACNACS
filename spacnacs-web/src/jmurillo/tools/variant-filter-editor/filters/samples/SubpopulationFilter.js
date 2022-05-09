import React from 'react';
import PropTypes from 'prop-types';
import {   FormControlLabel  } from '@material-ui/core';
import Checkbox from "@material-ui/core/es/Checkbox/Checkbox";


const subpopulations = [
    /*{
        description : "I Certain infectious and parasitic diseases",
        id : 1,
        label: "I" },*/
    {
        description : "II Neoplasms",
        id : 2,
        label: "II" },
    /*{
        description : "III Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism",
        id : 3,
        label: "III" },*/
    {
        description : "IV Endocrine, nutritional and metabolic diseases",
        id : 4,
        label: "IV" },
    {
        description : "V Mental and behavioural disorders",
        id : 5,
        label: "V" },
    {
        description : "VI Diseases of the nervous system",
        id : 6,
        label: "VI" },
    {
        description : "VII Diseases of the eye and adnexa",
        id : 7,
        label: "VII" },
    {
        description : "VIII Diseases of the ear and mastoid process",
        id : 8,
        label: "VIII" },
    {
        description : "IX Diseases of the circulatory system",
        id : 9,
        label: "IX" },
    {
        description : "X Diseases of the respiratory system",
        id : 10,
        label: "X" },
    /*{
        description : "XI Diseases of the digestive system",
        id : 11,
        label: "XI" },
    {
        description : "XII Diseases of the skin and subcutaneous tissue",
        id : 12,
        label: "XII" },*/
    {
        description : "XIII Diseases of the musculoskeletal system and connective tissue",
        id : 13,
        label: "XIII" },
   /* {
        description : "XIV Diseases of the genitourinary system",
        id : 14,
        label: "XIV" },
    {
        description : "XV Pregnancy, childbirth and the puerperium",
        id : 15,
        label: "XV" },*/
    {
        description : "XVI Certain conditions originating in the perinatal period",
        id : 16,
        label: "XVI" },
    {
        description : "XVII Congenital malformations, deformations and chromosomal abnormalities",
        id : 17,
        label: "XVII" },
    {
        description : "XVIII Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified",
        id : 18,
        label: "XVII" },
   /* {
        description : "XIX Injury, poisoning and certain other consequences of external causes",
        id : 19,
        label: "XIX" },
    {
        description : "XX External causes of morbidity and mortality",
        id : 20,
        label: "XX" },
    {
        description : "XXI Factors influencing health status and contact with health services",
        id : 21,
        label: "XXI" },
    {
        description : "XXII Codes for special purposes",
        id : 22,
        label: "XXII" },

    {
        description : "MGP (267 healthy controls, Solid 5500)",
        id : 23,
        label: "MGP" },
    {
        description : "MGP (healthy controls, Solid 4)",
        id : 24,
        label: "MGP" },
    {
        description : "IBS (107 Spanish individuals from 1000genomes)",
        id : 25,
        label: "IBS" },
    {
        description : "Healthy controls",
        id : 26,
        label: "Healthy controls" },
    {
        description : "I Certain infectious and parasitic diseases (controls)",
        id : 27,
        label: "I (controls)" },
    {
        description : "II Neoplasms (controls)",
        id : 28,
        label: "II (controls)" },*/
    {
        description : "III Diseases of the blood and blood-forming organs and certain disorders involving the immune mechanism (controls)",
        id : 29,
        label: "III (controls)" },
    {
        description : "IV Endocrine, nutritional and metabolic diseases (controls)",
        id : 30,
        label: "IV (controls)" },
    {
        description : "V Mental and behavioural disorders (controls)",
        id : 31,
        label: "V (controls)" },
    {
        description : "IV Diseases of the nervous system (controls)",
        id : 32,
        label: "IV (controls)" },
    {
        description : "VII Diseases of the eye and adnexa (controls)",
        id : 33,
        label: "VII (controls)" },
    {
        description : "VIII Diseases of the ear and mastoid process (controls)",
        id : 34,
        label: "VIII (controls)" },
    {
        description : "IX Diseases of the circulatory system (controls)",
        id : 35,
        label: "IX (controls)" },
    {
        description : "X Diseases of the respiratory system (controls)",
        id : 36,
        label: "X (controls)" },
    /*{
        description : "XI Diseases of the digestive system (controls)",
        id : 37,
        label: "XI (controls)" },
    {
        description : "XII Diseases of the skin and subcutaneous tissue (controls)",
        id : 38,
        label: "XII (controls)" },*/

    {
        description : "XIII Diseases of the musculoskeletal system and connective tissue (controls)",
        id : 39,
        label: "XIII (controls)" },
    /*{
        description : "XIV Diseases of the genitourinary system (controls)",
        id : 40,
        label: "XIV (controls)" },

    {
        description : "XV Pregnancy, childbirth and the puerperium (controls)",
        id : 41,
        label: "XV (controls)" },

    {
        description : "XVI Certain conditions originating in the perinatal period (controls)",
        id : 42,
        label: "XVI (controls)" },*/
    {
        description : "XVII Congenital malformations, deformations and chromosomal abnormalities (controls)",
        id : 43,
        label: "XVII(controls)" },

    {
        description : "XVIII Symptoms, signs and abnormal clinical and laboratory findings, not elsewhere classified (controls)",
        id : 44,
        label: "XVIII (controls)" },
    /*{
        description : "XIX Injury, poisoning and certain other consequences of external causes (controls)",
        id : 45,
        label: "XIX (controls)" },
    {
        description : "XX External causes of morbidity and mortality (controls)",
        id : 46,
        label:"XX (controls)" },
    {
        description : "XXI Factors influencing health status and contact with health services (controls)",
        id : 47,
        label: "XXI (controls)" }
    {
        description : "XXII Codes for special purposes (controls)",
        id : 48,
        label: "XXII (controls)" },*/

];



const SubpopulationFilter = ({ filterSubpopulation, addFilterSubpopulation, removeFilterSubpopulation }) => {
    const handleChange = (event, checked) => {
        let subp = subpopulations.find(g => g.id === parseInt(event.target.value));
        if (!!checked) {
            addFilterSubpopulation(subp);
        } else {
            removeFilterSubpopulation(subp);
        }
    };

    function getIsChecked(id, filterSubpopulation) {
        return !!filterSubpopulation.find(g => g.id === parseInt(id));
    }

    return(<React.Fragment>
        <div>
            <div><label style={{ color:"#666"}}>Subgroup:</label></div>
            <div style={{maxHeight:"30em", overflow: "scroll", paddingTop:"1em"}}>

                {
                    subpopulations.map(subpopulation => (
                        <FormControlLabel
                            key={subpopulation.id || ""}
                            label={subpopulation.description || ""}
                            control={
                                <Checkbox value={parseInt(subpopulation.id) }
                                          checked={getIsChecked(parseInt(subpopulation.id), filterSubpopulation)} onChange={handleChange}/>
                            }
                        />
                    ))
                }
            </div>
        </div>
	</React.Fragment>)
};


SubpopulationFilter.propTypes = {
    filterSubpopulation: PropTypes.array.isRequired,
    addFilterSubpopulation: PropTypes.func.isRequired,
    removeFilterSubpopulation: PropTypes.func.isRequired,
};


export default SubpopulationFilter;