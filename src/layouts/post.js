import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { classNames, withPrefix, markdownify } from '../utils';
import BlogPostCategories from '../components/BlogPostCategories';
import BlogPostAuthor from '../components/BlogPostAuthor';
import BlogPostTags from '../components/BlogPostTags';

export default class Post extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const config = _.get(data, 'config');
        const page = _.get(this.props, 'page');
        const title = _.get(page, 'title');
        const subtitle = _.get(page, 'subtitle');
        const image = _.get(page, 'image');
        const imageAlt = _.get(page, 'image_alt', '');
        const imagePosition = _.get(page, 'image_position', 'top');
        const date = _.get(page, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%B %d, %Y');
        const author = _.get(page, 'author');
        const categories = _.get(page, 'categories', []);
        const tags = _.get(page, 'tags', []);
        const markdownContent = _.get(page, 'markdown_content');

        return (
            <Layout page={page} config={config}>
                <article className="post py-5 py-sm-6 py-md-7">
                    <div
                        className={classNames('post__hero', 'container', {
                            'container--medium': _.isEmpty(image) || imagePosition === 'top'
                        })}
                    >
                        <div
                            className={classNames('mb-4', {
                                'mb-sm-5': imagePosition !== 'top',
                                'mb-md-6': imagePosition !== 'top',
                                'grid': imagePosition !== 'top',
                                'items-center': image && imagePosition !== 'top'
                            })}
                        >
                            {image && (
                                <div
                                    className={classNames('post__image', 'mb-3', {
                                        'cell-12': imagePosition !== 'top',
                                        'cell-lg-7': imagePosition !== 'top',
                                        'mb-lg-0': imagePosition !== 'top'
                                    })}
                                >
                                    <img src={withPrefix(image)} alt={imageAlt} />
                                </div>
                            )}
                            <header
                                className={classNames('post__header', {
                                    'cell-12': imagePosition !== 'top',
                                    'cell-lg-5': imagePosition !== 'top',
                                    'order-lg-first': image && imagePosition === 'right'
                                })}
                            >
                                <div className="post__meta mb-2">
                                    {!_.isEmpty(categories) && (
                                        <React.Fragment>
                                            <BlogPostCategories categories={categories} data={data} containerClass={'post__cat'} />
                                            <span className="post__meta-sep"> &middot; </span>
                                        </React.Fragment>
                                    )}
                                    <span className="post__date"><time dateTime={dateTimeAttr}>{formattedDate}</time></span>
                                </div>
                                <h1 className="post__title mt-0">{title}</h1>
                                {subtitle && <p className="post__subtitle">{subtitle}</p>}
                                {author && <BlogPostAuthor author={author} data={data} containerClass={'post__byline'} avatarSize={'medium'} />}
                            </header>
                        </div>
                    </div>
                    <div className="container container--medium">
                        {markdownContent && <div className="post__body text-block">{markdownify(markdownContent)}</div>}
                        {!_.isEmpty(tags) && (
                            <footer className="post__footer mt-4 mt-md-5">
                                <BlogPostTags tags={tags} data={data} />
                            </footer>
                        )}
                    </div>
                </article>
            </Layout>
        );
    }
}
