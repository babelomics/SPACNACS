import React from 'react';
import propTypes from 'prop-types';
//import igv from 'igv/dist/igv.esm.min';
import igv from 'igv/dist/igv.esm';
import Button from '@material-ui/core';
import ViewerManager from "./ViewerManager";

const TrackTypes = propTypes.oneOf([
  'annotation', 'wig', 'alignment', 'variant', 'seg'
])
const SourceTypes = propTypes.oneOf([
  'file', 'gcs', 'ga4gh'
])

const TrackBase = {
  type: TrackTypes,                   // Track type                                                                                                                            	 No default. If not specified, type is inferred from file format
  sourceType: SourceTypes,            // Type of data source. Valid values are "file", "gcs" for Google Cloud Storage, and "ga4gh" for the Global Alliance API                 	 "file"
  format: propTypes.string,           // File format                                                                                                                           	 No default. If not specified format is inferred from file name extension
  indexURL: propTypes.string,         // URL to a file index, such as a BAM .bai, Tabix .tbi, or Tribble .idx file.
  indexed: propTypes.bool,            // Flag used to indicate if a file is indexed or not. If indexURL is provided this flag is redundant. If the indexURL is not provided and this flag is true index files will be searched by file name convention. NOTE: This is a change from previous igv releases.
  order: propTypes.number,            // Integer value specifying relative order of track position on the screen. To pin a track to the bottom use Number.MAX_VALUE. If no order is specified, tracks appear in order of their addition.
  color: propTypes.string,            // CSS color value for track features, e.g. "#ff0000" or "rgb(100,0,100)"
  height: propTypes.number,           // Initial height of track viewport in pixels                                                                                            	 50
  autoHeight: propTypes.bool,         // If true, then track height is adjusted dynamically, within the bounds set by minHeight and maxHeight, to accomdodate features in view 	 true
  minHeight: propTypes.number,        // Minimum height of track in pixels                                                                                                     	 50
  maxHeight: propTypes.number,        // Maximum height of track in pixels                                                                                                     	 500
  visibilityWindow: propTypes.number, // Maximum window size in base pairs for which indexed annotations or variants are displayed                                             	 1 MB for variants, 30 KB for alignments, whole chromosome for other track types
  /* TODO per-type options */
}

const Track = propTypes.shape({
  ...TrackBase,
  name: propTypes.string.isRequired,  // Display name (label). Required
  url: propTypes.string.isRequired,   // URL to the track data resource, such as a file or webservice. Required
})

const TrackDefault = propTypes.shape({
  ...TrackBase
})

const TrackDefaults = propTypes.shape({
  annotation: TrackDefault,
  wig: TrackDefault,
  alignment: TrackDefault,
  variant: TrackDefault,
  seg: TrackDefault,
})



const BrowserOptions = {
  minimumBases: propTypes.string,                 // Zoom-in is clamped to this value.	40
  reference: propTypes.object.isRequired,         // Object defining reference sequence. See object details below.
  showKaryo: propTypes.bool,                      // If true, show a whole-genome karyotype view.	false
  showNavigation: propTypes.bool,                 // If true, show basic navigation controls (search, zoom in, zoom out).	true
  showRuler: propTypes.bool,                      // If true, show a genomic ruler track.	true
  tracks: propTypes.arrayOf(Track).isRequired,    // Array of configuration objects defining tracks initially displayed when app launches.
  trackDefaults: TrackDefaults,                   // Embedded object defining default settings for specific track types (see table below).
  locus: propTypes.string,                        // Initial genomic location
  flanking: propTypes.number,                     // Distance (in bp) to pad sides of gene when navigating.	1000
  palette: propTypes.arrayOf(propTypes.string),   // Array of colors for the track color picker's default palette (e.g. ["#00A0B0", "#6A4A3C", "#CC333F", "#EB6841"])
  search: propTypes.object,                       // Object defining a web service for supporting search by gene or other annotation. See object details below. Optional
  apiKey: propTypes.string,                       // Google API key. Optional
  doubleClickDelay: propTypes.number,             // Maximum between mouse clicks in milliseconds to trigger a double-click	500

  supportQueryParameters: propTypes.bool,         // parameters values URI encoded https://github.com/igvteam/igv.js/wiki/Query-Parameters
}
/*
const genesTrack = {
  name: 'Genes',
  type: 'annotation',
  format: 'bed',
  sourceType: 'file',
  url: 'https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/refGene.hg19.bed.gz',
  indexURL: 'https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/refGene.hg19.bed.gz.tbi',
  order: Number.MAX_VALUE,
  visibilityWindow: 300000000,
  displayMode: 'EXPANDED',
  height: 80,
}
*/

const genomicRegion = cnv  => {
    alert("cnv " + cnv);
    // return props.addGenomicRegion()
};

const removeSpecialChar =(key, val) => {
    if (typeof val === 'function') {
        return val + ''; // implicitly `toString` it
    }
    if (typeof(val)!="string") return val;

    return val
        //.replace(/[\"]/g, '\\"')
        //.replace(/[\\]/g, '\\\\')
        //.replace(/[\/]/g, '\\/')
        //.replace(/[\b]/g, '\\b')
        //.replace(/[\f]/g, '\\f')
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '\\r')
        .replace(/[\t]/g, '\\t')
        ;
}

const getNumBase =(start, end) =>{

    if (!isNaN(parseInt(start.replaceAll(",",""))) && !isNaN(parseInt(end.replaceAll(",","")))) {
        let numBases = parseInt(end.replaceAll(",", "")) - parseInt(start.replaceAll(",", ""));
        return " (" + numBases + "b)"
    } else {
        return "";
    }

}

export default class Igv extends React.Component {

  static propTypes = {
    ...BrowserOptions,
    showGenes: propTypes.bool,
  };

//https://github.com/igvteam/igv.js/blob/8dbe2cb7992e964de8436882604c49e2a4e5ee76/examples/custom-webservice.html



  componentDidMount() {
    igv.createBrowser(this.element, { ...this.props, tracks: getTracks(this.props)

    }).then(b => {
      this.browser = b;
        console.log("Created IGV browser");

        for (var i=0; i < this.browser.trackViews.length; i++){
            if (this.browser.trackViews[i].track != undefined && this.browser.trackViews[i].track.config != undefined && this.browser.trackViews[i].track.config.legend != undefined){
                this.browser.trackViews[i].viewports[0].$content[0].innerHTML = this.browser.trackViews[i].track.config.legend;
            }
        }

       // this.browser.trackViews[4].viewports[0].$content[0].innerHTML = "display data<br/>repace<br/>display data<br/>repace<br/>";
       // this.browser.trackViews[4].viewports[0].$content[0].innerHTML = "display data<br/>repace<br/>display data<br/>repace<br/>";
        updateTrackLegendList(this.browser);

        this.browser.on("locuschange", updateTrackLegendList);

        function updateTrackLegendList () {
            let find = -1;
            for (var i=0; i < b.trackViews.length; i++){
                if (b.trackViews[i].track != undefined && b.trackViews[i].track.config != undefined && b.trackViews[i].track.config.legend != undefined){
                    b.trackViews[i].viewports[0].$content[0].innerHTML = b.trackViews[i].track.config.legend;
                }
            }
        };

        const sumDataSvtype = (data, svtype, db, alt) => {
            let dataFreq = [];
            if (db == "1000GP"){
                let datas = data.split(",");
                let listPosAltern = alt.split(",");
                let pos = 0;
                listPosAltern.forEach(p =>{
                    var matches = p.match(/(\d+)/);
                    if (matches) {
                        dataFreq[matches[0]] = datas[pos];
                    }
                    pos = pos + 1;
                });
            }

            let longDataFreq = dataFreq.length;
            if (longDataFreq > 0){

                for(let j = 0 ; j <= longDataFreq; j++) {
                    if (dataFreq[j] === undefined) {
                        dataFreq[j] = "0";
                    }
                }


                console.log("Ini", data, alt);
                data = dataFreq.join(",");
                console.log("End", dataFreq,);
            }

            if (data.indexOf(",")) {
                let datas = data.split(",");
                let result = 0;
                let presicion = -1;
                if (svtype == "DUP") {
                    if (datas.length > 3) {
                        //console.log(datas.slice(3, datas.length),"data", svtype);
                        datas.slice(3, datas.length).forEach(x => {
                            let xFloat= String(parseFloat(x));
                            if (xFloat.indexOf(".") > 0)
                                presicion = Math.max(presicion, xFloat.length - xFloat.indexOf(".") - 1);
                            result = result + parseFloat(x)
                        });
                    } else
                        //result = datas;
                        result = "0"
                }
                if (svtype == "DEL") {
                    if (datas.length > 1)
                    //result= parseFloat(datas[0])+parseFloat(data[1]);
                        datas.slice(0, 2).forEach(x => {
                            let xFloat= String(parseFloat(x));
                            if (xFloat.indexOf(".") > 0)
                                presicion = Math.max(presicion, xFloat.length - xFloat.indexOf(".") - 1);
                            result = result + parseFloat(x)
                        });
                    else
                        result = datas[0];
                }
                if (presicion > -1)
                    return result.toPrecision(presicion);
                else
                    return result
            } else
                return data;
        };

        const  divideDataSvtype = (dataFields, svtype, db ) => {
            let dataFieldsSytpe = Object.assign({}, dataFields);

            dataFieldsSytpe.SVTYPE = svtype + " (" + dataFields.SVTYPE + ")";
            if (dataFieldsSytpe.hasOwnProperty("AFR_AF"))
                dataFieldsSytpe.AFR_AF = sumDataSvtype(dataFields.AFR_AF, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("AMR_AF"))
                dataFieldsSytpe.AMR_AF = sumDataSvtype(dataFields.AMR_AF, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("EAS_AF"))
                dataFieldsSytpe.EAS_AF = sumDataSvtype(dataFields.EAS_AF, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("EUR_AF"))
                dataFieldsSytpe.EUR_AF = sumDataSvtype(dataFields.EUR_AF, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("OTH_AF"))
                dataFieldsSytpe.OTH_AF = sumDataSvtype(dataFields.OTH_AF, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("AF"))
                dataFieldsSytpe.AF = sumDataSvtype(dataFields.AF, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("AFR_AC"))
                dataFieldsSytpe.AFR_AC = sumDataSvtype(dataFields.AFR_AC, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("AMR_AC"))
                dataFieldsSytpe.AMR_AC = sumDataSvtype(dataFields.AMR_AC, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("EAS_AC"))
                dataFieldsSytpe.EAS_AC = sumDataSvtype(dataFields.EAS_AC, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("EUR_AC"))
                dataFieldsSytpe.EUR_AC = sumDataSvtype(dataFields.EUR_AC, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("OTH_AC"))
                dataFieldsSytpe.OTH_AC = sumDataSvtype(dataFields.OTH_AC, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("AC"))
                dataFieldsSytpe.AC = sumDataSvtype(dataFields.AC, svtype, db, dataFields.Alt);

            if (dataFieldsSytpe.hasOwnProperty("SAS_AF"))
                dataFieldsSytpe.SAS_AF = sumDataSvtype(dataFields.SAS_AF, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("SAS_AC"))
                dataFieldsSytpe.SAS_AC = sumDataSvtype(dataFields.SAS_AC, svtype, db, dataFields.Alt);



            if (dataFieldsSytpe.hasOwnProperty("FEMALE_AF"))
                dataFieldsSytpe.FEMALE_AF = sumDataSvtype(dataFields.FEMALE_AF, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("FEMALE_AC"))
                dataFieldsSytpe.FEMALE_AC = sumDataSvtype(dataFields.FEMALE_AC, svtype, db, dataFields.Alt);


            if (dataFieldsSytpe.hasOwnProperty("MALE_AF"))
                dataFieldsSytpe.MALE_AF = sumDataSvtype(dataFields.MALE_AF, svtype, db, dataFields.Alt);
            if (dataFieldsSytpe.hasOwnProperty("MALE_AC"))
                dataFieldsSytpe.MALE_AC = sumDataSvtype(dataFields.MALE_AC, svtype, db, dataFields.Alt);


            return dataFieldsSytpe;
        }


        // modify
        this.browser.on('trackclick', function (track, popoverData) {
                var markup = "<table class=\"igv-popover-table\">";

                // Don't show a pop-over when there's no data.
                if (!popoverData || !popoverData.length) {
                    return false;
                }
                let region = {
                    chromosome: "1",
                    start: 9999999999999,
                    end: 0
                };

            if ("cytobands" === track.name && !!track.featureSource && !!track.featureSource.config && !!track.featureSource.config.resultsField) {
                let listDataFields = [];
                let elto = Object.assign({}, track.featureSource.config.resultsField);
                popoverData.forEach(function (pD) {
                    if (pD =="<hr/><hr/>") {
                        // add to list
                        listDataFields.push(Object.assign({}, elto));
                        // inicialize
                        elto = Object.assign({}, track.featureSource.config.resultsField);
                    }
                    if (pD.name in elto){
                        elto[pD.name] = pD.value;
                    }
                });
                // Add last
                listDataFields.push(Object.assign({}, elto));

                let i = 0;
                listDataFields.forEach(function (dataFields) {
                    markup +=
                        "<tr><th >Locus</th><td colspan='4' style='text-align:left;padding-left:10px'>" +
                               dataFields.Location.replace("(.)","") + "</td></tr>" +
                        "<tr><th >Name</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.Name + "</td> </tr>";

                    if (i+1 < listDataFields.length)
                        markup +="<tr><td  colspan='2'><hr></td></tr>";

                    i=i+1;
                });


                markup += "</table>";
                return markup;
            }


            if ("Clinvar" === track.name && !!track.featureSource && !!track.featureSource.config && !!track.featureSource.config.resultsField) {
                let listDataFields = [];
                let elto = Object.assign({}, track.featureSource.config.resultsField);
                popoverData.forEach(function (pD) {
                    if (pD =="<hr/><hr/>") {
                        // add to list
                        listDataFields.push(Object.assign({}, elto));
                        // inicialize
                        elto = Object.assign({}, track.featureSource.config.resultsField);
                    }
                    if (pD.name in elto){
                        elto[pD.name] = pD.value;
                    }
                });
                // Add last
                listDataFields.push(Object.assign({}, elto));

                let i = 0;
                listDataFields.forEach(function (dataFields) {
                    markup +=
                        "<tr> <th >DataBase</th><td colspan='4' style='text-align:left;padding-left:10px'>Clinvar</td></tr>" +
                        "<tr><th >Locus</th><td colspan='4' style='text-align:left;padding-left:10px'>" +
                        dataFields.Location.replace("(.)","") + "</td></tr>" +
                        "<tr><th >Type</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.Type + "</td> </tr>" +
                        "<tr><th >ClinicalSignificance</th>" +
                            "<td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.ClinicalSignificance + "</td> " +
                        "</tr>" +
                        "<tr><th >PhenotypeList</th>" +
                            "<td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.PhenotypeList + "</td> " +
                        "</tr>" +
                        "<tr><th >Assembly</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.Assembly + "</td> </tr>" +
                        "<tr><th >ReviewStatus</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.ReviewStatus + "</td> </tr>";


                    if (i+1 < listDataFields.length)
                        markup +="<tr><td  colspan='2'><hr></td></tr>";

                    i=i+1;
                });

                markup += "</table>";
                return markup;
            }

            if ("1000GP" === track.name && !!track.featureSource && !!track.featureSource.config && !!track.featureSource.config.resultsField) {
                    let listDataFields = [];
                    let elto = Object.assign({}, track.featureSource.config.resultsField);
                    popoverData.forEach(function (pD) {
                        if (pD.hasOwnProperty("html") && pD.html.indexOf("dotted") == -1) {
                            // add to list
                            listDataFields.push(Object.assign({}, elto));
                            // inicialize
                            elto = Object.assign({}, track.featureSource.config.resultsField);
                        }
                        if (pD.name in elto){
                            elto[pD.name] = pD.value;
                        }
                    });
                    // Add last
                    listDataFields.push(Object.assign({}, elto));

                    // CNV --> DEL= CN0+CN1  DUP=CN3+...CNn  (cromX DEL=CN0)
                    let listDataFieldsFinal = [];

                    listDataFields.forEach(function (dataFields) {
                        if (dataFields.SVTYPE  == "CNV"){
                            let dataFieldsDEL = divideDataSvtype(dataFields, "DEL", track.name);
                            let dataFieldsDUP = divideDataSvtype(dataFields, "DUP", track.name);

                            // Add DUP and DEL if exist data
                            if (dataFieldsDUP.AF != "0")
                                listDataFieldsFinal.push( Object.assign({}, dataFieldsDUP));
                            if (dataFieldsDEL.AF != "0")
                                listDataFieldsFinal.push( Object.assign({}, dataFieldsDEL));
                        } else
                            listDataFieldsFinal.push( Object.assign({}, dataFields));
                    });

                    let i = 0;
                    listDataFieldsFinal.forEach(function (dataFields) {
                        markup +=
                            "<tr> <th >DataBase</th><td colspan='4' style='text-align:left;padding-left:10px'>1000GP</td></tr>" +
                            "<tr><th >Chromosome</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.Chr + "</td></tr>" +
                            "<tr><th >Locus</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.Loc + "</td> </tr>" +
                           // "<tr><th >Ref > Alt</th><td colspan='4'>" + dataFields.Ref + " > " + dataFields.Alt + "</td> </tr>" +
                            "<tr><th >Type</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.SVTYPE + "</td> </tr>" +
                            "<tr><th >Total frequency</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.AF + "</td> </tr>" +
                            "</table>" +
                            "<br>" +
                            "<table>" +
                            "<tr><th class=\"igv-popover-td\">Population</th><th>Allele frequency</th> <th>Allele count</th> <th>Allele number</th> </tr>" +
                            "<tr><th>African/African American</th> <td class=\"igv-popover-td\">" + dataFields.AFR_AF + "</td> <td></td> <td></td>  </tr>" +
                            "<tr><th>Latino</th> <td>" + dataFields.AFR_AF + "</td> <td></td> <td></td>  </tr>" +
                            "<tr><th>East Asian</th> <td>" + dataFields.EAS_AF + "</td> <td></td> <td></td>  </tr>" +
                            "<tr><th>European</th> <td>" + dataFields.EUR_AF + "</td> <td></td> <td></td>  </tr>" +
                            "<tr><th>Latino/Admixed American</th><td>" + dataFields.AMR_AF + "</td> <td></td> <td></td>  </tr>" +
                            "<tr><th>South Asian</th><td>" + dataFields.SAS_AF + "</td> <td></td> <td></td>  </tr>" +
                            "<tr> <th>Total</th> <td>" + dataFields.AF + "</td> <td>" + dataFields.AC + "</td> <td>" + dataFields.AN + "</td> </tr>";

                        if (i+1 < listDataFieldsFinal.length)
                            markup +="<tr><td  colspan='5'><hr></td></tr>";

                        i=i+1;
                        //markup += "<tr><td colspan=2></td></tr>";

                        //markup += "<tr><td colspan='2' \><button onclick=>" + "link  " + cnv + "</button></td></tr>";
                        //markup += "<tr><td colspan=2> <Button onClick={alert('entra')}>Add filter region</Button></td></tr>";
                        // track.browser.config.addGenomicRegion(region);
                    });


                    markup += "</table>";
                    return markup;
                }



                if ("Gnomad" === track.name && !!track.featureSource && !!track.featureSource.config && !!track.featureSource.config.resultsField) {
                    let listDataFields = [];
                    let elto = Object.assign({}, track.featureSource.config.resultsField);
                    popoverData.forEach(function (pD) {
                        if (pD.hasOwnProperty("html")  && pD.html.indexOf("dotted") == -1)  {
                            // add to list
                            listDataFields.push(Object.assign({}, elto));
                            // inicialize
                            elto = Object.assign({}, track.featureSource.config.resultsField);
                        }
                        if (pD.name in elto){
                            elto[pD.name] = pD.value;
                        }
                    });
                    // Add last
                    listDataFields.push(Object.assign({}, elto));

                    // MCNV --> DEL= CN0+CN1  DUP=CN3+...CNn  (cromX DEL=CN0)
                    let listDataFieldsFinal = [];

                    listDataFields.forEach(function (dataFields) {
                        if (dataFields.SVTYPE  == "MCNV"){
                            let dataFieldsDEL = divideDataSvtype(dataFields, "DEL", track.name);
                            let dataFieldsDUP = divideDataSvtype(dataFields, "DUP", track.name);

                            if (dataFields.Chr == "X") {
                                if (dataFields.hasOwnProperty("FEMALE_AF") && dataFields.FEMALE_AF.split(",")[0] != "0")
                                    dataFieldsDEL.FEMALE_AF = dataFields.FEMALE_AF.split(",")[0];
                                if (dataFields.hasOwnProperty("FEMALE_AF") && dataFields.FEMALE_AF.split(",")[0] != "0")
                                    dataFieldsDEL.FEMALE_AC = dataFields.FEMALE_AC.split(",")[0];
                            }

                            // add DUP and DEL
                            if (dataFieldsDUP.AF != "0")
                                listDataFieldsFinal.push( Object.assign({}, dataFieldsDUP));
                            if (dataFieldsDEL.AF != "0")
                                listDataFieldsFinal.push( Object.assign({}, dataFieldsDEL));
                        } else
                            listDataFieldsFinal.push( Object.assign({}, dataFields));
                    });

                    let i = 0;
                    var markup = "<table class=\"igv-popover-table\">";
                    listDataFieldsFinal.forEach(function (dataFields) {
                        markup +=
                            "<tr><th>DataBase</th><td colspan='4' style='text-align:left;padding-left:10px'>Gnomad </td></tr>" +
                            "<tr><th>Chromosome</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.Chr + "</td></tr>" +
                            "<tr><th>Locus</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.Loc + "</td></tr>" +
                            "<tr><th>Type</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.SVTYPE + "</td></tr>" +
                            "<tr><th>Total frequency</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.AF + "</td></tr>" +
                            "</table>" +
                            "<br>" +
                            "<table>" +
                            "<tr><th class=\"igv-popover-td\">Population</th><th>Allele frequency</th><th>Allele count</th> <th>Allele number</th> <th>Number of Homozygotes(alt)</th> </tr>" +
                            "<tr><th>African/African American</th> <td class=\"igv-popover-td\">" + dataFields.AFR_AF + "</td> <td>" + dataFields.AFR_AC + "</td> <td>" + dataFields.AFR_AN + "</td> <td>" + dataFields.AFR_N_HOMALT + "</td> </tr>" +
                            "<tr><th>Latino/Admixed American</th> <td>" + dataFields.AMR_AF + "</td><td>" + dataFields.AMR_AC + "</td> <td>" + dataFields.AMR_AN + "</td> <td>" + dataFields.AMR_N_HOMALT + "</td> </tr>" +
                            "<tr><th>East Asian</th> <td>" + dataFields.EAS_AF + "</td> <td>" + dataFields.EAS_AC + "</td> <td>" + dataFields.EAS_AN + "</td> <td>" + dataFields.EAS_N_HOMALT + "</td> </tr>" +
                            "<tr><th>European</th> <td>" + dataFields.EUR_AF + "</td> <td>" + dataFields.EUR_AC + "</td> <td>" + dataFields.EUR_AN + "</td> <td>" + dataFields.EUR_N_HOMALT + "</td> </tr>" +
                            "<tr><th>Other</th><td>" + dataFields.OTH_AF + "</td><td>" + dataFields.OTH_AC + "</td><td>" + dataFields.OTH_AN + "</td><td>" + dataFields.OTH_N_HOMALT + "</td></tr>" +
                            "<tr><th>Total</th> <td>" + dataFields.AF + "</td> <td>" + dataFields.AC + "</td> <td>" + dataFields.AN + "</td> <td>" + dataFields.N_HOMALT + "</td> </tr>";

                        if ( dataFields.Chr === "Y" || dataFields.Chr === "X" ){
                            markup += "</table>" +
                                "<br>" +
                                "<table>" +
                                "<tr> <th class=\"igv-popover-td\">Population</th><th>Allele frequency</th> <th>Allele count</th> <th>Allele number</th>"+
                                "<th>Number of Homozygotes(alt)</th> <th>Number of heterozygous</th><th>Number of hemizygous</th> <th>AF homozygous(alt)</th> <th>AF heterozygous</th> <th>AF hemizygous</th>" +
                                "</tr>" +
                                "<tr> <th>MALE</th> <td>" + dataFields.MALE_AF + "</td> <td>" + dataFields.MALE_AC + "</td> <td>" + dataFields.MALE_AN + "</td> <td>"
                                + dataFields.MALE_N_HOMALT + "</td> <td>" + dataFields.MALE_N_HET + "</td> <td>" + dataFields.MALE_N_HEMIALT + "</td> <td>" + dataFields.MALE_FREQ_HOMALT + "</td> <td>" +
                                dataFields.MALE_FREQ_HET + "</td> <td>" +   dataFields.MALE_FREQ_HEMIALT + "</td> "+
                                "</tr>";
                        }
                        if (dataFields.Chr === "X" ){
                            markup +="</table>" +
                                "<br>" +
                                "<table>" +
                                    "<tr> <th class=\"igv-popover-td\">Population</th><th>Allele frequency</th> <th>Allele count</th> <th>Allele number</th>"+
                                    "<th>Number of Homozygotes(alt)</th> <th>Number of heterozygous</th><th>Number of hemizygous</th> <th>AF homozygous(alt)</th> <th>AF heterozygous</th> <th>AF hemizygous</th>" +
                                    "</tr>" +
                                    "<tr> <th>FEMALE</th> <td>" + dataFields.FEMALE_AF + "</td> <td>" + dataFields.FEMALE_AC + "</td> <td>" + dataFields.FEMALE_AN + "</td> <td>"
                                + dataFields.FEMALE_N_HOMALT + "</td> <td>" + dataFields.FEMALE_N_HET + "</td> <td>" + "-"+  "</td> <td>" + dataFields.FEMALE_FREQ_HOMALT + "</td> <td>" +
                                dataFields.FEMALE_FREQ_HET + "</td> <td>" +   "-" + "</td> "+
                                    "</tr>";
                        }

                        if (i+1 < listDataFieldsFinal.length)
                            markup +="<tr><td  colspan='10'><hr></td></tr></table><table>";

                        i=i+1;
                        //markup += "<tr><td colspan=2></td></tr>";

                        //markup += "<tr><td colspan='2' \><button onclick=>" + "link  " + cnv + "</button></td></tr>";
                        //markup += "<tr><td colspan=2> <Button onClick={alert('entra')}>Add filter region</Button></td></tr>";
                        // track.browser.config.addGenomicRegion(region);
                    });


                    markup += "</table>";


                    // By returning a string from the trackclick handler we're asking IGV to use our custom HTML in its pop-over.
                    return markup;
                }


                if ("CNVs" === track.name && !!track.featureSource && !!track.featureSource.config && !!track.featureSource.config.resultsField) {
                    let listDataFields = [];
                    let elto = Object.assign({}, track.featureSource.config.resultsField);
                    let numCNVs = 0;
                    popoverData.forEach(function (pD) {
                        if (pD.name =="Sample" && numCNVs!=0) {
                            // if (pD.hasOwnProperty("html")  && pD.html.indexOf("dotted") == -1 ) {
                            // add to list
                            listDataFields.push(Object.assign({}, elto));
                            // inicialize
                            elto = Object.assign({}, track.featureSource.config.resultsField);
                        }
                        if (pD.name =="Sample")
                            numCNVs = numCNVs + 1;

                        if (pD.name in elto){
                            elto[pD.name] = pD.value;
                        }

                    });
                    // Add last
                    listDataFields.push(Object.assign({}, elto));

                    let i = 0;
                    listDataFields.forEach(function (dataFields) {
                        if (!!dataFields.Locus) {
                            dataFields.chr = dataFields.Locus.split(":")[0];
                            let re = dataFields.Locus.split(":")[1];
                            dataFields.start = re.split("-")[0];
                            dataFields.end = re.split("-")[1];
                        }

                        markup +=
                            "<tr> <th >DataBase</th><td>Spanish CNVs </td></tr>" +
                            "<tr> <th >Chromosome</th><td>" + dataFields.chr + "</td></tr>" +
                            "<tr> <th >Locus</th><td>" + dataFields.start + "-" + dataFields.end + getNumBase( dataFields.start, dataFields.end )+"</td> </tr>" +
                            "<tr> <th >Type</th><td>" + dataFields.ty  + "</td> </tr>" +
                            "<tr> <th >Sample</th><td>" + (dataFields.sampleName != undefined ? dataFields.sampleName : "")+ "</td></tr>" +
                            "<tr> <th>Score</th> <td class=\"igv-popover-td\">" + dataFields.score + "</td> </tr>" +
                            "<tr> <th>Frequency overlap</th> <td class=\"igv-popover-td\">" + dataFields.freqOverlap + "</td> </tr>" ;

                        if(dataFields["num_copy"] != undefined && dataFields["num_copy"] != "")
                            markup +="<tr> <th>Num copy</th> <td>" + dataFields["num_copy"] + "</td></tr>" ;

                        if (i+1 < listDataFields.length)
                            markup +="<tr><td  colspan='2'><hr></td></tr>";

                        i=i+1;
                        //markup += "<tr><td colspan=2></td></tr>";

                        //markup += "<tr><td colspan='2' \><button onclick=>" + "link  " + cnv + "</button></td></tr>";
                        //markup += "<tr><td colspan=2> <Button onClick={alert('entra')}>Add filter region</Button></td></tr>";
                        // track.browser.config.addGenomicRegion(region);
                    });


                    markup += "</table>";

                    /*popoverData.forEach(function (nameValue) {
                        if (nameValue.name) {
                            if (nameValue.name.toLowerCase() === 'chr')
                                region.chromosome = nameValue.value;

                            if (nameValue.name.toLowerCase() === 'start')
                                region.start = nameValue.value < region.start ? nameValue.value : region.start;

                            if (nameValue.name.toLowerCase() === 'end')
                                region.end = nameValue.value > region.end ? nameValue.value : region.end;

                            if (nameValue.name.toLowerCase() === 'location') {
                                region.chromosome = nameValue.value.split(":")[0].replace("chr","");
                                let re = nameValue.value.split(":")[1];
                                region.start = re.split("-")[0].replace(",","");
                                region.end = re.split("-")[1].replace(",","");
                            }

                            if (nameValue.name.toLowerCase() == 'dup/del' ||
                                (nameValue.name.toLowerCase() === "score" && nameValue.value != 0.0) ||
                                (nameValue.name.toLowerCase() ==="num_coy" && nameValue.value != 0)
                            ) {
                                markup += "<tr><td class=\"igv-popover-td\">"
                                    + "<strong>" + nameValue.name + "</strong>"
                                    + "</td>"
                                    + "<td>"
                                    + nameValue.value
                                    + "</td>"
                                    + "</tr>";
                            }

                        } else {
                            // not a name/value pair
                            markup += "<tr><td colspan='2'>" + nameValue.toString() + "</td></tr>";
                        }
                    });*/

                    //markup += "<tr><td colspan=2></td></tr>";


                    //markup += "<tr><td colspan='2' \><button onclick=>" + "link  " + cnv + "</button></td></tr>";
                   //markup += "<tr><td colspan=2> <Button onClick={alert('entra')}>Add filter region</Button></td></tr>";
                   // track.browser.config.addGenomicRegion(region);


                    markup += "</table>";


                    // By returning a string from the trackclick handler we're asking IGV to use our custom HTML in its pop-over.
                    return markup;
                }
            }
        );


    });
  }

  componentDidUpdate(prevProps) {
      console.log(prevProps,"prevProps")
    if (!!this.props && prevProps.locus !== this.props.locus && !!this.browser) {
              this.browser.search(this.props.locus);
    }
  }


  componentWillReceiveProps(props) {
    const previousTracksList = getTracks(this.props)
    const nextTracksList = getTracks(props)

    // If change name or url
    if (!tracksEqual(previousTracksList, nextTracksList)) {

      const previousTracks = new Set()
      const nextTracks = new Set()

      previousTracksList.forEach(track => previousTracks.add(getTrackID(track)))
      nextTracksList.forEach(track => nextTracks.add(getTrackID(track)))

      const tracksToRemove = this.browser.trackViews
        .filter(view => view.track.id !== 'ruler' && view.track.id !== 'sequence' && !nextTracks.has(getTrackID(view.track)))
        .map(view => view.track)
      const tracksToAdd = nextTracksList.filter(track => !previousTracks.has(getTrackID(track)))

      tracksToRemove.forEach(track => this.browser.removeTrack(track))
      tracksToAdd.forEach(track => this.browser.loadTrack(track))
    }

    // If change filters
    let listPreviosTracksCNVs =  this.props.tracks
          .filter(t => t.name == 'CNVs');
    let listNextTracksCNVs =  props.tracks
          .filter(t => t.name == 'CNVs');
     if (listPreviosTracksCNVs.length > 0 &&
         listNextTracksCNVs.length > 0 &&
         listPreviosTracksCNVs[0].source.body != listNextTracksCNVs[0].source.body){
         let tracksUpdate =  this.browser.trackViews
             .filter(view => view.track.id == 'CNVs')
             .map(view => view.track);
         this.browser.removeTrack(tracksUpdate[0]);
         this.browser.loadTrack(JSON.stringify(listNextTracksCNVs[0],removeSpecialChar));
     }

      /*

    if (!!this.props && document.getElementsByClassName("igv-search-input")[0].value !== props.locus && !!this.browser) {
    // No change this.props.locus if (!!this.props && this.props.locus !== props.locus && !!this.browser) {
          this.browser.search(props.locus)
    } else {
        let tracksUpdate =  this.browser.trackViews
            .filter(view => view.track.id == 'CNVs')
            .map(view => view.track)
        console.log("antes load",props,  this.props);
        console.log("tracksUpdate",tracksUpdate);

        this.browser.removeTrack(tracksUpdate[0]);
        console.log("despues load",props,  this.props);
        let cnvsUpdateTrack = props.tracks.filter(t=> t.name =="CNVs")[0];
        this.browser.loadTrack(cnvsUpdateTrack);

        //this.browser.updateViews(false, tracksUpdate,true);
    }*/
/*
    alert("changue props");
      //let listTracks = this.browser.findTracks("name","CNVs");
      const listTracksCNVs = this.browser.trackViews
          .filter(view => view.track.name === 'CNVs' )
          .map(view => view.track)
      const tracksToUpdate = listTracksCNVs.filter(track => !previousTracks.has(getTrackID(track)))

      listTracksCNVs.forEach(track => this.browser.removeTrack(track))
      tracksToUpdate.forEach(track => this.browser.loadTrack(track))
*/
      /*
         console.log(this.browser.trackViews ,"this.browser")
           for (var i=0; i < this.browser.config.tracks.length; i++){
               console.log(this.browser.config.tracks);
               if (this.browser.config.tracks[i] != undefined && this.browser.config.tracks[i].name == "CNVs"){
                   console.log(this.browser.config.tracks);
                   this.browser.config.tracks[i].body = JSON.stringify(translateFilterToServer(this.props.filters, null))
                   console.log(this.browser.config.tracks);
                   //this.browser.trackViews[i].viewports[0].$content[0].innerHTML = b.trackViews[i].track.config.legend;
               }
           }
           */
       }

  render() {
    return (
      <div className='IGVBrowser' ref={e => e && (this.element = e)} />


    )
  }
}

/*
function translateFilterToServer( filter, options) {
    const serverFilter = {
        // includeSample: !!filter && filter.samples || [],
    };

    if (!!filter && !!filter.groups) {
        serverFilter.groups = filter.groups.groups;
    }
    if (!!filter && !!filter.optionsView && !!filter.optionsView.selectedView) {
        serverFilter.selectedView = filter.optionsView.selectedView;
    }
    if (!!filter && !!filter.phenotypes) {

            filter.phenotypes.forEach(s => {
                if (s.annotationField == "all") {
                    if (s.searchText != "")
                        serverFilter[s.annotationField] = s.searchText;
                } else {
                    if (serverFilter[s.annotationField] == undefined)
                        serverFilter[s.annotationField] = []
                    serverFilter[s.annotationField].push(s.id);
                }
            });
    }

    if (!!options && options.chr != "all"){
        serverFilter.genomicRegions=[];
        serverFilter.genomicRegions.push(options.chr.substring(3) + ":" + options.start + "-" + options.end );
    }

    /*
    if (!!filter && !!filter.genomicRegions) {
            serverFilter.genomicRegions = [];
        filter.genomicRegions.map(region => (
           serverFilter.genomicRegions.push(region)
        ))
    }
    */
    /*filter.genomicRegions.map(region => (
        serverFilter.genomicRegions.push(`${region.chromosome}${!!region.start ? ":" + region.start : ""}${!!region.end ? "-" + region.end : ""}`)
    ));*

    if (!!filter && 0 < (filter.variantTypes || []).length) {
        serverFilter.variantTypes = filter.variantTypes;
    }
    /*
        if (!!filter && 0 < (filter.consequenceTypes || []).length) {
            serverFilter['annot-ct'] = filter.consequenceTypes.join(",");
        }*

    if (!!filter && 0 < (filter.vcfMetrics || []).length) {
        serverFilter.filter = filter.vcfMetrics.join(",");
    }

    const outFilters = [];
    if (!!filter && !!filter.populationFrequency) {
        if (isNumberStringValid(filter.populationFrequency.min)) {
            outFilters.push(`${filter.population}:${filter.subpopulation}>${filter.min}`);
        }
        if (isNumberStringValid(filter.max)) {
            outFilters.push(`${filter.population}:${filter.subpopulation}<${filter.max}`);
        }
    }
    if (0 < outFilters.length) {
        serverFilter['alternate_frequency'] = outFilters.join(";");
    }

    if (!!filter && 0 < ((!!filter.clinical && filter.clinical.phenotypes) || []).length) {
        //outFilter['annot-hpo'] = inFilter.clinical.phenotypes.join(",");
        serverFilter['annot-hpo'] = filter.clinical.phenotypes;
    }

    if (!!filter && 0 < (( filter.clinvars) || []).length) {
        //outFilter.clinicalSignificance = inFilter.clinvars.join(",");
        serverFilter.clinicalSignificance = filter.clinvars;
    }

    console.log("Search", serverFilter);
    return serverFilter;
}
*/
const isNumberStringValid = x => !!x && 0 < x.trim().length && !isNaN(x);


function getTracks(props) {
    // return props.tracks;props.showGenes ? props.tracks.concat(genesTrack) : props.tracks

    return props.tracks.sort(function(a, b){
        if(a.order == null && b.order == null) return 1;
        if(a.order == null && b.order != null) return -1;
        if(a.order != null && b.order == null) return 1;
        if (a.order > b.order) return 1;
        if (a.order < b.order) return -1;
        return 0;
    });


}

function tracksEqual(previous, next) {
  const previousTracks = previous.filter(track => track.type !== 'sequence')
  const nextTracks = next.filter(track => track.type !== 'sequence')

  if (previousTracks.length !== nextTracks.length)
    return false

  for (let i = 0; i < previousTracks.length; i++) {
    if (getTrackID(previousTracks[i]) !== getTrackID(nextTracks[i]))
      return false
  }

  return true
}

function getTrackID(track) {
  return `${track.name}_${track.url}`
}