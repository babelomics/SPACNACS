import React from "react";
import PropTypes from "prop-types";
import IGVBrowser from "./IGVBrowser";
import config from './../../../../config';

// import Sticky from 'react-stickynode';

// sticky state handler 
// const handleStateChange = (status) => {
//     if (status.status === Sticky.STATUS_FIXED) {
//         return 'the component is sticky';
//     }
//     if (status.status === Sticky.STATUS_ORIGINAL) {
//         return 'the component in the original position';
//     }
//     return 'the component is released'
// }

function percent(start, end, porc) {
    let c = (parseFloat(end) - parseFloat(start)) * parseFloat(porc);
    return parseFloat(c);
}
/*
function showDataGraphic () {
    let f = function  (data){
        if (data === undefined)
            return "";
        let jsonData = JSON.parse(data);
        let i = 0;
        console.log(jsonData);
        if (jsonData.hasOwnProperty("results")) {
            jsonData.results.forEach(d => {
                d.start = d.start - 1;
            });
            console.log(jsonData);
            return jsonData.results;
        } else {
            jsonData.forEach(d => {
                d.start = d.start - 1;
            });
            console.log(jsonData);
            return jsonData;
        }
        return jsonData;
    };

    return f
}
*/
function showDataGraphic (data){
    if (data === undefined)
        return "";
    let jsonData = JSON.parse(data);
    let i = 0;
    console.log(jsonData);
    if (jsonData.hasOwnProperty("results")) {
        jsonData.results.forEach(d => {
            d.start = d.start - 1;
        });
        console.log(jsonData);
        return jsonData.results;
    } else {
        jsonData.forEach(d => {
            d.start = d.start - 1;
        });
        console.log(jsonData);
        return jsonData;
    }
    return jsonData;
}


function translateFilterToServer( filter, options) {
    const serverFilter = {
       // includeSample: !!filter && filter.samples || [],
    };
/*
    if (!!filter && !!filter.groups) {
        serverFilter.groups = filter.groups.groups;
    }
    if (!!filter && !!filter.optionsView && !!filter.optionsView.selectedView) {
        serverFilter.selectedView = filter.optionsView.selectedView;
    }*/


    if (!!filter && !!filter.phenotypes && 0 < filter.phenotypes.length) {
        //serverFilter['phenotypes'] = filter.phenotypes;
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

    /*
    if (!!filter && !!filter.search) {
        if (!!filter.search.search) {
            filter.search.search.forEach(s => {
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
        if (!!filter.search.sort &&   (filter.search.sort || []).length > 0) {
            serverFilter.sort = [];
            filter.search.sort.forEach(s => {
                serverFilter.sort.push(s.option == "asc" ? "" + s.sortField :"-" + s.sortField);

            });
        }
    }*/
    // TODO: filter only chromosome
   /* if (!!filter && 0 < (filter.genomicRegions || []).length) {

        //serverFilter.genomicRegions=[];
        //serverFilter.genomicRegions.push(options.chr.substring(3) + ":" + options.start + "-" + options.end );
        serverFilter.cnv=[];
        serverFilter.cnv.push({"c":filter.genomicRegions[0].split(":")[0].toLowerCase().replace("chr","")} );
    }*/

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
            ));*/


     if (!!filter && 0 < (filter.variantTypes || []).length) {
            serverFilter.variantTypes = filter.variantTypes;
    }



    if (!!filter && 0 < (( filter.clinvars) || []).length) {
        //outFilter.clinicalSignificance = inFilter.clinvars.join(",");
        serverFilter.clinicalSignificance = filter.clinvars;
    }

    /*
        if (!!filter && 0 < (filter.consequenceTypes || []).length) {
            serverFilter['annot-ct'] = filter.consequenceTypes.join(",");
        }*/
/*
    if (!!filter && 0 < (filter.vcfMetrics || []).length) {
        serverFilter.filter = filter.vcfMetrics.join(",");
    }*/

    const outFilters = [];
    if (!!filter && !!filter.populationFrequency && filter.populationFrequency.length > 0) {
        filter.populationFrequency.forEach(popFreq =>{
            if ((isNumberStringValid(popFreq.min) || popFreq.min == "") &&
                (isNumberStringValid(popFreq.max) || popFreq.max=="") && (popFreq.min !="" || popFreq.max !="") ) {
                console.log("popFreq"+popFreq)
                outFilters.push(popFreq);
            }
        });
    }

    if (0 < outFilters.length) {
        serverFilter['populationFrequency'] = outFilters;// outFilters.join(";");
    }

    if (!!filter && 0 < (filter.genders || []).length) {
        const genederFilters = [];
        filter.genders.forEach(g=>{
            genederFilters.push(g.id);
        });
        serverFilter.genders = genederFilters;
    }

    if (!!filter && 0 < (filter.subpopulations || []).length) {
        const subpopulationsFilters = [];
        filter.subpopulations.forEach(g=>{
            subpopulationsFilters.push(g.id);
        });
        serverFilter.subpopulations = subpopulationsFilters;
    }
    if (!!filter && 0 < (filter.phenotypesSample || []).length) {
        const phenotypeSampleFilters = [];
        filter.phenotypesSample.forEach(g=>{
            phenotypeSampleFilters.push(g.id);
        });
        serverFilter.phenotypesSample = phenotypeSampleFilters;
    }

    console.log("Search all", serverFilter);
    return serverFilter;
}

const isNumberStringValid = x => !!x && 0 < x.trim().length && !isNaN(x);


const ViewerManager = (props) => {
    /*const locus = !!props.expanded && props.expanded.length > 0 ?
        props.expanded.slice(-1)[0].chromosome + ":" +
        (parseFloat(props.expanded.slice(-1)[0].start) - percent(props.expanded.slice(-1)[0].start, props.expanded.slice(-1)[0].end, props.percentage)) + "-" +
        (parseFloat(props.expanded.slice(-1)[0].end) + percent(props.expanded.slice(-1)[0].start, props.expanded.slice(-1)[0].end, props.percentage)) : props.locus;*/

    let locus = props.locusVariant;

    if (!!props.locusVariant) {
        const p = props.locusVariant.split(":")[1];
        const l = {
            c: props.locusVariant.split(":")[0]
        };
        if (p!= undefined){
            l.s = p.split("-")[0];
            l.e = p.split("-")[1];

            locus = l.c + ":" + l.s + "-"+l.e;
            /*locus = l.c + ":" +
                (parseFloat(l.s) - percent(l.s, l.e, props.percentage)) + "-" +
                (parseFloat(l.e) + percent(l.s, l.e, props.percentage));*/
        } else {
            locus = l.c;

        }
    }


    // annotation, wig, aligment, variant, seg

    const listTracksTemp = [];
    const listTracksS = [
        {
            name: "CNVs",
            type: "mut",
            format: "seg",
           // url:  `${props.url}&typeGroups=INDEX`,
            indexed: false,
            isLog: true,
            displayMode: "EXPANDED",
            height: 250,
            order: 3,
            resultsField : {
                Sample:"",
                sampleName:"",
                chr: "",
                start:"",
                end:"",
                Locus: "",
                ty: "",
                "DEL/DUP": "",
                score:"",
                freqOverlap:"",
                "num_copy":""
            },
            supportsWholeGenome:false,
            description: "<table style='text-align: left; padding:15px'>" +
                    "<tr>" +
                    "<td><div class='Legend' style='background-color:#ff2101'></div></td><td style='min-width:150px'>DEL</td>" +
                    "<td><div class='Legend' style='background-color:#028401' ></div></td><td style='min-width:150px'>DUP</td>" +
                    "</tr>" +
                    "</table>",
            source: {
                url: props.url,
                 //function (options) {
                   // console.log(options, "options");
                   // console.log("props",props);

                   // const bodyParams = JSON.stringify(translateFilterToServer(props.filters, options));
                    //let sort =!!props.filters && !!v.filters.sort && props.filters.sort.length > 0 ? props.filters.sort.join(",") : "CNV";


                    // const chr = options.chr.startsWith("chr") ? options.chr.substring(3) : options.chr;


                    //return props.url;
                //},
                method: "POST",
                contentType: "application/json",
                body: JSON.stringify(translateFilterToServer(props.filters, null)),
                /*body:
                    function (options) {
                        console.log(options, "body options");
                        console.log("body props",props);

                        // const bodyParams = JSON.stringify(translateFilterToServer(props.filters, options));
                        //let sort =!!props.filters && !!v.filters.sort && props.filters.sort.length > 0 ? props.filters.sort.join(",") : "CNV";


                        // const chr = options.chr.startsWith("chr") ? options.chr.substring(3) : options.chr;


                        return JSON.stringify(translateFilterToServer(props.filters, null));
                    },
*/
                //body: "{}",

                // Igv type bed add +1 in start to show graphic (it does not work, modifiy igv
                parser: showDataGraphic,
                mappings:{ chr: "chromosome", start: "start", end: "end", sample: "fileId", value: "ty", sample: "sampleName" }
            },

            displayMode: "EXPANDED",
            colorTable: {

                "dup": "#028401",
                "del": "#ff2101"
            }

           /* color: function(feature) {
                var c;
                if ("DEL" == feature.ty){
                    c = "rgb(255,0,0)"
                }
                if ("DUP" == feature.ty){
                    c = "rgb(0,0,255)"
                }
                return c
            },*/
        }
    ];
    const listTracksM = [
        /*{
        type: "annotation",
        format: "gtf",
        url: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/gencode.v24lift37.annotation.sorted.gtf.gz",
        indexURL: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/gencode.v24lift37.annotation.sorted.gtf.gz.tbi",
        displayMode: "SQUISHED",
        name: "Gencode v24 (gtf)",
        visibilityWindow: 10000000
    },*/

        /*{
            name: "Genes",
            type: "annotation",
            format: "bed",
            sourceType: "file",
            url: "//igv.broadinstitute.org/annotations/hg19/genes/gencode.v18.collapsed.bed",
            indexURL: "//igv.broadinstitute.org/annotations/hg19/genes/gencode.v18.collapsed.bed.idx",
            displayMode: "EXPANDED"
        },*/
        {
            name: "CNs INDEX",
            type: "seg",
            format: "seg",
            url: props.url +"&typeGroups=INDEX",
            indexed: false,
            isLog: true,

            displayMode: "EXPANDED",
            height: 80,
            order: 4

        },
        {
            name: "CNVs STUDY",
            type: "seg",
            format: "seg",
            url: props.url + "&typeGroups=STUDY",
            indexed: false,
            isLog: true,
            displayMode: "EXPANDED",
            height: 80,
            order: 5
        },
        {
            name: "CNVs CONTROL",
            type: "seg",
            format: "seg",
            url: props.url + "&typeGroups=CONTROL", //"http://192.168.150.147:8888/prioCNVs/webservices/rest/prioritization/5dc1502af7db452b6b4dafd8/search?outputFormat=txt&limit=3&skip=1&filters=study=2,includeSample=97",
            indexed: false,
            isLog: true,
            displayMode: "EXPANDED",
            height: 80,
            order: 6
        }
    ];



    const listCommonsTracks = [
        /*{
        type: "annotation",
        format: "gtf",
        url: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/gencode.v24lift37.annotation.sorted.gtf.gz",
        indexURL: "https://s3.amazonaws.com/igv.broadinstitute.org/annotations/hg19/genes/gencode.v24lift37.annotation.sorted.gtf.gz.tbi",
        displayMode: "SQUISHED",
        name: "Gencode v24 (gtf)",
        visibilityWindow: 10000000
    },*/

        /*{
            name: "Genes",
            type: "annotation",
            format: "bed",
            sourceType: "file",
            url: "//igv.broadinstitute.org/annotations/hg19/genes/gencode.v18.collapsed.bed",
            indexURL: "//igv.broadinstitute.org/annotations/hg19/genes/gencode.v18.collapsed.bed.idx",
            displayMode: "EXPANDED"
        },*/
        {
            //type: "seg",
            //format: "seg",
            type: "seg",
           // format: "seg",
            url: props.url +"&typeGroups=INDEX", //"http://192.168.150.147:8888/prioCNVs/webservices/rest/prioritization/5dc1502af7db452b6b4dafd8/search?outputFormat=txt&limit=3&skip=1&filters=study=2,includeSample=97",
            indexed: false,
            isLog: true,
            name: "CNs INDEX",
            displayMode: "EXPANDED"

        }
    ];

    let listShowTracks = props.multisample ? listTracksM : listTracksS;
    listShowTracks= listShowTracks.concat(props.genomes[props.genome].tracks);


    return (
        // <React.Fragment>
        //     {/*}  <Sticky onStateChange={handleStateChange} top='#header' bottomBoundary='#content' innerZ='20'> {*/}

        //     <Paper style={{ margin: "1em" }}>
        //         <IGVBrowser locus={locus} genome={props.genome} />
        //     </Paper>
        //     {/*}  </Sticky> {*/}
        // </React.Fragment>

        <IGVBrowser
            reference={{
                //Comment id to load other url (no use hg19)
                id: props.genomes[props.genome].id ,
                name: props.genomes[props.genome].name,
                fastaURL:  props.genomes[props.genome].fastaURL,
                indexURL: props.genomes[props.genome].indexURL,
                cytobandURL:  props.genomes[props.genome].cytobandURL,
            }}
            locus={locus}
            loadDefaultGenomes={ props.genomes[props.genome].loadDefaultGenomes}
            showSampleNames ={props.showSampleNames}
            genome={props.genome}
            trackDefaults={{ alignment: { height: 150 } }}
            tracks={listShowTracks
                //props.multisample ? listTracksM : listTracksS
                // selectedEntries
                //     .filter(([file, selected]) => selected)
                //     .map(([file, _]) => ({
                //         name: (file.match(/[^/]+$/) || [file])[0],
                //         url: `/files/${file}`
                //     }))
            }
            showGenes={true}
            addGenomicRegion={props.addGenomicRegion}
            removeGenomicRegion={props.removeGenomicRegion}
        />

    );
};

ViewerManager.defaultProps = {
    locus: config.default.igv.locus,
    percentage: config.default.igv.percentage,
    //  "percentage" % en el segmento del locus
    genome: config.default.igv.genome,
    genomes: config.default.igv.genomes,
    data: config.default.igv.data,
};

ViewerManager.propTypes = {
    locus: PropTypes.string.isRequired,
    genome: PropTypes.string.isRequired,
    genomes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    addGenomicRegion: PropTypes.func,
    removeGenomicRegion: PropTypes.func,
    filter: PropTypes.object
};

export default ViewerManager;