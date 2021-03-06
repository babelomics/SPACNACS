import React from 'react';
import propTypes from 'prop-types';
import igv from 'igv/dist/igv.esm';

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


const removeSpecialChar =(key, val) => {
    if (typeof val === 'function') {
        return val + ''; // implicitly `toString` it
    }
    if (typeof(val) !=="string") return val;

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


  componentDidMount() {
    igv.createBrowser(this.element, { ...this.props, tracks: getTracks(this.props)

    }).then(b => {
      this.browser = b;
        console.log("Created IGV browser");

        for (var i=0; i < this.browser.trackViews.length; i++){
            if (this.browser.trackViews[i].track !== undefined && this.browser.trackViews[i].track.config !== undefined && this.browser.trackViews[i].track.config.legend !== undefined){
                this.browser.trackViews[i].viewports[0].$content[0].innerHTML = this.browser.trackViews[i].track.config.legend;
            }
        }

        updateTrackLegendList(this.browser);

        this.browser.on("locuschange", updateTrackLegendList);

        function updateTrackLegendList () {
            for (var i=0; i < b.trackViews.length; i++){
                if (b.trackViews[i].track !== undefined && b.trackViews[i].track.config !== undefined && b.trackViews[i].track.config.legend !== undefined){
                    b.trackViews[i].viewports[0].$content[0].innerHTML = b.trackViews[i].track.config.legend;
                }
            }
        };

        const sumDataSvtype = (data, svtype, db, alt) => {
            let dataFreq = [];
            if (db === "1000GP"){
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
                data = dataFreq.join(",");
            }

            //CNV 1000GP --> DEL= CN0  DUP=CN2+CN3+...CNn  (cromX DEL=CN0)

            if (data.indexOf(",")) {
                let datas = data.split(",");
                let result = 0;
                let presicion = -1;
                if (svtype === "DUP") {
                    let numCNDup = (db === "1000GP") ? 2 : 3;

                    if (datas.length > numCNDup) {
                        //console.log(datas.slice(3, datas.length),"data", svtype);
                        datas.slice(numCNDup, datas.length).forEach(x => {
                            let xFloat= String(parseFloat(x));
                            if (xFloat.indexOf(".") > 0)
                                presicion = Math.max(presicion, xFloat.length - xFloat.indexOf(".") - 1);
                            result = result + parseFloat(x)
                        });
                    } else
                        //result = datas;
                        result = "0"
                }
                if (svtype === "DEL") {
                    if (datas.length > 1 && db !== "1000GP")
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


            if ("cytobands" === track.name && !!track.featureSource && !!track.featureSource.config && !!track.featureSource.config.resultsField) {
                let listDataFields = [];
                let elto = Object.assign({}, track.featureSource.config.resultsField);
                popoverData.forEach(function (pD) {
                    if (pD ==="<hr/><hr/>") {
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
                    if (pD ==="<hr/><hr/>") {
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
                        if (pD.hasOwnProperty("html") && pD.html.indexOf("dotted") === -1) {
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

                    // CNV --> DEL= CN0  DUP=CN2+CN3+...CNn  (cromX DEL=CN0)
                    let listDataFieldsFinal = [];

                    listDataFields.forEach(function (dataFields) {
                        if (dataFields.SVTYPE  === "CNV"){
                            let dataFieldsDEL = divideDataSvtype(dataFields, "DEL", track.name);
                            let dataFieldsDUP = divideDataSvtype(dataFields, "DUP", track.name);

                            // Add DUP and DEL if exist data
                            if (dataFieldsDUP.AF !== "0")
                                listDataFieldsFinal.push( Object.assign({}, dataFieldsDUP));
                            if (dataFieldsDEL.AF !== "0")
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
                    });


                    markup += "</table>";
                    return markup;
                }



                if ("Gnomad" === track.name && !!track.featureSource && !!track.featureSource.config && !!track.featureSource.config.resultsField) {
                    let listDataFields = [];
                    let elto = Object.assign({}, track.featureSource.config.resultsField);
                    popoverData.forEach(function (pD) {
                        if (pD.hasOwnProperty("html")  && pD.html.indexOf("dotted") === -1)  {
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
                        if (dataFields.SVTYPE  === "MCNV"){
                            let dataFieldsDEL = divideDataSvtype(dataFields, "DEL", track.name);
                            let dataFieldsDUP = divideDataSvtype(dataFields, "DUP", track.name);

                            if (dataFields.Chr === "X") {
                                if (dataFields.hasOwnProperty("FEMALE_AF") && dataFields.FEMALE_AF.split(",")[0] !== "0")
                                    dataFieldsDEL.FEMALE_AF = dataFields.FEMALE_AF.split(",")[0];
                                if (dataFields.hasOwnProperty("FEMALE_AF") && dataFields.FEMALE_AF.split(",")[0] !== "0")
                                    dataFieldsDEL.FEMALE_AC = dataFields.FEMALE_AC.split(",")[0];
                            }

                            // add DUP and DEL
                            if (dataFieldsDUP.AF !== "0")
                                listDataFieldsFinal.push( Object.assign({}, dataFieldsDUP));
                            if (dataFieldsDEL.AF !== "0")
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
                    });


                    markup += "</table>";


                    // By returning a string from the trackclick handler we're asking IGV to use our custom HTML in its pop-over.
                    return markup;
                }


            if ("Regulatory regions" === track.name && !!track.featureSource && !!track.featureSource.config && !!track.featureSource.config.resultsField) {
                let listDataFields = [];
                let elto = Object.assign({}, track.featureSource.config.resultsField);
                popoverData.forEach(function (pD) {
                    if (pD.hasOwnProperty("html") && pD.html.indexOf("hr") !== -1) {
                        // add to list
                        listDataFields.push(Object.assign({}, elto));
                        // inicialize
                        elto = Object.assign({}, track.featureSource.config.resultsField);
                    }
                    let key = pD !== undefined && pD !== "" && pD.name !== undefined && pD.name !== "" ? pD.name[0].toLowerCase() + pD.name.substring(1): "";
                    key = key !== undefined ? key.replace(":","") : key;

                    if (key in elto){
                        elto[key] = pD.value;
                    }

                    // Update id
                    if (key === "location"){
                        elto["chr"] = pD.value.split(":")[0];
                        elto["start"] = parseInt(pD.value.replaceAll(",","").split(":")[1].split("-")[0]);
                        elto["end"] = parseInt(pD.value.replaceAll(",","").split(":")[1].split("-")[1]);

                         track.featureSource.getFeatures({chr: elto.chr,
                                start: elto.start, end: elto.end}).then(features =>

                                        features.forEach(function (feature, index) {
                                            let position = listDataFields.findIndex(function(itm){
                                                  return feature.chr === itm.chr &&
                                                        feature.start+1 === itm.start &&
                                                         feature.end === itm.end &&
                                                         feature.type === itm.type;
                                                    })
                                            if (position !== -1){
                                                listDataFields[position].id= feature.id;
                                                    if (document.getElementById("dataFieldsId"+feature.chr+(feature.start+1)+feature.end+feature.type+position) !== null){
                                                        document.getElementById("dataFieldsId"+feature.chr+(feature.start+1)+feature.end+feature.type+position).innerHTML= feature.id;
                                                    }
                                                }
                                            })
                                )
                    }
                });


                // Add last
                listDataFields.push(Object.assign({}, elto));

                let i = 0;
                listDataFields.forEach(function (dataFields) {
                    markup +=
                        "<tr> <th >DataBase</th><td colspan='4' style='text-align:left;padding-left:10px'>"+track.name+"</td></tr>" +
                        "<tr><th >Position</th><td colspan='4' style='text-align:left;padding-left:10px'>" + dataFields.location + "</td></tr>" +
                        "<tr><th >Description</th><td colspan='4' style='text-align:left;padding-left:10px;padding-right:100px'>" + dataFields.description + "</td> </tr>" +
                        "<tr><th >ID</th><td colspan='4' style='text-align:left;padding-left:10px' id='dataFieldsId"+dataFields.chr+dataFields.start+dataFields.end+dataFields.type+i+"'>" + dataFields.id + "</td> </tr>";

                    if (i+1 < listDataFields.length)
                        markup +="<tr><td  colspan='5'><hr></td></tr>";

                    i=i+1;
                });


                markup += "</table>";
                return markup;
            }


                if ("CNVs" === track.name && !!track.featureSource && !!track.featureSource.config && !!track.featureSource.config.resultsField) {
                    let listDataFields = [];
                    let elto = Object.assign({}, track.featureSource.config.resultsField);
                    let numCNVs = 0;

                    let initElto = {chromosome:"", start: 0, end:0, ty:"", copy:0, score:0, sampleName:"", freqOverlap:0, pipeline:""};
                    elto = Object.assign({}, initElto);
                    popoverData.forEach(function (pD) {
                        let key = pD !== undefined && pD !== "" && pD.name !== undefined && pD.name !== "" ? pD.name[0].toLowerCase() + pD.name.substring(1): "";

                        if (pD.name === "Chromosome" && numCNVs !== 0) {
                            // add to list
                            listDataFields.push(Object.assign({}, elto));
                            // inicialize
                            elto = Object.assign({}, initElto);
                        }
                        if (pD.name === "Chromosome")
                            numCNVs = numCNVs + 1;

                        if (pD.name =="Location") {
                            let re = pD.value.split(":")[1];
                            elto.start = re.split("-")[0];
                            elto.end = re.split("-")[1];
                        }
                        if ( key in elto){
                            elto[key] = pD.value;
                        }
                    });
                    if (numCNVs > 0)
                        listDataFields.push(Object.assign({}, elto));

                    let i = 0;
                    listDataFields.forEach(function (dataFields) {
                        markup +=
                            "<tr> <th >DataBase (pipeline)</th><td>Spanish CNVs  ("+ dataFields.pipeline +")</td></tr>" +
                            "<tr> <th >Chromosome</th><td>" + dataFields.chromosome + "</td></tr>" +
                            "<tr> <th >Locus</th><td>" + dataFields.start + "-" + dataFields.end + getNumBase( dataFields.start, dataFields.end )+"</td> </tr>" +
                            "<tr> <th >Type</th><td>" + dataFields.ty  + "</td> </tr>" +
                            "<tr> <th >Sample</th><td>" + (dataFields.sampleName !== undefined ? dataFields.sampleName : "")+ "</td></tr>" +
                            "<tr> <th>Score</th> <td class=\"igv-popover-td\">" + dataFields.score + "</td> </tr>" +
                            "<tr> <th>Frequency overlap</th> <td class=\"igv-popover-td\">" + dataFields.freqOverlap + "</td> </tr>" ;

                        if(dataFields.copy !== undefined && dataFields.copy !== "" &&  dataFields.copy !== 0)
                            markup +="<tr> <th>Num copy</th> <td>" + dataFields.copy+ "</td></tr>" ;

                        if (i+1 < listDataFields.length)
                            markup +="<tr><td  colspan='2'><hr></td></tr>";

                        i=i+1;

                    });
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
          .filter(t => t.name === 'CNVs');
    let listNextTracksCNVs =  props.tracks
          .filter(t => t.name === 'CNVs');
     if (listPreviosTracksCNVs.length > 0 &&
         listNextTracksCNVs.length > 0 &&
         listPreviosTracksCNVs[0].source.body !== listNextTracksCNVs[0].source.body){
         let tracksUpdate =  this.browser.trackViews
             .filter(view => view.track.id === 'CNVs')
             .map(view => view.track);
         this.browser.removeTrack(tracksUpdate[0]);
         this.browser.loadTrack(JSON.stringify(listNextTracksCNVs[0],removeSpecialChar));
     }


       }

  render() {
    return (
      <div className='IGVBrowser' ref={e => e && (this.element = e)} />


    )
  }
}

const isNumberStringValid = x => !!x && 0 < x.trim().length && !isNaN(x);


function getTracks(props) {
    // return props.tracks;props.showGenes ? props.tracks.concat(genesTrack) : props.tracks

    return props.tracks.sort(function(a, b){
        if ((a.order === null && b.order === null) || (a.order === undefined && b.order === undefined)) return 1;
        if ((a.order === null && b.order !== null) || (a.order === undefined && b.order !== undefined)) return -1;
        if ((a.order !== null && b.order === null) || (a.order !== undefined && b.order === undefined)) return 1;
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