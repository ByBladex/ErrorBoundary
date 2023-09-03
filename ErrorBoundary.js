import React from "react";
import site from "../site";
import Router from "next/router";
import siteConfig from "../index";

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidCatch(error, errorInfo) {
		let router = Router.router;
		let asPath = router.state.asPath;
		let pathname = router.state.pathname;
		let query = router.state.query;
		const urlLogging = siteConfig.logging;
		if(site.env === "PRO"){
			//console.log(error, urlLogging);
			let errorObj = {
				data: {
					message: error.message,
					layout: "",
					route: {asPath, pathname, query},
					date: new Date().toISOString()
				}
			}

			let optionsBackend = {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				credentials: 'include',
				body: JSON.stringify(errorObj)
			}

			fetch('URL'/* urlLogging */, optionsBackend);
		}
	}

	render() {
		return <>{this.props.children}</>;
	}
}
