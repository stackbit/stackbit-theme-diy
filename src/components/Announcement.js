import React from 'react';
import _ from 'lodash';

import {classNames, markdownify} from '../utils';
import Icon from './Icon';

export default class Announcement extends React.Component {
    render() {
        let site = _.get(this.props, 'site', null);
        let align_x = _.get(site, 'data.config.header.anncmnt_align', null) || 'left';
        let has_close_btn = _.get(site, 'data.config.header.anncmnt_has_close', null);
        return (
            <div className={classNames('announcement-bar', 'py-2', {'js-announcement': has_close_btn, 'is-hidden': has_close_btn})}{...(has_close_btn ? ({"data-anncmnt-id": _.get(site, 'data.config.header.anncmnt_id', null)}) : null)}>
            	<div className="container">
            		<div className="announcement-bar__content">
            			<div className={classNames('announcement-bar__copy', {'text-center': align_x === 'center', 'text-right': align_x === 'right'})}>
            				{markdownify(_.get(site, 'data.config.header.anncmnt_content', null))}
            			</div>
            			{has_close_btn && (
            			<button aria-label="Close" className="btn btn--icon btn--clear js-announcment-close">
            				<Icon {...this.props} icon={'close'} />
            				<span className="sr-only">Close</span>
            			</button>
            			)}
            		</div>
            	</div>
            </div>
        );
    }
}
