const translateGenotypeToServer = genotype => ({
	"R/R": "0/0,0",
	"R/A": "0/1,0/2,0/3,0/4,1",
	"A/A": "1/1,1/2,2/2,1/3,2/3,3/3,1/4,2/3,3/4,4/4,1",
})[genotype] || genotype;


const translateVariantIdFromServer = variant => (
	variant.id || (((variant.annotation || {}).xrefs || []).find(xref => "dbSNP" === xref.source) || {}).id
);


function translateVariantFrequencyStudies(variant) {
	const inFrequencies = (!!variant && !!variant.annotation && variant.annotation.populationFrequencies) || [];
	const outStudies = {};
	for (const inEntry of inFrequencies) {
		const studyName = inEntry.study;
		if (!outStudies.hasOwnProperty(studyName)) {
			outStudies[studyName] = {};
		}
		const outStudy = outStudies[studyName];
		outStudy[inEntry.population] = inEntry.altAlleleFreq;
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


function fixSOTerm(soTerm) {
	if (["2KB_upstream_gene_variant", "2KB_upstream_variant"].includes(soTerm.name)) {
		return { accession: "SO:0001631", name: "upstream_gene_variant" };
	} else if (["2KB_downstream_gene_variant", "2KB_downstream_variant"].includes(soTerm.name)) {
		return { accession: "SO:0001632", name: "downstream_gene_variant" };
	} else {
		return soTerm;
	}
}


function translateVariantTranscripts(variant) {
	// ensembl calculated variant consequences
	// just retrieve the sequence ontology accession
	// and forget about the name
	// assumming no need to fix
	// "2KB_downstream_gene_variant" -> "2KB_downstream_variant",
	// "2KB_upstream_gene_variant" -> "2KB_upstream_variant",

	const genes = [];
	const inConsequenceTypes = (!!variant.annotation && variant.annotation.consequenceTypes) || [];
	for (const inTranscript of inConsequenceTypes) {
		const gene = genes.find(gene => gene.ensemblId === (inTranscript.ensemblGeneId || "")) || {};
		if (gene.ensemblId !== inTranscript.ensemblGeneId) {
			gene.ensemblId = inTranscript.ensemblGeneId;
			gene.name = inTranscript.geneName;
			gene.biotype = inTranscript.biotype;
			gene.transcripts = [];
			genes.push(gene);
		}
		const transcript = {
			ensemblId: inTranscript.ensemblTranscriptId,
			strand: inTranscript.strand,
			proteinVariant: inTranscript.proteinVariantAnnotation || {},
			calculatedConsequences: (inTranscript.sequenceOntologyTerms || []).map(fixSOTerm),
		}
		gene.transcripts.push(transcript);
	}
	return genes;
}


function translateVariantSampleValues(variant, samples) {
	return (
		!!variant.studies &&
		1 === variant.studies.length &&
		!!variant.studies[0] &&
		samples.length === variant.studies[0].samplesData.length
		&& variant.studies[0].samplesData.map(sampleData => sampleData[0])
	) || samples.map(sample => "?/?");
}


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
		reference: variant.reference,
		alternate: variant.alternate,
		type: variant.type,
		xrefs: (!!variant.annotation && variant.annotation.xrefs) || [],
		genes: translateVariantTranscripts(variant),
		frequencyStudies: translateVariantFrequencyStudies(variant),
		conservation: translateVariantConservation(variant),
		sampleValues: translateVariantSampleValues(variant, samples),
		functionalScores: translateVariantFunctionalScores(variant),
		variantTraitAssociation: variant.annotation.variantTraitAssociation,
	};
	return outVariant;
}


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
		outFilter['annot-hpo'] = inFilter.clinical.phenotypes.join(",");
	}
	if (0 < ((!!inFilter.clinical && inFilter.clinical.clinvars) || []).length) {
		outFilter.clinicalSignificance = inFilter.clinical.clinvars.join(",");
	}
}


function translateFilterToServer(userId, projectId, studyId, filter) {
	const serverFilter = {
		study: `${userId}@${projectId}:${studyId}`,
		includeSample: (filter.samples || []).map(sample => sample.sampleId).join(","),
	};
	if ((filter.samples || []).some(sample => !!sample.genotypes && 0 < sample.genotypes.length)) {
		serverFilter.genotype = filter.samples.filter(sample => !!sample.genotypes && 0 < sample.genotypes.length).map(
			sample => `${sample.sampleId}:${sample.genotypes.map(translateGenotypeToServer).join(",")}`
		).join(";");
	}
	if (!!filter.regions) {
		serverFilter.region = filter.regions.map(region => (
			`${region.chromosome}${!!region.start ? ":" + region.start : ""}${!!region.end ? "-" + region.end : ""}`
		)).join(',');
	}
	if (0 < (filter.consequenceTypes || []).length) {
		serverFilter['annot-ct'] = filter.consequenceTypes.join(",");
	}
	if (0 < (filter.vcfMetrics || []).length) {
		serverFilter.filter = filter.vcfMetrics.join(",");
	}
	if (0 < (filter.variantTypes || []).length) {
		// with a little hack for cellbase
		serverFilter.type = filter.variantTypes.join(",").replace("SNV", "SNV,SNP");
	}
	if (0 < (filter.geneBiotypes || []).length) {
		serverFilter.biotype = filter.geneBiotypes.join(",");
	}
	translateFilterFrequenciesToServer(serverFilter, filter);
	translateFilterConservationToServer(serverFilter, filter);
	translateFilterDeleteriousnessToServer(serverFilter, filter);
	translateFilterClinicalToServer(serverFilter, filter);

	return serverFilter;
}


class OpencgaVariantClient {

	constructor(parent) {
		this.parent = parent;
	}

	queryPage(userId, projectId, studyId, filter, page, pageSize, abortSignal) {
		if (!!this.parent && !!this.parent.sessionToken && !!userId && !!projectId && !!studyId) {
			const headers = {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.parent.sessionToken}`,
			};
			const bodyParams = JSON.stringify(translateFilterToServer(userId, projectId, studyId, filter));
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
				`exclude=${encodeURIComponent("annotation.geneExpression")}`,
				"sort=true",
			];

			const url = `${this.parent.url}/v${this.parent.majorVersion}/analysis/variant/query?${queryStrings.join("&")}`;
			return fetch(url, params)
				.then(response => response.json(), error => error.message || 'unknown error')
				.then(res => {
					const error = !!res && res.error;
					const variants = !!res
						&& !!res.response
						&& 1 === res.response.length
						&& !!res.response[0]
						&& res.response[0].result;
					if (!!variants && !error) {
						return variants.map(variant => translateVariantFromServer(variant, filter.samples || []));
					} else {
						throw error || "unknown-error";
					}
				});
		} else {
			return Promise.reject('no-session');
		}
	}
}


export default OpencgaVariantClient;