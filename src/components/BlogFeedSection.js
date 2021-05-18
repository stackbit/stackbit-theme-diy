import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { classNames, Link, withPrefix, getData, getPageUrl } from '../utils';
import SectionActions from './SectionActions';
import SectionBackground from './SectionBackground';
import BlogPostCategories from './BlogPostCategories';
import BlogPostAuthor from './BlogPostAuthor';

export default class BlogFeedSection extends React.Component {
    renderBlogFeedItemFilter(post, data, section) {
        const sectionAuthorRef = _.get(section, 'author');
        const sectionCategoryRef = _.get(section, 'category');
        const sectionTagRef = _.get(section, 'tag');
        if (sectionAuthorRef) {
            const sectionAuthor = getData(data, sectionAuthorRef);
            const postAuthorRef = _.get(post, 'author')
            const postAuthor = getData(data, postAuthorRef);
            if (postAuthor.id === sectionAuthor.id) {
                return this.renderBlogFeedItem(post, data, section);
            }
        } else if (sectionCategoryRef) {
            const sectionCategory = getData(data, sectionCategoryRef);
            const postCategoryRefs = _.get(post, 'categories');
            const postCategories = _.map(postCategoryRefs, (postCategoryRef) => {
                return getData(data, postCategoryRef);
            });
            const category = _.find(postCategories, { id: sectionCategory.id });
            if (category) {
                return this.renderBlogFeedItem(post, data, section);
            }
        } else if (sectionTagRef) {
            const sectionTag = getData(data, sectionTagRef);
            const postTagRefs = _.get(post, 'tags');
            const postTags = _.map(postTagRefs, (postTagRef) => {
                return getData(data, postTagRef);
            });
            const tag = _.find(postTags, { id: sectionTag.id });
            if (tag) {
                return this.renderBlogFeedItem(post, data, section);
            }
        } else {
            return this.renderBlogFeedItem(post, data, section);
        }
        return null;
    }

    renderBlogFeedItem(post, data, section) {
        const postUrl = getPageUrl(post, { withPrefix: true });
        const title = _.get(post, 'title');
        const image = _.get(post, 'thumb_image');
        const imageAlt = _.get(post, 'thumb_image_alt', '');
        const date = _.get(post, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const author = _.get(post, 'author');
        const categories = _.get(post, 'categories', []);
        const excerpt = _.get(post, 'excerpt');
        const sectionTitle = _.get(section, 'title');
        const sectionColumns = _.get(section, 'blog_feed_cols', 'three');
        const isCard = _.get(section, 'enable_cards');
        const showImage = _.get(section, 'show_image');
        const showDate = _.get(section, 'show_date');
        const showCategories = _.get(section, 'show_categories');
        const showAuthor = _.get(section, 'show_author');
        const showExcerpt = _.get(section, 'show_excerpt');

        return (
            <article
                className={classNames('cell-12', 'cell-md-6', 'my-2', {
                    'cell-lg-4': sectionColumns === 'three'
                })}
            >
                <div
                    className={classNames('item', {
                        'card': isCard,
                        'card--highlight': isCard,
                        'card--vert': isCard
                    })}
                >
                    <div className="flex flex-column">
                        {image && showImage && (
                            <div
                                className={classNames('item__media', 'mb-3', {
                                    'card__media': isCard,
                                    'card__media--fill': isCard,
                                    'card__media--top': isCard
                                })}
                            >
                                <Link href={postUrl}><img src={withPrefix(image)} alt={imageAlt} /></Link>
                            </div>
                        )}
                        <div
                            className={classNames('item__body', {
                                'px-3': isCard,
                                'px-sm-4': isCard,
                                'pb-3': isCard,
                                'pb-sm-4': isCard,
                                'pt-3': isCard && !(image && showImage),
                                'pt-sm-4': isCard && !(image && showImage)
                            })}
                        >
                            {(showDate || (!_.isEmpty(categories) && showCategories)) && (
                                <div className="item__meta mb-1">
                                    {!_.isEmpty(categories) && showCategories && (
                                        <React.Fragment>
                                            <BlogPostCategories categories={categories} data={data} containerClass={'item__cat'} />
                                            {showDate && <span className="item__meta-sep"> &middot; </span>}
                                        </React.Fragment>
                                    )}
                                    {showDate && <span className="item__date"><time dateTime={dateTimeAttr}>{formattedDate}</time></span>}
                                </div>
                            )}
                            {sectionTitle ? (
                                <h3
                                    className={classNames('item__title', 'mt-0', {
                                        'h3': sectionColumns === 'two',
                                        'h4': sectionColumns === 'three'
                                    })}
                                >
                                    <Link href={postUrl}>{title}</Link>
                                </h3>
                            ) : (
                                <h2
                                    className={classNames('item__title', 'mt-0', {
                                        'h3': sectionColumns === 'two',
                                        'h4': sectionColumns === 'three'
                                    })}
                                >
                                    <Link href={postUrl}>{title}</Link>
                                </h2>
                            )}
                            {excerpt && showExcerpt && <div className="item__copy"><p>{excerpt}</p></div>}
                            {author && showAuthor && (
                                <BlogPostAuthor author={author} data={data} containerClass={'item__byline'} avatarSize={'small'} />
                            )}
                        </div>
                    </div>
                </div>
            </article>
        );
    }

    render() {
        const data = _.get(this.props, 'data');
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
        const showRecent = _.get(section, 'show_recent');
        const recentCount = _.get(section, 'recent_count', 3);
        let posts = _.orderBy(_.get(this.props, 'posts', []), 'date', 'desc');
        if (showRecent) {
            posts = posts.slice(0, recentCount);
        }

        return (
            <section
                id={sectionId}
                className={classNames('section', 'blog-feed', {
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
                        className={classNames('container', 'container--medium', 'mb-5', {
                            'text-center': alignX === 'center',
                            'text-right': alignX === 'right'
                        })}
                    >
                        {subtitle && <div className="section__subtitle">{subtitle}</div>}
                        {title && <h2 className="section__title mt-0">{title}</h2>}
                    </div>
                )}
                <div className="container">
                    <div className="grid">
                        {_.map(posts, (post, index) => {
                            return <React.Fragment key={index}>{this.renderBlogFeedItemFilter(post, data, section)}</React.Fragment>;
                        })}
                    </div>
                </div>
                {!_.isEmpty(actions) && (
                    <div className="container container--medium mt-4">
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
