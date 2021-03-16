import React from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import { withPrefix, classNames } from '../utils';
import Announcement from './Announcement';
import Header from './Header';
import Footer from './Footer';

export default class Body extends React.Component {
    renderFontUrl(style, font) {
        if (style === 'bold') {
            return (
                font === 'serif' ? <link href="https://fonts.googleapis.com/css2?family=Arvo:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
                    : <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
            );
        } else if (style === 'minimal') {
            return (
                font === 'serif' ? <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
                    : <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
            );
        } else {
            return (
                font === 'serif' ? <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
                    : <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
            );
        }
    }

    render() {
        const page = _.get(this.props, 'page');
        const pageTitle = _.get(page, 'title');
        const config = _.get(this.props, 'config');
        const configTitle = _.get(config, 'title');
        const style = _.get(config, 'style', 'classic');
        const layoutType = _.get(config, 'layout_type', 'full-width');
        const font = _.get(config, 'base_font', 'sans-serif');
        const palette = _.get(config, 'palette', 'blue');
        const mode = _.get(config, 'mode', 'light');
        const favicon = _.get(config, 'favicon');
        const domain = _.trim(_.get(config, 'domain', ''), '/');
        const seo = _.get(page, 'seo');
        const seoTitle = _.get(seo, 'title');
        const title = seoTitle ? seoTitle : [pageTitle, configTitle].join(' | ');
        const seoDescription = _.get(seo, 'description', '');
        const seoRobots = _.get(seo, 'robots', []).join(',');
        const seoExtra = _.get(seo, 'extra', []).map((meta, index) => {
            const keyName = _.get(meta, 'keyName', 'name');
            const name = _.get(meta, 'name');
            if (!name) {
                return null;
            }
            const nameAttr = { [keyName]: name };
            const relativeUrl = _.get(meta, 'relativeUrl');
            let value = _.get(meta, 'value');
            if (!value) {
                return null;
            }
            if (relativeUrl) {
                if (!domain) {
                    return null;
                }
                value = domain + withPrefix(value);
            }
            return <meta key={index} {...nameAttr} content={value} />;
        });

        return (
            <React.Fragment>
                <Helmet>
                <title>{title}</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta name="google" content="notranslate" />
                    <meta name="description" content={seoDescription} />
                    {!_.isEmpty(seoRobots) && <meta name="robots" content={seoRobots} />}
                    {seoExtra}
                    {this.renderFontUrl(style, font)}
                    {favicon && <link rel="icon" href={withPrefix(favicon)} />}
                    <body className={classNames(`layout-${layoutType}`, `style-${style}`, `palette-${palette}`, `mode-${mode}`, `font-${font}`)} />
                </Helmet>
                <div id="site-wrap" className="site">
                    {(_.get(this.props, 'data.config.header.has_anncmnt', null) && _.get(this.props, 'data.config.header.anncmnt_content', null)) && (
                        _.get(this.props, 'data.config.header.anncmnt_is_home_only', null) ? (
                            (_.get(this.props, 'page.__metadata.urlPath', null) === '/') && (
                                <Announcement {...this.props} site={this.props} />
                            )
                        ) :
                            <Announcement {...this.props} site={this.props} />
                    )}
                    <Header page={page} config={config} />
                    <main id="content" className="site-content">
                        {this.props.children}
                    </main>
                    <Footer config={config} />
                </div>
                {(_.get(this.props, 'data.config.header.has_primary_nav', null) || _.get(this.props, 'data.config.header.has_secondary_nav', null)) && (
                    <div className="nav-overlay js-nav-toggle" />
                )}
            </React.Fragment>
        );
    }
}
