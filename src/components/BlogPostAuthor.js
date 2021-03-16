import React from 'react';
import _ from 'lodash';

import {getData, Link, withPrefix, classNames} from '../utils';

export default class BlogPostAuthor extends React.Component {
    render() {
        const data = _.get(this.props, 'data');
        const authorRef = _.get(this.props, 'author');
        const author = getData(data, authorRef);
        if (!author) {
            return null;
        }
        const containerClass = _.get(this.props, 'containerClass', '');
        const avatarSize = _.get(this.props, 'avatarSize', 'medium');
        const authorAvatar = author.photo;
        const authorAvatarAlt = author.photo_alt || '';
        const authorFirstName = author.first_name || '';
        const authorLastName = author.last_name || '';

        if (author.link) {
            return (
                <div className={containerClass}>
                    <Link className="flex items-center" href={withPrefix(author.link)}>
                        {authorAvatar && (
                            <figure
                                className={classNames('avatar', 'mr-2', {
                                    'avatar--small': avatarSize === 'small'
                                })}
                            >
                                <img className="avatar__img" src={withPrefix(authorAvatar)} alt={authorAvatarAlt} />
                            </figure>
                        )}
                        <span>{_.trim(`${authorFirstName} ${authorLastName}`)}</span>
                    </Link>
                </div>
            );
        } else {
            return (
                <div className={containerClass}>
                    <div className="flex items-center">
                        {authorAvatar && (
                            <figure
                                className={classNames('avatar', 'mr-2', {
                                    'avatar--small': avatarSize === 'small'
                                })}
                            >
                                <img className="avatar__img" src={withPrefix(authorAvatar)} alt={authorAvatarAlt} />
                            </figure>
                        )}
                        <span>{_.trim(`${authorFirstName} ${authorLastName}`)}</span>
                    </div>
                </div>
            );
        }
    }
}
