const config = Object.freeze({
    opencga: {
        // url: "http://192.168.150.151:8080/opencga-test/webservices/rest",
        //	url: "http://192.168.150.156:8080/opencga-1.4.0-rc2/webservices/rest",
        url: "http://192.168.150.147:9090/opencga-1.3.8/webservices/rest",
        majorVersion: 1,
        minorVersion: 4,
        cgaplusUrl: 'http://192.168.150.156:9090',
        cnvsUrl: 'http://192.168.150.147:8888/prioCNVs/webservices/rest',
        version: "1.3.8"
    },/*
  cellbase: {
    url: "http://192.168.150.32:8080/cellbase/webservices/rest/v4-dev/hsapiens/"
  },*/
    cnv: {
        //url: "http://192.168.150.147:8888/prioCNVs/webservices"
        url: "http://192.168.150.147:8888/prioCNVs/webservices/rest",
        title: "SPAnish Copy Number Alteration Collaborative Server",
        shortTitle: "SPACNACS"
    },
    default: {
        /*project: {
          scientificName: "FPyS",
          assembly: "grh37",
        },*/
        igv: {
            locus: "chr1:500",
            showSampleNames: false,
            genomes: {
                hg19: {
                    id: "hg19 Lite",
                    name: "Human (CRCh37/hg19)",
                    //fastaURL: "https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/hg19/hg19.fasta",
                    //indexURL: "http://192.168.150.147:3000/static/media/hg19.fasta.dd1286ce.fai",
                    //indexURL: "https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/hg19/hg19.fasta.fai",
                    fastaURL: "http://192.168.150.147:3000/spacnacs/downloads/hg19.fasta",
                    indexURL: "http://192.168.150.147:3000/spacnacs/downloads/hg19.fasta.fai",
                    cytobandURL: "http://192.168.150.147:3000/spacnacs/downloads/cytoBand.txt",
                    //cytobandURL: "http://192.168.150.147:3000/static/media/cytoBandColor.cf91e53d.txt",
                    loadDefaultGenomes: false,
                    tracks: [
                        {
                            name: "cytobands",
                            format: "bed",
                            // format: "seg",
                            // format: "annotation",
                            //format: "clinVarMain",

                            url:  "http://192.168.150.147:3000/spacnacs/downloads/cytoBandColor.txt",
                            visibilityWindow: -1,
                            removable: true,
                            order: 1,
                            displayMode: "COLLAPSED",
                            autoHeight: true,
                            colorBy: {
                                field: "color",
                                pallete: {
                                    "1": "rgb(0,0,0)", // modify "0" because this color no paint igv
                                    "57": "rgb(57,57,57)",
                                    "115": "rgb(115,115,115)",
                                    "172": "rgb(172,172,172)",
                                    "230": "rgb(230,230,230)",
                                    "150": "rgb(150, 10, 10)"
                                }
                            },
                            resultsField : {
                                Name: "",
                                Location: "",
                            },
                            description: function description() {
                                let result = "<table style='text-align: left; padding:15px'>" +
                                    "<tr>" +
                                    "<td>Human reference GRCh37/hg19 cytoband file from UCSC Genome Browser</td>" +
                                    "</tr>" +
                                    "</table>" ;
                                return result;
                            },
                        },

                        {
                            name: "Refseq Genes",
                            format: "refgene",
                            url: "https://s3.amazonaws.com/igv.org.genomes/hg19/refGene.sorted.txt.gz",
                            indexURL: "https://s3.amazonaws.com/igv.org.genomes/hg19/refGene.sorted.txt.gz.tbi",
                            visibilityWindow: -1,
                            removable: false,
                            order: 2,
                            displayMode: "COLLAPSED",
                            description: function description() {
                                let result = "<table style='text-align: left; padding:15px'>" +
                                    "<tr>" +
                                    "<td>NCBI Reference Sequences Database</td>" +
                                    "</tr>" +
                                    "</table>" ;
                                return result;
                            },
                        },

                       /* {
                            name: "Legend",
                            id: "legend",
                            type:"annotation",
                            url:  "http://192.168.150.147:3000/cnv/downloads/legend.txt",
                            order: 6,
                            //autoHeight: true,
                            height: 40,
                            description: "Only deletion and duplication",
                            legend: "<table style='text-align: left; padding-top:15px'>" +
                            "<tr>" +
                            "<td><div class='Legend' style='background-color:#ff2101'></div></td><td style='min-width:150px'>DEL</td>" +
                            "<td><div class='Legend' style='background-color:#028401' ></div></td><td style='min-width:150px'>DUP</td>" +
                            "<td><div class='Legend' style='background-color:#40E0D0' ></div></td><td style='min-width:150px'>MCNVs</td>" +
                            "</tr>" +
                            "</table>"
                        },*/
                        {
                            name: "Gnomad",
                            id: "gnomad",
                            format: "vcf",
                            //url:"http://localhost:3000/static/media/gnomad_v2.1_sv.sites_summary.vcf.22d9f468.gz",
                            ///mnt/lustre/scratch/CBRA/projects/SVs_DDBB/resources/gnomad_v2.1_sv.controls_only.sites.filtered.vcf.gz
                            url: "http://192.168.150.147:3000/spacnacs/downloads/gnomad_v2.1_sv.controls_only.sites.filtered.vcf.gz",
                            indexURL: "http://192.168.150.147:3000/spacnacs/downloads/gnomad_v2.1_sv.controls_only.sites.filtered.vcf.gz.tbi",
                            //Origin url: "https://gnomad-public-us-east-1.s3.amazonaws.com/papers/2019-sv/gnomad_v2.1_sv.sites.vcf.gz",
                            //Origin indexURL: "https://gnomad-public-us-east-1.s3.amazonaws.com/papers/2019-sv/gnomad_v2.1_sv.sites.vcf.gz.tbi",
                            visibilityWindow: -1,
                            removable: false,
                            order: 7,
                            autoHeight: true,
                            description: function description() {
                                let result = "<table style='text-align: left; padding:15px'>" +
                                    "<tr>" +
                                    "<td><div class='Legend' style='background-color:#ff2101'></div></td><td style='min-width:150px'>DEL</td>" +
                                    "<td><div class='Legend' style='background-color:#028401' ></div></td><td style='min-width:150px'>DUP</td>" +
                                    "<td><div class='Legend' style='background-color:#40E0D0' ></div></td><td style='min-width:150px'>MCNV</td>" +
                                    "</tr>" +
                                    "</table>" ;
                                return result;
                            },
                            displayMode:"EXPANDED",
                            // variantColorBy:"SVTYPE",
                            color: function getCytobandColor(data) {
                                let dataType = "";
                                if (data != null && data.info != null && data.info.SVTYPE != undefined){
                                    dataType = data.info.SVTYPE;
                                    switch (dataType){
                                        case "DEL":
                                            return "#ff2101";
                                        case "DUP":
                                            return "#028401";
                                        case "MCNV":
                                            return "#40E0D0";
                                        default:
                                            return "black";
                                    }
                                }
                            },
                            resultsField : {
                                AFR_AF: "",
                                AFR_AF: "",
                                AFR_AC: "",
                                AFR_AN: "",
                                AFR_N_HOMALT: "",
                                AMR_AF: "",
                                AMR_AC: "",
                                AMR_AN: "",
                                AMR_N_HOMALT: "",
                                EAS_AF: "",
                                EAS_AC: "",
                                EAS_AN: "",
                                EAS_N_HOMALT: "",
                                EUR_AF: "",
                                EUR_AC: "",
                                EUR_AN: "",
                                EUR_N_HOMALT: "",
                                OTH_AF: "",
                                OTH_AC: "",
                                OTH_AN: "",
                                OTH_N_HOMALT: "",
                                AF: "",
                                AC: "",
                                AN: "",
                                N_HOMALT: "",
                                Chr:"",
                                Loc:"",
                                SVTYPE:"",
                                MALE_AF: "",
                                MALE_AC: "",
                                MALE_AN: "",
                                MALE_N_HOMALT: "",
                                MALE_N_HET: "",
                                MALE_N_HEMIALT: "",
                                MALE_FREQ_HOMALT: "",
                                MALE_FREQ_HET: "",
                                MALE_FREQ_HEMIALT: "",
                                FEMALE_AF: "",
                                FEMALE_AC: "",
                                FEMALE_AN: "",
                                FEMALE_N_HOMALT: "",
                                FEMALE_N_HET: "",
                                FEMALE_FREQ_HOMALT: "",
                                FEMALE_FREQ_HET: "",
                            },
                        },


                        {
                            name: "1000GP",
                            id: "1000GP",
                            format: "vcf",
                            url: "http://192.168.150.147:3000/spacnacs/downloads/ALL.wgs.integrated_sv_map_v2.20130502.svs.genotypes.filtered.vcf.gz",
                            indexURL: "http://192.168.150.147:3000/spacnacs/downloads/ALL.wgs.integrated_sv_map_v2.20130502.svs.genotypes.filtered.vcf.gz.tbi",
                            //ALL url: "http://localhost:3000/static/media/ALL.wgs.integrated_sv_map_v2.20130502.svs.genotypes.vcf.b7fe9b3e.gz",
                            //ALL indexURL: "http://localhost:3000/static/media/ALL.wgs.integrated_sv_map_v2.20130502.svs.genotypes.vcf.gz.5bd8a94d.tbi",
                            //Origin url: "ftp://ftp-trace.ncbi.nih.gov/1000genomes/ftp/phase3/integrated_sv_map/ALL.wgs.integrated_sv_map_v2.20130502.svs.genotypes.vcf.gz",

                            visibilityWindow: -1,
                            removable: false,
                            order: 9,
                            autoHeight: true,
                            description: function description() {
                                let result = "<table style='text-align: left; padding:15px'>" +
                                    "<tr>" +
                                    "<td><div class='Legend' style='background-color:#ff2101'></div></td><td style='min-width:150px'>DEL</td>" +
                                    "<td><div class='Legend' style='background-color:#028401' ></div></td><td style='min-width:150px'>DUP</td>" +
                                    "<td><div class='Legend' style='background-color:#40E0D0' ></div></td><td style='min-width:150px'>CNV</td>" +
                                    "</tr>" +
                                    "</table>" ;
                                return result;
                            },
                            //displayMode:"SQUISHED",
                            displayMode:"EXPANDED",
                            //variantColorBy:"SVTYPE",
                            color: function getCytobandColor(data) {
                                let dataType = "";
                                if (data != null && data.info != null && data.info.SVTYPE != undefined){
                                    dataType = data.info.SVTYPE;
                                    switch (dataType){
                                        case "DEL":
                                            return "#ff2101";
                                        case "DUP":
                                            return "#028401";
                                        case "DEL_ALU":
                                            return "#ff2101";
                                        case "DEL_HERV":
                                            return "#ff2101";
                                        case "DEL_LINE1":
                                            return "#ff2101";
                                        case "DEL_SVA":
                                            return "#ff2101";
                                        case "CNV":
                                            return "#40E0D0";
                                        default:
                                            return "black";
                                    }
                                }
                            },
                            resultsField:{
                                Chr: "",
                                Loc: "",
                                Ref: "",
                                Alt: "",
                                SVTYPE: "",
                                AC: "",
                                AF: "",
                                NS: "",
                                AN: "",
                                EAS_AF: "",
                                EUR_AF: "",
                                AFR_AF: "",
                                AMR_AF: "",
                                SAS_AF: "",
                                SITEPOST: "",
                            }
                        },



                        {
                            name: "Regulatory regions",
                            type: "variant",
                            format: "gff",
                            // old origin -> http://ftp.ensembl.org/pub/grch37/current/regulation/homo_sapiens/homo_sapiens.GRCh37.Regulatory_Build.regulatory_features.20201218.gff.gz
                            // old  url:"http://192.168.150.147:3000/static/media/homo_sapiens.GRCh37.Regulatory_Build.regulatory_features.20201218.gff.d1ce4149.gz",
                            // origin --> /mnt/lustre/scratch/CBRA/projects/prioCNVs/data/homo_sapiens.GRCh37.Regulatory_Build.regulatory_features.20201218.sorted.gff


                            url: "http://192.168.150.147:3000/spacnacs/downloads/homo_sapiens.GRCh37.Regulatory_Build.regulatory_features.20201218.sorted.gff",
                            indexURL: "http://192.168.150.147:3000/spacnacs/downloads/homo_sapiens.GRCh37.Regulatory_Build.regulatory_features.20201218.sorted.gff.idx",

                            visibilityWindow: -1,
                            removable: false,
                            order: 11,
                            autoHeight: true,
                            displayMode:"EXPANDED",
                            color: function getCytobandColor(data) {
                                let dataType = "";
                                if (data != null && data.type != undefined){
                                    dataType = data.type.toLowerCase();
                                    switch (dataType){
                                        case "promoter":
                                            return "#FF0000";
                                        case "promoter_flanking_region":
                                            return "#FF6969";
                                        case "enhancer":
                                            return "#FACA00";
                                        case "ctcf_binding_site":
                                            return "#40E0D0";
                                        case "tf_binding_site":
                                            return "#CD96CD";
                                        case "open_chromatin_region":
                                            return "#D9D9D9";
                                        default:
                                            return "black";
                                    }
                                }
                            },
                            description: function description() {
                                let result = "<table style='text-align: left; padding:15px'>" +
                                    "<tr>" +
                                    "<td><div class='Legend' style='background-color:#FF0000'></div></td><td style='min-width:150px'>promoter</td>" +
                                    "<td><div class='Legend' style='background-color:#FF6969' ></div></td><td style='min-width:150px'>promoter_flanking_region</td>" +
                                    "<td><div class='Legend' style='background-color:#FACA00' ></div></td><td style='min-width:150px'>enhancer</td>" +
                                    "</tr>" +
                                    "<tr>" +
                                    "<td ><div class='Legend' style='background-color:#40E0D0'></div></td><td >ctcf_binding_site</td>" +
                                    "<td ><div class='Legend' style='background-color:#CD96CD'></div></td><td>tf_binding_site</td>" +
                                    "<td ><div class='Legend' style='background-color:#D9D9D9'></div></td><td>open_chromatin_region</td>" +
                                    "</tr>" +
                                    "</table>" ;
                                return result;
                            }
                        },
/*
                        {
                            name: "Legend regulatory regions",
                            id: "legendRegulatoryRegions",
                            type:"annotation",
                            url: "http://192.168.150.147:3000/cnv/downloads/legend.txt",
                            order: 12,
                            //autoHeight: true,
                            height: 50,
                            description: "Lengend regulatory features",
                            legend: "<table style='text-align: left; padding-top:15px'>" +
                            "<tr>" +
                            "<td><div class='Legend' style='background-color:#FF0000'></div></td><td style='min-width:150px'>promoter</td>" +
                            "<td><div class='Legend' style='background-color:#FF6969' ></div></td><td style='min-width:150px'>promoter_flanking_region</td>" +
                            "<td><div class='Legend' style='background-color:#FACA00' ></div></td><td style='min-width:150px'>enhancer</td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td ><div class='Legend' style='background-color:#40E0D0'></div></td><td >ctcf_binding_site</td>" +
                            "<td ><div class='Legend' style='background-color:#CD96CD'></div></td><td>tf_binding_site</td>" +
                            "<td ><div class='Legend' style='background-color:#D9D9D9'></div></td><td>open_chromatin_region</td>" +
                            "</tr>" +
                            "</table>"
                        },*/

                        {
                            name: "Clinvar",
                            format: "bed",
                            delimiter:"\t",
                            // Igv type bed add +1 in start to show graphic
                            url:  "http://192.168.150.147:3000/spacnacs/downloads/variant_summary_grch37_dup_del_less1.txt",
                            visibilityWindow: -1,
                            removable: true,
                            order: 14,
                            displayMode: "SQUISHED",
                            height: 250,
                            resultsField : {
                                Location: "",
                                Type:"",
                                ClinicalSignificance:"",
                                PhenotypeList:"",
                                Assembly: "",
                                ReviewStatus:""
                            },
                            description: function description() {
                                let result = "<table style='text-align: left; padding:15px'>" +
                                    "<tr>" +
                                    "<td><div class='Legend' style='background-color:#FF0000'></div></td><td style='min-width:150px'>Pathogenic</td>" +
                                    "<td><div class='Legend' style='background-color:#FE8787' ></div></td><td style='min-width:150px'>Likely pathogenic</td>" +
                                    "<td ><div class='Legend' style='background-color:grey'></div></td><td>Others</td>" +
                                    "</tr>" +
                                    "<tr>" +
                                    "<td ><div class='Legend' style='background-color:#028401'></div></td><td style='min-width:150px'>Bening</td>" +
                                    "<td ><div class='Legend' style='background-color:#91EE91'></div></td><td>Likely bening</td>" +
                                    "</tr>" +
                                    "</table>" ;
                                return result;
                            }
                        },
                       /* {
                            name: "Legend Clinvar",
                            id: "legendClinvar",
                            type:"annotation",
                            url: "http://192.168.150.147:3000/cnv/downloads/legend.txt",
                            order: 15,
                            //autoHeight: true,
                            height: 70,
                            description: "Lengend clinical significance",
                            legend: "<table style='text-align: left; padding-top:15px'>" +
                            "<tr>" +
                            "<td><div class='Legend' style='background-color:#FF0000'></div></td><td style='min-width:150px'>Pathogenic</td>" +
                            "<td><div class='Legend' style='background-color:#FE8787' ></div></td><td style='min-width:150px'>Likely pathogenic</td>" +
                            "<td ><div class='Legend' style='background-color:grey'></div></td><td>Others</td>" +
                            "</tr>" +
                            "<tr>" +
                            "<td ><div class='Legend' style='background-color:#028401'></div></td><td style='min-width:150px'>Bening</td>" +
                            "<td ><div class='Legend' style='background-color:#91EE91'></div></td><td>Likely bening</td>" +
                            "</tr>" +
                            "</table>"
                        },*/


                    ]
                }
            },
            genome:"hg19",
            data: {},
            percentage: 5,
//  "percentage" variable % focus in the locus segment, igv viewer
        },
        pageSize:5,
        page: 0,
        maxPages:5,
    }
});


export default config;