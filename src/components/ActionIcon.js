import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, classNames } from '../utils';
import Icon from './Icon';

export default class ActionIcon extends React.Component {
    render() {
        const action = _.get(this.props, 'action');
        const hasIcon = _.get(action, 'has_icon');
        const icon = _.get(action, 'icon');
        if (!hasIcon || !icon) {
            return null;
        }
        const url = _.get(action, 'url');
        const label = _.get(action, 'label');
        const style = _.get(action, 'style', 'link');
        const classes = classNames('btn', 'btn--icon', {
            'btn--primary': style === 'primary',
            'btn--secondary': style === 'secondary',
            'btn--clear': style === 'link'
        });
        const newWindow = _.get(action, 'new_window');
        const noFollow = _.get(action, 'no_follow');
        const attrs = {};
        if (newWindow) {
            attrs.target = '_blank';
        }
        if (newWindow || noFollow) {
            attrs.rel = [(newWindow ? 'noopener' : ''), (noFollow ? 'nofollow' : '')].filter(Boolean).join(' ');
        }

        return (
            <Link href={withPrefix(url)} {...attrs} className={classes}>
                <Icon icon={icon} />
                <span className="sr-only">{label}</span>
            </Link>
        );
    }
}
