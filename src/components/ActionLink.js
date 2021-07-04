import React from 'react';
import _ from 'lodash';

import { Link, withPrefix } from '../utils';

export default class ActionLink extends React.Component {
    render() {
        const action = _.get(this.props, 'action');
        const url = _.get(action, 'url');
        const label = _.get(action, 'label');
        const newWindow = _.get(action, 'new_window');
        const noFollow = _.get(action, 'no_follow');
        const attrs = {};
        if (newWindow) {
            attrs.target = '_blank';
        }
        if (newWindow || noFollow) {
            attrs.rel = [(newWindow ? 'noopener' : ''), (noFollow ? 'nofollow' : '')].filter(Boolean).join(' ');
        }

        const annotationPrefix = _.get(this.props, 'annotationPrefix', '');

        return <Link href={withPrefix(url)} {...attrs} data-sb-field-path={`${annotationPrefix}.label ${annotationPrefix}.url#@href`}>{label}</Link>;
    }
}
