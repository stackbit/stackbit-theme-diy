import React from 'react';
import _ from 'lodash';

import { classNames, withPrefix, htmlToReact, markdownify } from '../utils';
import SectionActions from './SectionActions';
import SectionBackground from './SectionBackground';

export default class FeaturesSection extends React.Component {
    renderFeature(feature, index, section) {
        const sectionTitle = _.get(section, 'title');
        const title = _.get(feature, 'title');
        const subtitle = _.get(feature, 'subtitle');
        const content = _.get(feature, 'content');
        const image = _.get(feature, 'image');
        const imageAlt = _.get(feature, 'image_alt', '');
        const videoEmbed = _.get(feature, 'video_embed_html');
        const actions = _.get(feature, 'actions');
        const alignX = _.get(feature, 'align', 'left');
        const paddingY = _.get(feature, 'feature_padding_vert', 'medium');
        const mediaWidth = _.get(feature, 'media_width', 'fifty');
        const mediaPosition = _.get(feature, 'media_position', 'top');
        const hasText = title || subtitle || content || !_.isEmpty(actions);
        const hasMedia = image || videoEmbed;
        const isHorizontal = hasText && hasMedia && (mediaPosition === 'left' || mediaPosition === 'right');

        return (
            <div
                key={index}
                className={classNames('feature', {
                    'maxw-medium': !isHorizontal,
                    'mx-auto': !isHorizontal,
                    'py-0': paddingY === 'small',
                    'py-1': paddingY !== 'small',
                    'py-sm-3': paddingY === 'large'
                })}
                data-sb-field-path={`.${index}`}
            >
                <div className="item__content grid items-center">
                    {hasMedia && (
                        <div
                            className={classNames('feature__media', 'my-2', 'cell-12', {
                                'cell-md-4': isHorizontal && mediaWidth === 'thirty-three',
                                'cell-md-5': isHorizontal && mediaWidth === 'fourty',
                                'cell-md-6': isHorizontal && mediaWidth === 'fifty',
                                'cell-md-7': isHorizontal && mediaWidth === 'sixty'
                            })}
                            {...(videoEmbed ? {'data-sb-field-path': '.video_embed_html#.'} : {})}
                        >
                            {videoEmbed ? htmlToReact(videoEmbed)
                                : <img
                                    src={withPrefix(image)}
                                    alt={imageAlt}
                                    className={classNames({
                                        'mx-auto': alignX === 'center',
                                        'ml-auto': alignX === 'right'
                                    })}
                                    data-sb-field-path=".image.url#@src .image_alt#@alt"
                                />}
                        </div>
                    )}
                    {hasText && (
                        <div
                            className={classNames('feature__body', 'my-2', 'cell-12', {
                                'cell-md-8': isHorizontal && mediaWidth === 'thirty-three',
                                'cell-md-7': isHorizontal && mediaWidth === 'fourty',
                                'cell-md-6': isHorizontal && mediaWidth === 'fifty',
                                'cell-md-5': isHorizontal && mediaWidth === 'sixty',
                                'order-md-first': hasMedia && mediaPosition === 'right',
                                'order-first': hasMedia && mediaPosition === 'bottom',
                                'text-center': alignX === 'center',
                                'text-right': alignX === 'right'
                            })}
                        >
                            {title && (
                                sectionTitle ? <h3 className="feature__title h2" data-sb-field-path=".title">{title}</h3>
                                    : <h2 className="feature__title h2" data-sb-field-path=".title">{title}</h2>
                            )}
                            {subtitle && <p className="feature__subtitle" data-sb-field-path=".subtitle">{subtitle}</p>}
                            {content && <div className="feature__copy" data-sb-field-path=".content">{markdownify(content)}</div>}
                            {!_.isEmpty(actions) && (
                                <div
                                    className={classNames('feature__actions', 'btn-group', {
                                        'justify-center': alignX === 'center',
                                        'justify-end': alignX === 'right'
                                    })}
                                    data-sb-field-path=".actions"
                                >
                                    <SectionActions actions={actions} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const backgroundColor = _.get(section, 'background_color', 'none');
        const backgroundImage = _.get(section, 'background_image');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');
        const alignX = _.get(section, 'align', 'center');
        const hasBorder = _.get(section, 'has_border');
        const features = _.get(section, 'features');
        const featurePaddingY = _.get(section, 'feature_padding_vert', 'medium');

        return (
            <section
                id={sectionId}
                className={classNames('section', 'features', {
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
                data-sb-field-path={this.props.annotationPrefix}
            >
                {backgroundImage && <SectionBackground section={section} />}
                {(title || subtitle) && (
                    <div
                        className={classNames('container', 'container--medium', {
                            'mb-5': featurePaddingY === 'small' || featurePaddingY === 'medium',
                            'mb-4': featurePaddingY === 'large',
                            'text-center': alignX === 'center',
                            'text-right': alignX === 'right'
                        })}
                    >
                        {subtitle && <div className="section__subtitle" data-sb-field-path=".subtitle">{subtitle}</div>}
                        {title && <h2 className="section__title mt-0" data-sb-field-path=".title">{title}</h2>}
                    </div>
                )}
                {!_.isEmpty(features) && (
                    <div className="container" data-sb-field-path=".features">
                        {_.map(features, (feature, index) => this.renderFeature(feature, index, section))}
                    </div>
                )}
            </section>
        );
    }
}
