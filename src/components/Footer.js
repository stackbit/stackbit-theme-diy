import React from 'react';
import _ from 'lodash';

import { classNames, Link, withPrefix, htmlToReact } from '../utils';
import Action from './Action';
import ActionIcon from './ActionIcon';
import ActionLink from './ActionLink';

export default class Footer extends React.Component {
    renderNav(navLinks, navTitle, navKey) {
        return (
            <div className="site-footer__menu cell-12 cell-md my-3 my-md-4">
                {navTitle && <h2 className="h4 mb-3 mb-md-4" data-sb-field-path={`.${navKey}_nav_title`}>{navTitle}</h2>}
                <ul className="menu" data-sb-field-path={`.${navKey}_nav_links`}>
                    {_.map(navLinks, (action, index) => (
                        <li key={index} className="menu__item mb-1" data-sb-field-path={`.${index}`}>
                            <Action action={action} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    render() {
        const config = _.get(this.props, 'config');
        const footer = _.get(config, 'footer');
        const logo = _.get(footer, 'logo');
        const logoAlt = _.get(footer, 'logo_alt', '');
        const hasPrimaryNav = _.get(footer, 'has_primary_nav');
        const primaryNavTitle = _.get(footer, 'primary_nav_title');
        const primaryNavLinks = _.get(footer, 'primary_nav_links');
        const hasSecondaryNav = _.get(footer, 'has_secondary_nav');
        const secondaryNavTitle = _.get(footer, 'secondary_nav_title');
        const secondaryNavLinks = _.get(footer, 'secondary_nav_links');
        const hasTertiaryNav = _.get(footer, 'has_tertiary_nav');
        const tertiaryNavTitle = _.get(footer, 'tertiary_nav_title');
        const tertiaryNavLinks = _.get(footer, 'tertiary_nav_links');
        const hasSocial = _.get(footer, 'has_social');
        const socialLinks = _.get(footer, 'social_links');
        const copyright = _.get(footer, 'content');
        const links = _.get(footer, 'links');

        return (
            <footer className="site-footer" data-sb-field-path={`${config.__metadata.id}:footer`}>
                {(logo || (hasPrimaryNav && !_.isEmpty(primaryNavLinks)) || (hasSecondaryNav && !_.isEmpty(secondaryNavLinks)) || (hasTertiaryNav && !_.isEmpty(tertiaryNavLinks))) && (
                    <div className="site-footer__nav py-5 py-md-6">
                        <div className="container">
                            <div
                                className={classNames('grid', {
                                    'justify-md-center': logo
                                })}
                            >
                                {logo && <Link className="site-footer__logo cell-12 cell-md-5 my-4" href={withPrefix('/')}><img src={withPrefix(logo)} alt={logoAlt} data-sb-field-path=".logo.url#@src" /></Link>}
                                {hasPrimaryNav && !_.isEmpty(primaryNavLinks) && this.renderNav(primaryNavLinks, primaryNavTitle, 'primary')}
                                {hasSecondaryNav && !_.isEmpty(secondaryNavLinks) && this.renderNav(secondaryNavLinks, secondaryNavTitle, 'secondary')}
                                {hasTertiaryNav && !_.isEmpty(tertiaryNavLinks) && this.renderNav(tertiaryNavLinks, tertiaryNavTitle, 'tertiary')}
                            </div>
                        </div>
                    </div>
                )}
                {(copyright || !_.isEmpty(links) || (hasSocial && !_.isEmpty(socialLinks))) && (
                    <div className="site-footer__info py-3 py-sm-4">
                        <div className="container">
                            <div className="grid items-center">
                                {(copyright || !_.isEmpty(links)) && (
                                    <div
                                        className={classNames('site-footer__copyright', 'cell-12', {
                                            'cell-sm': hasSocial && !_.isEmpty(socialLinks)
                                        })}
                                    >
                                        {copyright && <span data-sb-field-path=".content">{htmlToReact(copyright)}</span>}
                                        {_.map(links, (action, index) => (
                                            <ActionLink key={index} action={action} annotationPrefix={`${config.__metadata.id}:footer.links.${index}`} />
                                        ))}
                                    </div>
                                )}
                                {hasSocial && !_.isEmpty(socialLinks) && (
                                    <div
                                        className={classNames('site-footer__social', 'cell-12', {
                                            'cell-sm-auto': copyright || !_.isEmpty(links)
                                        })}
                                        data-sb-field-path=".social_links .has_social"
                                    >
                                        {_.map(socialLinks, (action, index) => (
                                            <ActionIcon key={index} action={action} annotationPrefix={`${config.__metadata.id}:footer.social_links.${index}`} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </footer>
        );
    }
}
