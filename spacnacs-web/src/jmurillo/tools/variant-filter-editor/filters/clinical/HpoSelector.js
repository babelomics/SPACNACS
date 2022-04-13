import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableRow, InputBase, Paper, withStyles, IconButton, Typography, TableHead } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ClearIcon from '@material-ui/icons/Clear';
import HtmlTooltip from "./../../../../common/HtmlTooltip";
import Tooltip from "@material-ui/core/Tooltip";
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
	paper: {
		...theme.mixins.gutters(),
		padding: theme.spacing(1),
		backgroundColor: "#fcf9f9",
		width: "100%",
	},
	container: {
		padding: theme.spacing(1),
		display: "flex",
		alignItems: "center",
	},
	textInput: {
		paddingTop: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.5),
		paddingLeft: theme.spacing(1),
		paddingRight: theme.spacing(1),
		flex: 1,
	},
	textPaper: {
		margin: theme.spacing(1),
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
            numPages: 0
		};
		this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
		this.addHpTerm = this.addHpTerm.bind(this);
		this.removeHpTerm = this.removeHpTerm.bind(this);
	}

	render() {
		const { classes } = this.props;
		const newResults = this.state.results.filter(hpTerm => !this.state.selected.some(term => term.id === hpTerm.id));
		let selected = (!!this.state.selected && this.state.selected.map(phenotype => {
			const hpTerm = (!!this.state.phenotypes && this.state.phenotypes.find(hpTerm => hpTerm.id === phenotype.id)) || { id: phenotype.id, name: phenotype.name, def: "" };
			return hpTerm;
		})) || [];
		// remove repeats
        selected = [...new Map(selected.map(item => [item['id'], item])).values()];



		return (
			<Paper className={classes.paper} square>
                {/*<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Description</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							0 === selected && (
								<TableRow>
									<TableCell colSpan={4}>
										No phenotypes selected.
									</TableCell>
								</TableRow>
							)
						}
						{
							selected.map(hpTerm => (
								<TableRow key={hpTerm.id}>
									<TableCell>{hpTerm.id}</TableCell>
									<TableCell>{hpTerm.name}</TableCell>
									<TableCell>{hpTerm.def}</TableCell>
									<TableCell>{
										<IconButton onClick={event => { this.removeHpTerm(hpTerm); }}>
											<RemoveIcon />
										</IconButton>}
									</TableCell>
								</TableRow>
							))
						}
					</TableBody>
				</Table>*/}
                {selected.map((hpTerm) => {
                    let label = `${hpTerm.id}  ${hpTerm.name}`;
                    if (label.length > 100){
                        label = label.slice(0,100).concat("...");
                    }
                    return (<HtmlTooltip interactive title={
							<React.Fragment>
								<ul>
                                    {!!hpTerm.id &&
									<li>ID: {hpTerm.id}</li>
                                    }
                                    {!!hpTerm.name &&
									<li>Name: {hpTerm.name}</li>
                                    }
                                    {!!hpTerm.def &&
									<li>Description: {hpTerm.def}</li>
                                    }
								</ul>
							</React.Fragment>}>
							<Chip
								label={label}
								onDelete={event => {
                                    this.removeHpTerm(hpTerm);
                                }}
							/>
						</HtmlTooltip>
                    )}
                )}

				<div className={classes.container}>
					<Typography>Search</Typography>
					<Paper className={classes.textPaper}>
						<InputBase className={classes.textInput} placeholder="text to search..." value={this.state.searchText} onChange={e=>this.handleSearchTextChange(e.target.value)} />
						<IconButton type="submit"  aria-label="clear" onClick={e=>this.handleSearchTextChange("")}>
							<ClearIcon />
						</IconButton>
					</Paper>
				</div >
				{3 < this.state.searchText.length &&
                    <span>
						Total rows: {this.state.numPages}
					</span>
				}

				{
					3 < this.state.searchText.length && (
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>Name</TableCell>
									{/*<TableCell>Description</TableCell>*/}
                                    {/*<TableCell>Parent</TableCell>*/}
									<TableCell></TableCell>
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
									newResults.map(hpTerm => (
										<TableRow key={hpTerm.id}>
											<TableCell>{hpTerm.id}</TableCell>
											<TableCell>
                                                {(!!hpTerm.synonym || !!hpTerm.def) &&
												<HtmlTooltip interactive title={
													<React.Fragment>
														<ul>
                                                            {!!hpTerm.synonym &&
															<li>
																<span>Synonyms: {hpTerm.synonym}</span>
															</li>
                                                            }
                                                            {!!hpTerm.def &&
															<li>
																<span>Description: {hpTerm.def}</span>
															</li>
                                                            }
														</ul>
													</React.Fragment>}>
													<span> {hpTerm.name}</span>
												</HtmlTooltip>
                                                }
                                                {!hpTerm.synonym && !hpTerm.def &&
													<span> {hpTerm.name}</span>
                                                }
											</TableCell>
											{/*
											<TableCell>
												{
													!!hpTerm && !!hpTerm.parents && hpTerm.parents.map(parent => (
														<React.Fragment key={parent.id}>
															{parent.id}: {parent.name}<br />
														</React.Fragment>
													))
												}
											</TableCell>*/}
											<TableCell>
												{
													<IconButton onClick={event => { this.addHpTerm(hpTerm); }}>
														<AddIcon />
													</IconButton>
												}
											</TableCell>

										</TableRow>
									))
								}
							</TableBody>
						</Table>
					)
				}
			</Paper >
		);
	}


	handleSearchTextChange(value) {
		this.setState({
			...this.state,
			searchText: value,
			results: [],
		})

		if (2 < this.state.searchText.length) {
			this.searchText();
		}

	}


	addHpTerm(hpTerm, ) {
		this.props.addPhenotype(hpTerm);
		this.setState({
			...this.state,
			selected: [...this.state.selected, hpTerm],
		});
	}


	removeHpTerm(hpTerm) {
		this.props.removePhenotype(hpTerm);
		this.setState({
			...this.state,
			selected: this.state.selected.filter(term => term.id !== hpTerm.id),
		});
	}


	searchText() {
		const searchTextParam = encodeURIComponent(this.state.searchText);
		//const url = `https://playground.phenotips.org/rest/vocabularies/hpo/suggest?input=${searchTextParam}`;
		//const url = `http://localhost:8084/rest/vocabularies/hpo/suggest?input=${searchTextParam}`;

		const url = `https://hpo.jax.org/api/hpo/search?q=${searchTextParam}`;

		const headers = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		};
		const params = {
			method: 'GET',
			headers: headers,
		};
		const pThis = this;
		return fetch(url, params)
			.then(response => response.json(), error => error.message || 'unknown error')
			.then(res => {
				const newHpTerms = (res.terms || []).filter(hpTerm => !pThis.state.selected.some(term => term.id === hpTerm.id));
				/*                const newHpTerms = (res.rows || []).filter(hpTerm => !pThis.state.selected.some(term => term.id === hpTerm.id)); */
				pThis.setState({
					...pThis.state,
					results: newHpTerms,
					numPages: res.termsTotalCount || 0,
				});
			});
	}
}


HpoSelector.propTypes = {
	phenotypes: PropTypes.array.isRequired,
	addPhenotype: PropTypes.func.isRequired,
	removePhenotype: PropTypes.func.isRequired,
};


export default withStyles(styles)(HpoSelector);