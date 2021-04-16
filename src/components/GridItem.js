import React from 'react';
import _ from 'lodash';

import { classNames, withPrefix, markdownify } from '../utils';
import SectionActions from './SectionActions';

export default class GridItem extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionTitle = _.get(section, 'title');
        const sectionColumns = _.get(section, 'grid_cols', 'three');
        const gridGapY = _.get(section, 'grid_gap_vert', 'medium');
        const item = _.get(this.props, 'item');
        const title = _.get(item, 'title');
        const subtitle = _.get(item, 'subtitle');
        const titleAlignX = _.get(item, 'title_align', 'left');
        const titleClasses = classNames('item__title', {
            'h3': sectionColumns === 'two',
            'h4': sectionColumns === 'three',
            'h5': sectionColumns === 'four',
            'text-center': titleAlignX === 'center',
            'text-right': titleAlignX === 'right'
        });
        const content = _.get(item, 'content');
        const contentAlignX = _.get(item, 'content_align', 'left');
        const actions = _.get(item, 'actions');
        const actionsWidth = _.get(item, 'actions_width', 'auto');
        const actionsAlignX = _.get(item, 'actions_align', 'left');
        const hasText = title || subtitle || content || !_.isEmpty(actions);
        const image = _.get(item, 'image');
        const imageAlt = _.get(item, 'image_alt', '');
        const imageWidth = _.get(item, 'image_width', 'fifty');
        const imagePosition = _.get(item, 'image_position', 'top');
        const imageAlignX = _.get(item, 'image_align', 'left');
        const hasImagePadding = _.get(item, 'image_has_padding');
        const isHorizontal = hasText && image && (imagePosition === 'left' || imagePosition === 'right');
        const isCard = _.get(section, 'enable_cards');

        return (
            <div
                className={classNames('cell-12', 'cell-md-6', {
                    'cell-lg-4': sectionColumns === 'three' || sectionColumns === 'four',
                    'cell-xl-3': sectionColumns === 'four',
                    'my-1': gridGapY === 'small',
                    'my-2': gridGapY !== 'small',
                    'my-sm-3': gridGapY === 'large'
                })}
            >
                <div
                    className={classNames('item', {
                        'card': isCard,
                        'card--highlight': isCard,
                        'card--horiz': isCard && isHorizontal,
                        'card--vert': isCard && !isHorizontal,
                        'p-3': isCard && (hasImagePadding || !image),
                        'p-sm-4': isCard && (hasImagePadding || !image)
                    })}
                >
                    <div
                        className={classNames({
                            'grid': isHorizontal,
                            'grid-gap-none': isHorizontal,
                            'flex': !isHorizontal,
                            'flex-column': !isHorizontal
                        })}
                    >
                        {image && (
                            <div
                                className={classNames({
                                    'cell-12': isHorizontal,
                                    'cell-md-3': isHorizontal && imageWidth === 'twenty-five',
                                    'cell-md-4': isHorizontal && imageWidth === 'thirty-three',
                                    'cell-md-5': isHorizontal && imageWidth === 'fourty',
                                    'cell-md-6': isHorizontal && imageWidth === 'fifty',
                                    'cell-md-7': isHorizontal && imageWidth === 'sixty'
                                })}
                            >
                                <div
                                    className={classNames('item__media', {
                                        'card__media': isCard,
                                        'card__media--fill': isCard && !hasImagePadding,
                                        'card__media--top': isCard && imagePosition === 'top',
                                        'card__media--bottom': isCard && imagePosition === 'bottom',
                                        'card__media--left': isCard && imagePosition === 'left',
                                        'card__media--right': isCard && imagePosition === 'right',
                                        'mb-3': imagePosition !== 'bottom' && hasText && (!isCard || hasImagePadding),
                                        'mb-md-0': isHorizontal && (!isCard || hasImagePadding),
                                        'ml-md-3': imagePosition === 'right' && hasText && (!isCard || hasImagePadding),
                                        'mr-md-3': imagePosition === 'left' && hasText && (!isCard || hasImagePadding),
                                        'mt-3': imagePosition === 'bottom' && hasText && (!isCard || hasImagePadding)
                                    })}
                                >
                                    <img
                                        src={withPrefix(image)}
                                        alt={imageAlt}
                                        className={classNames({
                                            'mx-auto': imageAlignX === 'center',
                                            'ml-auto': imageAlignX === 'right'
                                        })}
                                    />
                                </div>
                            </div>
                        )}
                        {hasText && (
                            <div
                                className={classNames({
                                    'cell-12': isHorizontal,
                                    'cell-md-9': isHorizontal && imageWidth === 'twenty-five',
                                    'cell-md-8': isHorizontal && imageWidth === 'thirty-three',
                                    'cell-md-7': isHorizontal && imageWidth === 'fourty',
                                    'cell-md-6': isHorizontal && imageWidth === 'fifty',
                                    'cell-md-5': isHorizontal && imageWidth === 'sixty',
                                    'order-md-first': image && imagePosition === 'right',
                                    'order-first': image && imagePosition === 'bottom',
                                    'mb-auto': isCard && imagePosition === 'bottom' && hasImagePadding === false
                                })}
                            >
                                <div
                                    className={classNames('item__body', {
                                        'p-3': isCard && image && !hasImagePadding,
                                        'px-sm-4': isCard && image && !hasImagePadding,
                                        'pb-sm-4': isCard && image && !hasImagePadding && imagePosition !== 'bottom',
                                        'pt-sm-4': isCard && image && !hasImagePadding && imagePosition === 'bottom',
                                        'py-md-4': isCard && isHorizontal && !hasImagePadding,
                                        'pr-md-4': isCard && image && !hasImagePadding && imagePosition === 'left',
                                        'pl-md-3': isCard && image && !hasImagePadding && imagePosition === 'left',
                                        'pl-md-4': isCard && image && !hasImagePadding && imagePosition === 'right',
                                        'pr-md-3': isCard && image && !hasImagePadding && imagePosition === 'right'
                                    })}
                                >
                                    {title && (
                                        sectionTitle ? <h3 className={titleClasses}>{title}</h3>
                                            : <h2 className={titleClasses}>{title}</h2>
                                    )}
                                    {subtitle && (
                                        <p
                                            className={classNames('item__subtitle', {
                                                'text-center': titleAlignX === 'center',
                                                'text-right': titleAlignX === 'right'
                                            })}
                                        >
                                            {subtitle}
                                        </p>
                                    )}
                                    {content && (
                                        <div
                                            className={classNames('item__copy', {
                                                'text-center': contentAlignX === 'center',
                                                'text-right': contentAlignX === 'right'
                                            })}
                                        >
                                            {markdownify(content)}
                                        </div>
                                    )}
                                    {!_.isEmpty(actions) && (
                                        <div
                                            className={classNames('item__actions', 'btn-group', {
                                                'btn-group--fill': actionsWidth === 'full-width',
                                                'justify-center': actionsAlignX === 'center',
                                                'justify-end': actionsAlignX === 'right'
                                            })}
                                        >
                                            <SectionActions actions={actions} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
