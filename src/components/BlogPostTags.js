import React from 'react';
import _ from 'lodash';

import { getData, Link, withPrefix } from '../utils';

export default class BlogPostTags extends React.Component {
    renderTag(tagRef, index, data) {
        const tag = getData(data, tagRef);
        if (!tag) {
            return null;
        }
        if (tag.link) {
            return <Link key={index} className="mr-1" href={withPrefix(tag.link)}>{tag.title}</Link>;
        } else {
            return <span key={index} className="mr-1">{tag.title}</span>;
        }
    }

    render() {
        const data = _.get(this.props, 'data');
        const tags = _.get(this.props, 'tags');

        return (
            _.map(tags, (tagRef, index) =>this.renderTag(tagRef, index, data))
        );
    }
}
