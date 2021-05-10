import React from 'react';
import _ from 'lodash';

import { classNames, markdownify } from '../utils';
import SectionActions from './SectionActions';
import SectionBackground from './SectionBackground';

export default class CtaSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const content = _.get(section, 'content');
        const actions = _.get(section, 'actions');
        const backgroundColor = _.get(section, 'background_color', 'none');
        const backgroundImage = _.get(section, 'background_image');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');
        const alignX = _.get(section, 'align', 'center');
        const hasBorder = _.get(section, 'has_border');
        const actionsWidth = _.get(section, 'actions_width', 'fifty');
        const actionsPosition = _.get(section, 'actions_position', 'bottom');
        const hasText = title || content;
        const isHorizontal = hasText && !_.isEmpty(actions) && (actionsPosition === 'left' || actionsPosition === 'right');

        return (
            <section
                id={sectionId}
                className={classNames('section', 'cta', {
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
                <div
                    className={classNames('container', {
                        'container--medium': !isHorizontal
                    })}
                >
                    <div className="cta__content grid items-center">
                        {hasText && (
                            <div
                                className={classNames('cta__body', 'my-1', 'cell-12', {
                                    'cell-md-7': isHorizontal && actionsWidth === 'fourty',
                                    'cell-md-6': isHorizontal && actionsWidth === 'fifty',
                                    'cell-md-5': isHorizontal && actionsWidth === 'sixty',
                                    'text-center': alignX === 'center',
                                    'text-right': alignX === 'right'
                                })}
                            >
                                {title && <h1 className="cta__title">{title}</h1>}
                                {content && <div className="cta__copy">{markdownify(content)}</div>}
                            </div>
                        )}
                        {!_.isEmpty(actions) && (
                            <div
                                className={classNames('cta__actions', 'my-1', 'cell-12', {
                                    'cell-md-5': isHorizontal && actionsWidth === 'fourty',
                                    'cell-md-6': isHorizontal && actionsWidth === 'fifty',
                                    'cell-md-7': isHorizontal && actionsWidth === 'sixty',
                                    'order-md-first': hasText && actionsPosition === 'left',
                                    'order-first': hasText && actionsPosition === 'top'
                                })}
                            >
                                <div
                                    className={classNames('btn-group', {
                                        'justify-md-center': isHorizontal,
                                        'justify-center': alignX === 'center',
                                        'justify-end': alignX === 'right'
                                    })}
                                >
                                    <SectionActions actions={actions} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
