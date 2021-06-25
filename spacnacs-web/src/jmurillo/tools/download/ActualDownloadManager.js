import React from 'react';

import getUrlParam from "./../../common/getUrlParam";

import legend from './../../../downloads/grch37/legend.txt';
import hg19 from './../../../downloads/grch37/hg19.fasta.fai';
import cytoBand from './../../../downloads/grch37/cytoBand.txt';
import cytoBandColor from './../../../downloads/grch37/cytoBandColor.txt';
//import gnomad from './../../../downloads/grch37/gnomad_v2.1_sv.sites.vcf.gz';
//import gnomadIndex from './../../../downloads/grch37/gnomad_v2.1_sv.sites.vcf.gz.tbi';
//import gnomad_summary from './../../../downloads/grch37/gnomad_v2.1_sv.sites_summary.vcf.gz';

import gnomad from './../../../downloads/grch37/gnomad_v2.1_sv.controls_only.sites.filtered.vcf.gz';
import gnomadIndex from './../../../downloads/grch37/gnomad_v2.1_sv.controls_only.sites.filtered.vcf.gz.tbi';

import clinicalSignificance from './../../../downloads/grch37/variant_summary_grch37.txt';
import clinicalSignificanceTmp from './../../../downloads/grch37/variant_summary_grch37_tmp.txt';



//import regulatoryFeatures from './../../../downloads/grch37/homo_sapiens.GRCh37.Regulatory_Build.regulatory_features.20201218.gff.gz';


import regulatoryFeatures from './../../../downloads/grch37/homo_sapiens.GRCh37.Regulatory_Build.regulatory_features.20201218.sorted.gff';
import regulatoryFeaturesIndex from './../../../downloads/grch37/homo_sapiens.GRCh37.Regulatory_Build.regulatory_features.20201218.sorted.gff.idx';


import legendRegulatoryFeatures from './../../../downloads/grch37/legendRegulatoryRegion.txt';

import _1000K from './../../../downloads/grch37/ALL.wgs.integrated_sv_map_v2.20130502.svs.genotypes.filtered.vcf.gz';
import _1000KIndex from './../../../downloads/grch37/ALL.wgs.integrated_sv_map_v2.20130502.svs.genotypes.filtered.vcf.gz.tbi';


class DownloadManager extends React.PureComponent {


    render() {
        const file = getUrlParam(this.props, "file");
        return (
            <div>
                {file == "legend" && <a href={legend} download={file}>{file}</a>}
                {file == "hg19" && <a href={hg19} download={file}>{file}</a>}
                {file == "gnomad" && <a href={gnomad} download={file}>{file}</a>}
                {file == "gnomadIndex" && <a href={gnomadIndex} download={file}>{file}</a>}
                {/*file == "gnomad_summary" && <a href={gnomad_summary} download={file}>{file}</a>*/}

                {file == "regulatoryFeatures" && <a href={regulatoryFeatures} download={file}>{file}</a>}
                {file == "regulatoryFeaturesIndex" && <a href={regulatoryFeaturesIndex} download={file}>{file}</a>}
                {file == "cytoBand" && <a href={cytoBand} download={file}>{file}</a>}
                {file == "cytoBandColor" && <a href={cytoBandColor} download={file}>{file}</a>}

                {file == "1000K" && <a href={_1000K} download={file}>{file}</a>}
                {file == "1000KIndex" && <a href={_1000KIndex} download={file}>{file}</a>}
                {file == "legendRegulatoryFeatures" && <a href={legendRegulatoryFeatures} download={file}>{file}</a>}

                {file == "clinicalSignificance" && <a href={clinicalSignificance} download={file}>{file}</a>}
                {file == "clinicalSignificanceTmp" && <a href={clinicalSignificanceTmp} download={file}>{file}</a>}
            </div>);
    }

}

export default DownloadManager;
