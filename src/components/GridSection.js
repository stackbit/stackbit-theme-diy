import React from 'react';
import _ from 'lodash';

import { classNames } from '../utils';
import GridItem from './GridItem';
import SectionActions from './SectionActions';
import SectionBackground from './SectionBackground';

export default class GridSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const actions = _.get(section, 'actions');
        const backgroundColor = _.get(section, 'background_color', 'none');
        const backgroundImage = _.get(section, 'background_image');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');
        const alignX = _.get(section, 'align', 'center');
        const hasBorder = _.get(section, 'has_border');
        const gridItems = _.get(section, 'grid_items');
        const gridGapX = _.get(section, 'grid_gap_horiz', 'medium');
        const gridGapY = _.get(section, 'grid_gap_vert', 'medium');

        return (
            <section
                id={sectionId}
                className={classNames('section', {
                    'has-border': hasBorder,
                    'has-cover': backgroundImage,
                    'bg-none': backgroundColor === 'none',
                    'bg-primary': backgroundColor === 'primary',
                    'bg-secondary': backgroundColor === 'secondary',
                    'pt-4': paddingTop === 'small',
                    'pt-6': paddingTop === 'medium' || paddingTop === 'large',
                    'pt-md-7': paddingTop === 'large',
                    'pb-4': paddingBottom === 'small',
                    'pb-6': paddingBottom === 'medium' || paddingBottom === 'large',
                    'pb-md-7': paddingBottom === 'large'
                })}
            >
                {backgroundImage && <SectionBackground section={section} />}
                {(title || subtitle) && (
                    <div
                        className={classNames('container', 'container--medium', {
                            'mb-5': gridGapY === 'small' || gridGapY === 'medium',
                            'mb-4': gridGapY === 'large',
                            'text-center': alignX === 'center',
                            'text-right': alignX === 'right'
                        })}
                    >
                        {subtitle && <div className="section__subtitle">{subtitle}</div>}
                        {title && <h2 className="section__title mt-0">{title}</h2>}
                    </div>
                )}
                {!_.isEmpty(gridItems) && (
                    <div className="container">
                        <div
                            className={classNames('grid', {
                                'grid-gap-small': gridGapX === 'small',
                                'grid-gap-large': gridGapX === 'large'
                            })}
                        >
                            {_.map(gridItems, (item, index) => (
                                <GridItem key={index} item={item} section={section} />
                            ))}
                        </div>
                    </div>
                )}
                {!_.isEmpty(actions) && (
                    <div
                        className={classNames('container', 'container--medium', {
                            'mt-4': gridGapY !== 'large',
                            'mt-3': gridGapY === 'large'
                        })}
                    >
                        <div
                            className={classNames('section__actions', 'btn-group', {
                                'justify-center': alignX === 'center',
                                'justify-end': alignX === 'right'
                            })}
                        >
                            <SectionActions actions={actions} />
                        </div>
                    </div>
                )}
            </section>
        );
    }
}
