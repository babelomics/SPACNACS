import React from "react";
import PropTypes from "prop-types";
import IGVBrowser from "./IGVBrowser";
import config from './../../../../config';



function showDataGraphic (data){
    if (data === undefined)
        return "";
    let jsonData = JSON.parse(data);

    if (jsonData.hasOwnProperty("results")) {
        jsonData.results.forEach(d => {
            d.start = d.start - 1;
        });
        return jsonData.results;
    } else {
        jsonData.forEach(d => {
            d.start = d.start - 1;
        });
        return jsonData;
    }
    return jsonData;
}


function translateFilterToServer( filter, options) {
    const serverFilter = {
    };

    // filter only chromosome
    serverFilter.cnv=[];
    serverFilter.cnv.push({"chromosome":"$CHR"} );

    if (!!filter && !!filter.phenotypes && 0 < filter.phenotypes.length) {
        filter.phenotypes.forEach(s => {
            if (s.annotationField === "all") {
                if (s.searchText !== "")
                    serverFilter[s.annotationField] = s.searchText;
            } else {
                if (serverFilter[s.annotationField] === undefined)
                    serverFilter[s.annotationField] = []
                serverFilter[s.annotationField].push(s.id);
            }
        });

    }

     if (!!filter && 0 < (filter.variantTypes || []).length) {
            serverFilter.variantTypes = filter.variantTypes;
    }


    if (!!filter && 0 < (( filter.clinvars) || []).length) {
        //outFilter.clinicalSignificance = inFilter.clinvars.join(",");
        serverFilter.clinicalSignificance = filter.clinvars;
    }

    const outFilters = [];
    if (!!filter && !!filter.populationFrequency && filter.populationFrequency.length > 0) {
        filter.populationFrequency.forEach(popFreq =>{
            if ((isNumberStringValid(popFreq.min) || popFreq.min === "") &&
                (isNumberStringValid(popFreq.max) || popFreq.max ==="") && (popFreq.min !== "" || popFreq.max !== "") ) {
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


    if (!!filter && 0 < (filter.sequencingTypes || []).length) {
        const sequencingTypesFilters = [];
        filter.sequencingTypes.forEach( g => {
            sequencingTypesFilters.push(g.id);
        });
        serverFilter.sequencingTypes = sequencingTypesFilters;
    }

    if (!!filter && !!filter.pipeline) {
        serverFilter.pipeline = filter.pipeline.id;
    }

    console.log("Search all", serverFilter);
    return serverFilter;
}

const isNumberStringValid = x => !!x && 0 < x.trim().length && !isNaN(x);


const ViewerManager = (props) => {
    let locus = props.locusVariant;

    if (!!props.locusVariant) {
        const p = props.locusVariant.split(":")[1];
        const l = {
            c: props.locusVariant.split(":")[0]
        };
        if (p !== undefined) {
            l.s = p.split("-")[0];
            l.e = p.split("-")[1];

            locus = l.c + ":" + l.s + "-"+l.e;
        } else {
            locus = l.c;
        }
    }

    const listTracksS = [
        {
            name: "CNVs",
            type: "mut",
            format: "seg",
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
                "num_copy":"",
                "pipeline":""
            },
            supportQueryParameters:true,
            url: props.url,
            sourceType: "custom",

            supportsWholeGenome:false,
            description: "<table style='text-align: left; padding:15px'>" +
                    "<tr>" +
                    "<td><div class='Legend' style='background-color:#ff2101'></div></td><td style='min-width:150px'>DEL</td>" +
                    "<td><div class='Legend' style='background-color:#028401' ></div></td><td style='min-width:150px'>DUP</td>" +
                    "</tr>" +
                    "</table>",
            source: {
                url: props.url,
                queryable: true,
                method: "POST",
                contentType: "application/json",
                body: JSON.stringify(translateFilterToServer(props.filters, null)),

                // Igv type bed add +1 in start to show graphic (it does not work, modifiy igv
                parser: showDataGraphic,
                mappings:{ chr: "chromosome", start: "start", end: "end",  value: "ty", sample: "sampleName" }
            },
            colorTable: {

                "dup": "#028401",
                "del": "#ff2101"
            }

        }
    ];
    const listTracksM = [
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


    let listShowTracks = props.multisample ? listTracksM : listTracksS;
    listShowTracks= listShowTracks.concat(props.genomes[props.genome].tracks);


    return (
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