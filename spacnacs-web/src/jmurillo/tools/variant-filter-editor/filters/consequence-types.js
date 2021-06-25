//==============================================================================
// isA: [ "lof" ] indicates loss of function
// 'Title' is optional. if there is not title provided then 'name' will be used.
//  There are two more optional properties - 'checked' and 'impact'. They can be set to display them default in web application.
//  Similarly 'description' is optional as well.

// impacts: { high, moderate, low, modifier }


const Categories = Object.freeze({
	LOSS_OF_FUNCTION: {
		label: "Loss of function",
	},
	INTERGENETIC: {
		label: "Intergenetic",
	},
	REGULATORY: {
		label: "Regulatory",
	},
	CODING: {
		label: "Coding",
	},
	NON_CODING: {
		label: "Non-coding",
	},
	SPLICE: {
		label: "Splice",
	},
	TRANSCRIPT: {
		label: "Transcript",
	},
});


const consequenceTypes = [
	{
		id: "SO:0001631",
		name: "upstream_gene_variant",
		description: "A sequence variant located 5' of a gene",
		impact: "modifier",
		categories: [ Categories.INTERGENETIC ],
	},
	{
		id: "SO:0001636",
		name: "2KB_upstream_variant",
		description: "A sequence variant located within 2KB 5' of a gene",
		impact: "modifier",
		categories: [ Categories.INTERGENETIC ],
	},
	{
		id: "SO:0001632",
		name: "downstream_gene_variant",
		description: "A sequence variant located 3' of a gene",
		impact: "modifier",
		categories: [ Categories.INTERGENETIC ],
	},
	{
		id: "SO:0002083",
		name: "2KB_downstream_variant",
		description: "A sequence variant located within 2KB 3' of a gene",
		impact: "modifier",
		categories: [ Categories.INTERGENETIC ],
	},
	{
		id: "SO:0001628",
		name: "intergenic_variant",
		description: "A sequence variant located in the intergenic region, between genes",
		impact: "modifier",
		categories: [ Categories.INTERGENETIC ],
	},
	{
		id: "SO:0001620",
		name: "mature_miRNA_variant",
		description: "A transcript variant located with the sequence of the mature miRNA",
		impact: "modifier",
		categories: [ Categories.REGULATORY ],
	},
	// {
	//     id: "SO:0001894",
	//     name: "regulatory_region_ablation",
	//     description: "A feature ablation whereby the deleted region includes a regulatory region",
	//     impact: "moderate",
	// },
	// {
	//     id: "SO:0001891",
	//     name: "regulatory_region_amplification",
	//     description: "A feature amplification of a region containing a regulatory region",
	//     impact: "modifier",
	// },
	{
		id: "SO:0001566",
		name: "regulatory_region_variant",
		description: "A sequence variant located within a regulatory region",
		impact: "modifier",
		categories: [ Categories.REGULATORY ],
	},
	{
		id: "SO:0001782",
		name: "TF_binding_site_variant",
		description: "A sequence variant located within a transcription factor binding site",
		impact: "modifier",
		categories: [ Categories.REGULATORY ],
	},
	// {
	//     id: "SO:0001895",
	//     name: "TFBS_ablation",
	//     description: "A feature ablation whereby the deleted region includes a transcription factor binding site",
	//     impact: "modifier",
	// },
	// {
	//     id: "SO:0001892",
	//     name: "TFBS_amplification",
	//     description: "A feature amplification of a region containing a transcription factor binding site",
	//     impact: "modifier",
	// },
	{
		id: "SO:0001580",
		name: "coding_sequence_variant",
		description: "A sequence variant that changes the coding sequence",
		impact: "modifier",
		categories: [ Categories.CODING ],
	},
	// {
	//     id: "SO:0001907",
	//     name: "feature_elongation",
	//     description: "A sequence variant that causes the extension of a genomic feature, with regard to the reference sequence",
	//     impact: "modifier",
	// },
	{
		id: "SO:0001906",
		name: "feature_truncation",
		description: "A sequence variant that causes the reduction of a genomic feature, with regard to the reference sequence",
		impact: "modifier",
		categories: [ Categories.CODING ],
	},
	{
		id: "SO:0001589",
		name: "frameshift_variant",
		description: "A sequence variant which causes a disruption of the translational reading frame, because the number of nucleotides inserted or deleted is not a multiple of three",
		impact: "high",
		categories: [ Categories.CODING, Categories.LOSS_OF_FUNCTION ],
	},
	{
		id: "SO:0001626",
		name: "incomplete_terminal_codon_variant",
		description: "A sequence variant where at least one base of the final codon of an incompletely annotated transcript is changed",
		impact: "low",
		categories: [ Categories.CODING ],
	},
	{
		id: "SO:0001822",
		name: "inframe_deletion",
		description: "An inframe non synonymous variant that deletes bases from the coding sequence",
		impact: "high",
		categories: [ Categories.CODING, Categories.LOSS_OF_FUNCTION ],
	},
	{
		id: "SO:0001821",
		name: "inframe_insertion",
		description: "An inframe non synonymous variant that inserts bases into in the coding sequence",
		impact: "high",
		categories: [ Categories.CODING, Categories.LOSS_OF_FUNCTION ],
	},
	{
		id: "SO:0001650",
		name: "inframe_variant",
		description: "A sequence variant which does not cause a disruption of the translational reading frame",
		impact: "low",
		categories: [ Categories.CODING ],
	},
	{
		id: "SO:0001582",
		name: "initiator_codon_variant",
		description: "A codon variant that changes at least one base of the first codon of a transcript",
		impact: "moderate",
		categories: [ Categories.CODING ],
	},
	{
		id: "SO:0001583",
		name: "missense_variant",
		description: "A sequence variant, that changes one or more bases, resulting in a different amino acid sequence but where the length is preserved",
		impact: "moderate",
		categories: [ Categories.CODING ],
	},
	{
		id: "SO:0001621",
		name: "NMD_transcript_variant",
		description: "A variant in a transcript that is the target of NMD",
		impact: "modifier",
		categories: [ Categories.CODING ],
	},
	// {
	//     id: "SO:0001818",
	//     name: "protein_altering_variant",
	//     description: "A sequence_variant which is predicted to change the protein encoded in the coding sequence",
	//     impact: "moderate",
	// },
	{
		id: "SO:0001819",
		name: "synonymous_variant",
		description: "A sequence variant where there is no resulting change to the encoded amino acid",
		impact: "low",
		categories: [ Categories.CODING ],
	},
	{
		id: "SO:0002012",
		name: "start_lost",
		description: "A codon variant that changes at least one base of the canonical start codon",
		impact: "high",
		categories: [ Categories.CODING, Categories.LOSS_OF_FUNCTION ],
	},
	{
		id: "SO:0001587",
		name: "stop_gained",
		description: "A sequence variant whereby at least one base of a codon is changed, resulting in a premature stop codon, leading to a shortened transcript",
		impact: "high",
		categories: [ Categories.CODING, Categories.LOSS_OF_FUNCTION ],
	},
	{
		id: "SO:0001578",
		name: "stop_lost",
		description: "A sequence variant where at least one base of the terminator codon (stop) is changed, resulting in an elongated transcript",
		impact: "high",
		categories: [ Categories.CODING, Categories.LOSS_OF_FUNCTION ],
	},
	{
		id: "SO:0001567",
		name: "stop_retained_variant",
		description: "A sequence variant where at least one base in the terminator codon is changed, but the terminator remains",
		impact: "low",
		categories: [ Categories.CODING ],
	},
	{
		id: "SO:0001590",
		name: "terminator_codon_variant",
		description: "A sequence variant whereby at least one of the bases in the terminator codon is changed",
		impact: "low",
		categories: [ Categories.CODING ],
	},
	{
		id: "SO:0001624",
		name: "3_prime_UTR_variant",
		description: "A UTR variant of the 3' UTR",
		impact: "modifier",
		categories: [ Categories.NON_CODING ],
	},
	{
		id: "SO:0001623",
		name: "5_prime_UTR_variant",
		description: "A UTR variant of the 5' UTR",
		impact: "modifier",
		categories: [ Categories.NON_CODING ],
	},
	{
		id: "SO:0001627",
		name: "intron_variant",
		description: "A transcript variant occurring within an intron",
		impact: "modifier",
		categories: [ Categories.NON_CODING ],
	},
	{
		id: "SO:0001792",
		name: "non_coding_transcript_exon_variant",
		description: "A sequence variant that changes non-coding exon sequence in a non-coding transcript",
		impact: "modifier",
		categories: [ Categories.NON_CODING ],
	},
	{
		id: "SO:0001619",
		name: "non_coding_transcript_variant",
		description: "A transcript variant of a non coding RNA gene",
		impact: "modifier",
		categories: [ Categories.NON_CODING ],
	},
	{
		id: "SO:0001574",
		name: "splice_acceptor_variant",
		description: "A splice variant that changes the 2 base region at the 3' end of an intron",
		impact: "high",
		categories: [ Categories.SPLICE, Categories.LOSS_OF_FUNCTION ],
	},
	{
		id: "SO:0001575",
		name: "splice_donor_variant",
		description: "A splice variant that changes the 2 base pair region at the 5' end of an intron",
		impact: "high",
		categories: [ Categories.SPLICE, Categories.LOSS_OF_FUNCTION ],
	},
	{
		id: "SO:0001630",
		name: "splice_region_variant",
		description: "A sequence variant in which a change has occurred within the region of the splice site, either " +
			"within 1-3 bases of the exon or 3-8 bases of the intron",
		impact: "low",
		categories: [ Categories.SPLICE ],
	},
	{
		id: "SO:0001893",
		name: "transcript_ablation",
		description: "A feature ablation whereby the deleted region includes a transcript feature",
		impact: "high",
		categories: [ Categories.TRANSCRIPT, Categories.LOSS_OF_FUNCTION ],
	},
	{
		id: "SO:0001889",
		name: "transcript_amplification",
		description: "A feature amplification of a region containing a transcript",
		impact: "high",
		categories: [ Categories.TRANSCRIPT, Categories.LOSS_OF_FUNCTION ],
	},
];


export default consequenceTypes;