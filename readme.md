# SPAnish Copy Number Alteration Collaborative Server
![alt logo][logo]


SPACNACS is a crowdsourcing initiative to provide information about **C**opy **N**umber **V**ariations of the Spanish population to the scientific/medical community. We accept submissions from WES or WGS, no matter whether these come from healthy or diseased individuals.

The sequences were contributed by different consortiums and projects, including groups from the Spanish Network for Research in Rare Diseases, [CIBERER](https://www.ciberer.es/), results from the [EnoD](https: //www.ciberer.es/en/transversal-programmes/scientific-projects/undiagnosed-rare-diseases-programme-enod), the [Project Genome 1000 Navarra](https://www.nagen1000navarra.es/en) and other research groups and initiatives across Spain.

SPACNACS is an open resource available at [http://csvs.clinbioinfosspa.es/cnv](http://csvs.clinbioinfosspa.es/cnv)


## <a name="TOC">Table of content</a>
 1. [Web interface](#interface)
    1. [Overview](#interface_overview)
    1. [Search panel](#interface_search)
    1. [Filtering status panel](#interface_filter)
 1. [CNV annotations](#annotations)
 1. [Citation](#citation)


## <a name="interface">Web interface</a>
The web interface has 3 main sections:

![alt web interface][fig1]

* [Browser panel](#browser_panel) (Fig 1.A). Consists on an embedded [Integrative Genomics Viewer](https://igv.org/) preloaded with the Spanish CNV database and other useful tracks.
* [Search and selection panel](#search_panel) (Fig 1.B). We provide several filters for specifying the genomic region and the data to be shown.
* [Filtering status panel](#filtering_panel) (Fig 1.C). Shows information about the active filters. By default, the whole dataset is shown.




### <a name="browser_panel">Browser panel</a>
[IGV](https://igv.org/) provides several navigation controls for specifying the genomic region to view. A ruler indicating the extent of the current region is displayed below the toolbar, and the size of the region and its genomic coordinates are displayed in the toolbar.

![alt igv toolbar][igvToolbar]

* **Select a chromosome**. The chromosome dropdown menu in the toolbar includes an entry for every chromosome or contig in the reference genome. Selecting a chromosome from the menu will set the view to include the whole chromosome. The ruler also includes a cytoband ideogram.

* **Enter genomic coordinates**. In the text box where the genomic coordinates are displayed, you can type the coordinates of the region you want to view (e.g. chr17:41,195,312-41,278,500). The thousands separator is optional, but the chromosome name is required.

* **Spanish CNVs database**. The _CNVs_ track displays Copy Number Variations in the spanish population that fulfill the current filtering criteria. We provide and extensive annotation of CNVs with clinical relevant databases (see [CNV annotations](#annotations)). Use the [Search panel](#interface_search) to filter out CNVs according to the CNV type and annotations.

* **World populations CNVs**. _CNVs_ derived from [gnomad](https://gnomad.broadinstitute.org/) and [1000 genomes](https://www.internationalgenome.org/) projects are provided as two additional tracks. We keep _duplications_, _deletions_ and Multiallelic CNVs (MCNVs). Frequencies for MCNV are sumarized in _deletions_ (CN0 and CN1) and _duplications_ (CN3 or more). Click on an element to display detailed information.

* **Regularoty regions**. Displays the current set of regulatory features as provided by [ensembl](http://www.ensembl.org/index.html). See [regulatory features](https://www.ensembl.org/info/genome/funcgen/regulatory_features.html) for additional information.

* **Clinvar structural variants**. This track contains known clinical relevant _Copy number gain_, _copy number loss_, _duplication_ and _deletion_ from [clinvar](https://www.ncbi.nlm.nih.gov/clinvar/). 



### <a name="search_panel">Search panel</a>
This section controls the CNVs displayed in the _CNVs_ track. By default, the whole dataset is displayed.

* **Genomic view**. Navigation along the genome can be done by specifying a locus (either in hg19 or GRCh37 nomenclature) or by looking for a specific gene. Canonical gene names as well as synonyms are supported. Use the gene text box to find the desired gene and click the plus sign to apply the filter.

![alt search region][searchRegion]

* **Variant type**. Use this filter to show _deletions_, _duplications_ or both types of CNVs.

* **Annotation**. We provide and extensive annotation of CNVs with clinical relevant databases (see [CNV annotations](#annotations)). Select the annotations you are interested in, type some words to see suggestions and use the plus button to apply the filter. For example, filtering by _intellectual disability_ (C3714756) in DisGeNET will show only CNVs overlapping genes associated with this disease in DisGeNET. Multiple filters are allowed.

![alt annotation][annotation]

* **Frequency**. CNVs frecuency for each CNV is calculated as the ratio of individuals having at least one CNV overlapping it. For non coding regions, only WGS are taken into account. Please, bear in mind that the frecuency may vary depending on the method used to calculate it.

* **Samples**. Despite gene pleiotropy cannot be completely ruled out, samples were binned at higher disease ICD10 categories. The main objetive is using the repository as a pseudo-control population for finding new disease-causing CNVs, with the idea that ‘disease A is a healthy control for disease B’. Additionally, samples can also be filtered out according to their main [HPO](https://hpo.jax.org/app/) or the gender. 

### <a name="filtering_panel">Filtering status panel</a>
The filtering status section provides a summary of the filters applied to the CNV database. Default filters includes the whole database. Use the "X" button to remove a filter or the [Search panel](#interface_search) to add or remove filters.

![alt filtering panel][filtering]


## <a name="annotations">CNV annotations</a>
We provide and extensive annotation of CNVs with clinical relevant databases. A CNV is annotated with some specific genomic region feature if it is overlapped. 

* **Clinvar database**. [ClinVar](https://www.ncbi.nlm.nih.gov/clinvar/) is a freely accessible, public archive of reports of the relationships among human variations and phenotypes, with supporting evidence. It also provides gene-disease relationships.

* **DisGeNET**. [DisGeNET](https://www.disgenet.org/) is a discovery platform containing a collections of genes and variants associated to human diseases. DisGeNET integrates data from expert curated repositories, GWAS catalogues, animal models and the scientific literature.

* **Gene Ontology Annotation (GOA)**. The [GOA](https://www.ebi.ac.uk/GOA/index) program aims to provide high-quality [Gene Ontology](http://geneontology.org/) (GO) annotations to proteins in the UniProt Knowledgebase (UniProtKB), RNA molecules from RNACentral and protein complexes from the Complex Portal.  GOA files contain a mixture of manual annotation and computationally assigned GO terms describing gene products.

* **Clingen**. [ClinGen](https://www.clinicalgenome.org/) is a National Institutes of Health (NIH)-funded resource dedicated to building a central resource that defines the clinical relevance of genes and variants for use in precision medicine and research. It provides a curated gene dosage sensitivity database.

* **The Human Phenotype Ontology**. The Human Phenotype Ontology [HPO](https://hpo.jax.org/app/) provides a standardized vocabulary of phenotypic abnormalities encountered in human disease. We provide HPO annotations derived directly from gene-phenotipe links and from the patient network analysis carried out by [E. Rojano et at](https://link.springer.com/chapter/10.1007/978-3-319-56148-6_17).

* **UCSC**. The wgEncodeEH000322 track from [UCSC](hgdownload.soe.ucsc.edu) provides information about the mappability of the genome. This annotation can be useful to detect false positives and biases in CNV prediction technologies/tools.


## <a name="citation">Citation</a>
By downloading data from the Spanish CNV DataBase you accept the obligation of acknowledge its use in any publication, presentation, conference, poster or any public event in which you present results obtained in any way using the data downloaded.

To acknowledge the use of Spanish CNV Database data use a sentence similar to this one: “These results were obtained using Spanish CNV DataBase data ( http://csvs.babelomics.org/cnv)".

<!-- and in any publication you must cite the reference:-->






[fig1]: images/interface.svg "Web interface"
[logo]: images/logo.svg "logo"
[searchRegion]: images/searchRegion.svg "search region"
[igvToolbar]: images/igv_toolbar.svg "igv toolbar"
[annotation]: images/annotation.svg "annotation"
[filtering]: images/filteringSection.svg "filtering panel"












