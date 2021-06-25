const getUrlParam = (props, paramName) => (
	!!props &&
	!!props.match &&
	!!props.match.params &&
	!!props.match.params[paramName] &&
	decodeURIComponent(props.match.params[paramName])
) || undefined;

export default getUrlParam;