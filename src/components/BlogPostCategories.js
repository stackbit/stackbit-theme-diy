import React from 'react';
import _ from 'lodash';

import { getData, Link, withPrefix } from '../utils';

export default class BlogPostCategories extends React.Component {
    renderCategory(categoryRef, categoryLength, index, data) {
        const category = getData(data, categoryRef);
        if (!category) {
            return null;
        }
        if (category.link) {
            return (
                <React.Fragment key={index}>
                    <Link href={withPrefix(category.link)} data-sb-field-path={`.${index}.title`}>{category.title}</Link>
                    {index < categoryLength - 1 && ', '}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment key={index}>
                    <span data-sb-field-path={`.${index}.title`}>{category.title}</span>
                    {index < categoryLength - 1 && ', '}
                </React.Fragment>
            )
        }
    }

    render() {
        const data = _.get(this.props, 'data');
        const categories = _.get(this.props, 'categories');
        const categoryLength = _.size(categories);
        const containerClass = _.get(this.props, 'containerClass', '');

        const annotationPrefix = _.get(this.props, 'annotationPrefix', '');

        return (
            <span className={containerClass} data-sb-field-path={annotationPrefix}>
                {_.map(categories, (categoryRef, index) =>this.renderCategory(categoryRef, categoryLength, index, data))}
            </span>
        );
    }
}
