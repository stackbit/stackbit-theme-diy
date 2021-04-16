import React from 'react';
import Router from 'next/router';
import _ from 'lodash';

export default class NavOverlay extends React.Component {
    constructor(props) {
        super(props);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.handleRouteChange = this.handleRouteChange.bind(this);
        this.menuOpenRef = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize, true);
        Router.events.on('routeChangeStart', this.handleRouteChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowResize, true);
        Router.events.off('routeChangeStart', this.handleRouteChange);
    }

    handleWindowResize() {
        const menuOpenElm = _.get(this.menuOpenRef, 'current.offsetParent');
        if (menuOpenElm === null) {
            document.body.classList.remove('js-nav-open');
        }
    }

    handleRouteChange() {
        document.body.classList.remove('js-nav-open');
    }

    handleMenuToggle(event) {
        event.preventDefault();
        document.body.classList.toggle('js-nav-open');
    }

    render() {
        const config = _.get(this.props, 'config');
        const header = _.get(config, 'header');
        const hasPrimaryNav = _.get(header, 'has_primary_nav');
        const primaryNavLinks = _.get(header, 'primary_nav_links');
        const hasSecondaryNav = _.get(header, 'has_secondary_nav');
        const secondaryNavLinks = _.get(header, 'secondary_nav_links');

        if ((!hasPrimaryNav || _.isEmpty(primaryNavLinks)) && (!hasSecondaryNav && _.isEmpty(secondaryNavLinks))) {
            return null;
        }

        return <div className="nav-overlay" onClick={this.handleMenuToggle.bind(this)} />;
    }
}
