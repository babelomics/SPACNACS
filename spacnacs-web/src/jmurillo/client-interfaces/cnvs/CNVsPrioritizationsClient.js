// const translateGenotypeToServer = genotype => ({
// 	"R/R": "0/0,0",
// 	"R/A": "0/1,0/2,0/3,0/4,1",
// 	"A/A": "1/1,1/2,2/2,1/3,2/3,3/3,1/4,2/3,3/4,4/4,1",
// })[genotype] || genotype;

const translateVariantIdFromServer = variant => (
	variant.id || (((variant.annotation || {}).xrefs || []).find(xref => "dbSNP" === xref.source) || {}).id
);

function translateVariantFrequencyStudies(variant) {
    const outStudies = {};
    /*
    const inFrequencies = (!!variant &&  variant.popFreq) || [];
 	for (const inEntry of inFrequencies) {

        const studyName = inEntry.study;
        if (!outStudies.hasOwnProperty(studyName)) {
            outStudies[studyName] = {};
        }
        const outStudy = outStudies[studyName];
        outStudy[inEntry.population] = inEntry.altAlleleFreq;

    }*/
    if (!!variant && variant.frequencies) {
    	if( !! variant.frequencies.popFreq)
        	outStudies["popFreq"] = variant.frequencies.popFreq;
        if( !! variant.frequencies.cohortFreq)
            outStudies["cohortFreq"] = variant.frequencies.cohortFreq;
    }

	return outStudies;
}

function translateVariantConservation(variant) {
	const outConservation = {};
	const inConservationEntries = (!!variant.annotation && variant.annotation.conservation) || [];
	for (const inEntry of inConservationEntries) {
		outConservation[inEntry.source] = inEntry.score;
	}
	return outConservation;
}

// function fixSOTerm(soTerm) {
// 	if (["2KB_upstream_gene_variant", "2KB_upstream_variant"].includes(soTerm.name)) {
// 		return { accession: "SO:0001631", name: "upstream_gene_variant" };
// 	} else if (["2KB_downstream_gene_variant", "2KB_downstream_variant"].includes(soTerm.name)) {
// 		return { accession: "SO:0001632", name: "downstream_gene_variant" };
// 	} else {
// 		return soTerm;
// 	}
// }

function translateCnvGene(cnv) {
    let genes = [];
    const annotations = (!!cnv.listAnnotation && cnv.listAnnotation) || [];
    	annotations.filter(annotation => !!annotation.genes && annotation.genes).forEach(ann => {
            let resumeAnnGenes = ann.genes.map(g => {
            	let gr = {geneSymbol: g.geneSymbol, hgncId: g.hgncId};
            	if (g.hgncs !== null && g.hgncs !== undefined){
                    gr.listSynonyms=[];
            		g.hgncs.map(h => {
            			if (h.listSynonym !== null && h.listSynonym !== undefined){

							gr.listSynonyms.push(...h.listSynonym);
						}
					})
				}
            	return gr;
            });
            //genes = genes.concat(ann.genes)
            genes = genes.concat(resumeAnnGenes);
        }
	);
    return genes;
}

// function translateVariantSampleValues(variant, samples) {
// 	return (
// 		!!variant.studies &&
// 		1 === variant.studies.length &&
// 		!!variant.studies[0] &&
// 		samples.length === variant.studies[0].samplesData.length
// 		&& variant.studies[0].samplesData.map(sampleData => sampleData[0])
// 	) || samples.map(sample => "?/?");
// }

function translateVariantFunctionalScores(variant) {
	return ((!!variant.annotation && variant.annotation.functionalScore) || []).map(score => ({
		id: score.source,
		score: score.score,
	}));
}

function translateVariantFromServer(variant, samples) {
	// opencga variant format is very redundant; normalize it
	const outVariant = {
		id: translateVariantIdFromServer(variant),
		chromosome: variant.chromosome,
		start: variant.start,
		end: variant.end,
		ty: variant.ty || "",
		score: variant.score || "",
		copy: variant.copy || "",
		order: (!!variant.analysisData && variant.analysisData.order) || "",
		comments: (!!variant.addInfo && variant.addInfo.comments) || [],
        sampleId: (!!variant.sampleId && variant.sampleId) || "",
        genes: translateCnvGene(variant),
        annotations: (!!variant.listAnnotation && variant.listAnnotation) || [],
        listCNVsOverlapIndex: (!!variant.listCNVsOverlapIndex && variant.listCNVsOverlapIndex) || [],
        sumPathog: (!!variant.addInfo && variant.addInfo.sumPathog) || "",
		xrefs: (!!variant.annotation && variant.annotation.xrefs) || [],
		frequencyStudies: translateVariantFrequencyStudies(variant),
		conservation: translateVariantConservation(variant),
		//sampleValues: translateVariantSampleValues(variant, samples),
		functionalScores: translateVariantFunctionalScores(variant),
		variantTraitAssociation: (!!variant.annotation && variant.annotation.variantTraitAssociation) || [],
	};
	return outVariant;
}
/*
function translateFilterDeleteriousnessToServer(outFilter, inFilter) {
	// protein substitution scores
	const pss = [];
	const pssScoreNames = ['sift', 'polyphen'];
	for (const scoreName of pssScoreNames) {
		const score = (
			!!inFilter.deleteriousness &&
			!!inFilter.deleteriousness.proteinSubstitutionScores
			&& inFilter.deleteriousness.proteinSubstitutionScores[scoreName]
		) || {};
		if (!!score.type) {
			pss.push(`${scoreName}==${score.type.replace("-", "+")}`);
		} else {
			if (!!score.min || 0 === score.min) {
				pss.push(`${scoreName}>${score.min}`);
			}
			if (!!score.max || 0 === score.max) {
				pss.push(`${scoreName}<${score.max}`);
			}
		}
	}
	if (0 < pss.length) {
		outFilter.proteinSubstitution = pss.join(";");
	}

	// cadd score
	const outCaddScores = [];
	const inCaddRaw = (!!inFilter.deleteriousness && !!inFilter.deleteriousness.cadd && inFilter.deleteriousness.cadd.raw) || {};
	if (!!inCaddRaw.min || 0 === inCaddRaw.min) {
		outCaddScores.push(`cadd_raw>${inCaddRaw.min}`);
	}
	if (!!inCaddRaw.max || 0 === inCaddRaw.max) {
		outCaddScores.push(`cadd_raw<${inCaddRaw.max}`);
	}
	const inCaddScaled = (!!inFilter.deleteriousness && !!inFilter.deleteriousness.cadd && inFilter.deleteriousness.cadd.scaled) || {};
	if (!!inCaddScaled.min || 0 === inCaddScaled.min) {
		outCaddScores.push(`cadd_scaled>${inCaddScaled.min}`);
	}
	if (!!inCaddScaled.max || 0 === inCaddScaled.max) {
		outCaddScores.push(`cadd_scaled<${inCaddScaled.max}`);
	}
	if (0 < outCaddScores.length) {
		outFilter["annot-functional-score"] = outCaddScores.join(";");
	}
}


function translateFilterConservationToServer(outFilter, inFilter) {
	const outConservation = [];
	for (const score of (inFilter.conservationScores || [])) {
		if (!!score.min || 0 === score.min) {
			outConservation.push(`${score.id}>${score.min}`);
		}
		if (!!score.max || 0 === score.max) {
			outConservation.push(`${score.id}<${score.max}`);
		}
	}
	if (0 < outConservation.length) {
		outFilter.conservation = outConservation.join(";");
	}
}
*/

const isNumberStringValid = x => !!x && 0 < x.trim().length && !isNaN(x);

function translateFilterFrequenciesToServer(outFilter, inFilter) {
	const outFilters = [];
	for (const filter of (inFilter.populationFrequency || [])) {
		if (isNumberStringValid(filter.min)) {
			outFilters.push(`${filter.population}:${filter.subpopulation}>${filter.min}`);
		}
		if (isNumberStringValid(filter.max)) {
			outFilters.push(`${filter.population}:${filter.subpopulation}<${filter.max}`);
		}
	}
	if (0 < outFilters.length) {
		outFilter['alternate_frequency'] = outFilters.join(";");
	}
}


function translateFilterClinicalToServer(outFilter, inFilter) {
	if (0 < ((!!inFilter.clinical && inFilter.clinical.phenotypes) || []).length) {
		//outFilter['annot-hpo'] = inFilter.clinical.phenotypes.join(",");
		outFilter['hpo'] = inFilter.clinical.phenotypes;
	}

	if (0 < ((!!inFilter.clinical && inFilter.clinical.clinvars) || []).length) {
		//outFilter.clinicalSignificance = inFilter.clinical.clinvars.join(",");
		outFilter.clinicalSignificance = inFilter.clinical.clinvars;
	}
}

function translateFilterToServer(userId,  filter) {
	const serverFilter = {

		includeSample: !!filter && filter.samples || [],
	};

	if (!!filter && !!filter.groups) {
		serverFilter.groups = filter.groups.groups;
	}

    if (!!filter && !!filter.optionsView && !!filter.optionsView.selectedView) {
        serverFilter.selectedView = filter.optionsView.selectedView;
    }

	/*
    if ((filter.samples || []).some(sample => !!sample.typeGroups && 0 < sample.typeGroups.length)) {
    	let groupStudy= [];
    	let groupControl= [];


		filter.samples.filter(sample => !!sample.typeGroups && 0 < sample.typeGroups.length).map(
				sample => {
					if (!!sample.typeGroups.find(g => g === "S"))
						groupStudy.push(sample.sampleId);

					if (!!sample.typeGroups.find(g => g === "C"))
						groupControl.push(sample.sampleId);
				}
        );

        serverFilter.samples = groupStudy.concat(groupControl);

		/*
        serverFilter.groupControl = filter.samples.filter(sample => !!sample.typeGroups && 0 < sample.genotypes.length && !!sample.typeGroups.find(g=> g ==="C")).map(
            sample => sample.sampleId
        ).join(",");*
    }*/
	/*
		if ((filter.samples || []).some(sample => !!sample.genotypes && 0 < sample.genotypes.length)) {
			serverFilter.genotype = filter.samples.filter(sample => !!sample.genotypes && 0 < sample.genotypes.length).map(
				sample => `${sample.sampleId}:${sample.genotypes.map(translateGenotypeToServer).join(",")}`
			).join(";");
		}*/

	if (!!filter.search) {
        if (!!filter.search.search) {
            filter.search.search.forEach(s => {
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
         if (!!filter.search.sort &&   (filter.search.sort || []).length > 0) {
             serverFilter.sort = [];
             filter.search.sort.forEach(s => {
                 serverFilter.sort.push(s.option === "asc" ? "" + s.sortField :"-" + s.sortField);

             });
        }
	}

	if (!!filter.genomic) {
		if (!!filter.genomic.genomicRegions) {
            /*serverFilter.region = filter.genomic.regions.map(region => (
                `${region.chromosome}${!!region.start ? ":" + region.start : ""}${!!region.end ? "-" + region.end : ""}`
            )).join(',');*/

			serverFilter.genomicRegions = [];
			filter.genomic.genomicRegions.map(region => (
				serverFilter.genomicRegions.push(`${region.chromosome}${!!region.start ? ":" + region.start : ""}${!!region.end ? "-" + region.end : ""}`)
			));
		}
		if (0 < (filter.genomic.variantTypes || []).length) {
			serverFilter.variantTypes = filter.genomic.variantTypes;
		}
		if (0 < (filter.genomic.geneBiotypes || []).length) {
			serverFilter.biotype = filter.genomic.geneBiotypes.join(",");
		}
	}

	if (0 < (filter.consequenceTypes || []).length) {
		serverFilter['annot-ct'] = filter.consequenceTypes.join(",");
	}
	if (0 < (filter.vcfMetrics || []).length) {
		serverFilter.filter = filter.vcfMetrics.join(",");
	}

	translateFilterFrequenciesToServer(serverFilter, filter);
	//translateFilterConservationToServer(serverFilter, filter);
	//translateFilterDeleteriousnessToServer(serverFilter, filter);
	translateFilterClinicalToServer(serverFilter, filter);
    console.log("Search", serverFilter);
	return serverFilter;
}

// function translateOrderFromServer(variantId, order) {
// 	return {
// 		id: variantId,
// 		order: order
// 	}
// }

class CNVsPrioritizationsClient {

	constructor(parent) {
		this.parent = parent;
	}


	createPrioritization(userId, analysisId, abortSignal) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.parent.session.getToken(userId)}`,
        };

        if (!!this.parent.session.getToken(userId) && !!userId) {
			const params = {
				method: 'GET',
				headers: headers,
				//   body: bodyParams,
				signal: abortSignal,
			};

			const url = `${this.parent.cnvsUrl}/prioritization/${analysisId}/createPrioCNVs`;
			return fetch(url, params)
                .then(response => response.json(), error => error.message || 'unknown error')
                .then(res => {
                    const error = !!res && res.error && !!res.error.msg;
                    const result = !!res && res.result;
                    if (!!result && !error) {
                        return result[0];
                    } else {
                        throw error || "unknown-error";
                    }
                });
		} else {
			return Promise.reject('no-session');
		}
	}


	queryPage(userId, analysisId, filter, page, pageSize, abortSignal) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.parent.session.getToken(userId)}`,
        };

        if (!!this.parent.session.getToken(userId) && !!userId) {

			let traslateFilters = translateFilterToServer(userId, filter);
			const bodyParams = JSON.stringify(traslateFilters);
			let sort =!!traslateFilters && !!traslateFilters.sort && traslateFilters.sort.length > 0 ? traslateFilters.sort.join(",") : "CNV";
			//const bodyParams = JSON.stringify(translateFilterToServer(userId, projectId, studyId, filter));

			const params = {
				method: 'POST',
				headers: headers,
				body: bodyParams,
				// signal: abortSignal,
			};
			const skipParam = encodeURIComponent(page * pageSize);
			const limitParam = encodeURIComponent(pageSize);
			const queryStrings = [
				`skip=${skipParam}`,
				`limit=${limitParam}`,
				`count=false`,
				//`exclude=${encodeURIComponent("annotation.geneExpression")}`,
                `sort=${sort}`,
			];
			// TODO: PrioCNVs
			// http://192.168.150.147:8888/prioCNVs/webservices/rest/prioritization/5c233fe0b4f3cf1907c9372c/createPrioCNVs?coeficientJaccard=0
			//  http://192.168.150.147:8888/prioCNVs/webservices/rest/prioritization/5c233fe0b4f3cf1907c9372c/search?page=0&limit=10&count=false
			const url = `${this.parent.cnvsUrl}/prioritization/${analysisId}/search?${queryStrings.join("&")}`;
			// const url = `${this.parent.url}/v${this.parent.majorVersion}/analysis/variant/query?${queryStrings.join("&")}`;
			return fetch(url, params)
				.then(response => response.json(), error => error.message || 'unknown error')
				.then(res => {
					const error = !!res && res.error && !!res.error.msg;
					const variants = !!res
						&& res.result;
					if (!!variants && !error) {
						return variants.map(variant => translateVariantFromServer(variant, filter.samples || []));
//                        return {result: variants.map(variant => translateVariantFromServer(variant, filter.samples || [])), numTotalResults:res.response[0].numTotalResults};

                    } else {
						throw error || "unknown-error";
					}
				});
		} else {
			return Promise.reject('no-session');
		}
	}



}


export default CNVsPrioritizationsClient;