import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableRow, InputBase, Paper, withStyles, IconButton, TableHead } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Client from '../../../../client-interfaces/Client';
import HtmlTooltip from "./../../../../common/HtmlTooltip";
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

import TablePagination from "@material-ui/core/es/TablePagination/TablePagination";

import Chip from '@material-ui/core/Chip';

const styles = theme => ({
    paper: {
        ...theme.mixins.gutters(),
        backgroundColor: "#fcf9f9",
    },
    container: {
        display: "flex",
        alignItems: "center",
    },
    textInput: {
        paddingLeft: theme.spacing(1),
        flex: 1,
    },
    textPaper: {
        display: "flex",
        flex: 1,
        alignItems: "center"
    },
});


class HpoSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            selected: this.props.selected || [],
            results: [],
            numTotalResults: 0,
            annotationFields: this.props.annotationFields || [],
            annotationField: "hpo",
            sortField:"c",
            sortFields: this.props.sortFields || [],
            page: this.props.page || 0 ,
            pageSize: this.props.pageSize || -1
        };
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.addTerm = this.addTerm.bind(this);
        this.removeTerm = this.removeTerm.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }




    render() {
        const { classes } = this.props;
        const newResults = this.state.results;
        const selected =  (!!this.props.search && this.props.search) || [];

        return (
			<div >
				<label style={{ color:"#666"}}>Hpo:</label><br/>
                {selected.map((term) => {
                    let label = `${term.id}  ${term.name}`;
                    if (label.length > 30){
                        label = label.slice(0,25).concat("...");
                    }
                    return (<HtmlTooltip interactive title={
							<React.Fragment>
								<ul>
                                    {!!term.id &&
									<li>Id: {term.id}</li>
                                    }
                                    {!!term.name &&
                                    <li>
                                        <span>Description: ${term.name}</span>
                                    </li>
                                    }

                                    {!!term.description &&
									<li>
										<span>Description: ${term.description}</span>
									</li>
                                    }
								</ul>
							</React.Fragment>}>
							<Chip size="small"
								  label={label}
								  onDelete={event => {
                                      this.removeTerm(term);
                                  }}

							/>
						</HtmlTooltip>
                    )}
                )}


				<Paper className={classes.textPaper}>
					<InputBase className={classes.textInput} placeholder="Search hpo..." value={this.state.searchText}
							   onChange={event => this.handleSearchTextChange(this.state.annotationField, event.target.value)} />
					<IconButton aria-label="search" onClick={event => this.searchText()}  size="large">
						<SearchIcon  size="small"/>
					</IconButton>
					<IconButton type="submit"  aria-label="clear" onClick={event => this.handleClearText()}  size="small" >
						<ClearIcon  size="small"/>
					</IconButton>
				</Paper>

				<div  style={{ backgroundColor:"#efefefef", width: "100%"}}>
                    {
                        //3 < this.state.searchText.length && this.state.annotationField != "all" &&
                        (this.state.numTotalResults > 0 || (this.state.numTotalResults === 0 && this.state.annotationField !== "all" && this.state.searchText.length>0) )&&
                        (
							<div >

								<Table style={{tableLayout: "fixed", width: "100%"}}>
									<TableHead>
										<TableRow>
											<TableCell>ID</TableCell>
											<TableCell>Name</TableCell>
											<TableCell style={{width: "30px"}}>
												<HtmlTooltip title="Add term to list filters to search" aria-label="add">
													<span>Add</span>
												</HtmlTooltip>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
                                        {
                                            0 === newResults.length && (
												<TableRow>
													<TableCell colSpan={3}>
														No results for query.
													</TableCell>
												</TableRow>
                                            )
                                        }
                                        {
                                            newResults.map(term => (
												<TableRow key={term.id}>
													<TableCell>
														<HtmlTooltip title={
															<React.Fragment>
																<ul>
																	<li>ID: {term.id}</li>
                                                                    {!!term.name &&
																	<li> Name: {term.name}</li>
                                                                    }
																	<li>Description: {term.description}</li>
																</ul>
															</React.Fragment>}>
															<span>{term.id}</span>
														</HtmlTooltip>

													</TableCell>
													<TableCell style={{overflowWrap: "break-word"}}>
														<HtmlTooltip title={
															<React.Fragment>
																<ul>
																	<li>ID: {term.id}</li>
                                                                    {!!term.name &&
																	<li>Name : {term.name}</li>
                                                                    }
																	<li>Description: {term.description}</li>
																</ul>
															</React.Fragment>}>
															<span>{term.name}</span>

														</HtmlTooltip>
													</TableCell>

													<TableCell style={{width: "30px"}}>
                                                        {
															<IconButton onClick={event => { this.addTerm(term); }}>
																<AddIcon />
															</IconButton>
                                                        }
													</TableCell>
												</TableRow>
                                            ))
                                        }
									</TableBody>
								</Table>
							</div>
                        )
                    }

                    {this.state.numTotalResults > 0 &&
					<TablePagination
						component="div"
						count={this.state.numTotalResults}
						page={this.state.page}
						onChangePage={this.handleChangePage}
						rowsPerPage={this.state.pageSize}
						rowsPerPageOptions={[this.state.pageSize]}
					/>
                    }
				</div>
			</div>
        );
    }

    isChecked = (termId) => this.state.annotationField === termId ? true : false;

    handleChangePage(event, newPage){
        this.searchText(newPage);

    }


    handleClearText() {
        this.setState({
            ...this.state,
            searchText: "",
            results: [],
            page: 0,
            numTotalResults: 0});
    }

    handleSearchTextChange(annotationField, value) {
        this.setState({
                ...this.state,
                searchText: value,
                annotationField: annotationField,
                results: [],
                numTotalResults: 0,
                 page:0
            }, () =>{
                if (0 < value.length && annotationField !== "all") {
                    this.searchText();
                }
                if (annotationField === "all"){
                    this.props.addAnnotation({
                        searchText:value,
                        annotationField:annotationField,
                        sort: this.state.sortField
                    });
                }
            }
        );

    }

    handleAnnotationFieldChange(annotationFieldActual, annotationFieldNew, value) {
        this.setState({
            ...this.state,
            annotationField: annotationFieldNew,
            results: [],
            numTotalResults:0
        });
        this.state.annotationField = annotationFieldNew;

        this.handleSearchTextChange(annotationFieldNew, value);
    }

    handleSortByChange = (event) => {
        this.setState({
            ...this.state,
            sortField: event.target.value
        });

        this.props.addAnnotation({
            searchText: this.state.searchText,
            annotationField:this.state.annotationField,
            sort: this.state.sortField
        });




    };


    addTerm(term){
        this.props.addPhenotype(term);
        this.setState({
            ...this.state,
            selected: [...this.state.selected, term],
        });
        this.handleClearText();
    }


    removeTerm(term){
        if (term.annotationField === "all")
            term.searchText = "";
        this.props.removePhenotype(term);
        this.setState({
            ...this.state,
            selected: this.state.selected.filter(annotation => annotation.id !== term.id),
        });
    }


    searchText(page) {
        const pThis = this;

        if (page === null || page === undefined)
            page = this.state.page;

        Client.instance.annotator.searchAnnotationTerm(this.state.annotationField, this.state.searchText, page, this.state.pageSize).then(res =>{
                const newTerms = (res.result || []).filter(annotationTerm => !pThis.state.selected.some(term => term.id === annotationTerm.id));
                pThis.setState({
                    ...pThis.state,
                    results: newTerms,
                    numTotalResults: res.numTotalResults,
                    page: page
                });
            }
        );


    }
}


HpoSelector.propTypes = {
    phenotypes: PropTypes.array.isRequired,
    addPhenotype: PropTypes.func.isRequired,
    removePhenotype: PropTypes.func.isRequired,
};


export default withStyles(styles)(HpoSelector);