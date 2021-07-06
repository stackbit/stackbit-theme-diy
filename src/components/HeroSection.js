import React from 'react';
import _ from 'lodash';

import { classNames, withPrefix, htmlToReact, markdownify } from '../utils';
import SectionActions from './SectionActions';
import SectionBackground from './SectionBackground';

export default class HeroSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const content = _.get(section, 'content');
        const image = _.get(section, 'image');
        const imageAlt = _.get(section, 'image_alt', '');
        const videoEmbed = _.get(section, 'video_embed_html');
        const actions = _.get(section, 'actions');
        const backgroundColor = _.get(section, 'background_color', 'none');
        const backgroundImage = _.get(section, 'background_image');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');
        const alignX = _.get(section, 'align', 'center');
        const hasBorder = _.get(section, 'has_border');
        const mediaWidth = _.get(section, 'media_width', 'fifty');
        const mediaPosition = _.get(section, 'media_position', 'top');
        const hasText = title || subtitle || content || !_.isEmpty(actions);
        const hasMedia = image || videoEmbed;
        const isHorizontal = hasText && hasMedia && (mediaPosition === 'left' || mediaPosition === 'right');

        return (
            <section
                id={sectionId}
                className={classNames('section', 'hero', {
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
                <div
                    className={classNames('container', {
                        'container--medium': !isHorizontal
                    })}
                >
                    <div className="hero__content grid items-center">
                        {hasMedia && (
                            <div
                                className={classNames('hero__media', 'my-2', 'cell-12', {
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
                                className={classNames('hero__body', 'my-2', 'cell-12', {
                                    'cell-md-7': isHorizontal && mediaWidth === 'fourty',
                                    'cell-md-6': isHorizontal && mediaWidth === 'fifty',
                                    'cell-md-5': isHorizontal && mediaWidth === 'sixty',
                                    'order-md-first': hasMedia && mediaPosition === 'right',
                                    'order-first': hasMedia && mediaPosition === 'bottom',
                                    'text-center': alignX === 'center',
                                    'text-right': alignX === 'right'
                                })}
                            >
                                {title && <h1 className="hero__title" data-sb-field-path=".title">{title}</h1>}
                                {subtitle && <p className="hero__subtitle" data-sb-field-path=".subtitle">{subtitle}</p>}
                                {content && <div className="hero__copy" data-sb-field-path=".content">{markdownify(content)}</div>}
                                {!_.isEmpty(actions) && (
                                    <div
                                        className={classNames('hero__actions', 'btn-group', {
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
            </section>
        );
    }
}
