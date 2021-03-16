import React from 'react';
import _ from 'lodash';

import {classNames, withPrefix, markdownify} from '../utils';
import SectionActions from './SectionActions';

export default class GridItem extends React.Component {
    render() {
        let section = _.get(this.props, 'section', null);
        let item = _.get(this.props, 'item', null);
        let columns = _.get(section, 'grid_cols', null) || 'three';
        let gap_y = _.get(section, 'grid_gap_vert', null) || 'medium';
        let is_card = false;
        let has_text = false;
        let title_align_x = _.get(item, 'title_align', null) || 'left';
        let content_align_x = _.get(item, 'content_align', null) || 'left';
        let actions_align_x = _.get(item, 'actions_align', null) || 'left';
        let actions_width = _.get(item, 'actions_width', null) || 'auto';
        let has_image = false;
        let image_align_x = _.get(item, 'image_align', null) || 'left';
        let image_width = _.get(item, 'image_width', null) || 'fifty';
        let image_pos = _.get(item, 'image_position', null) || 'top';
        let image_has_padding = false;
        let is_horiz = false;
        let is_vert = false;
        let is_card_has_padding = false;
        let is_card_no_padding = false;
        let is_card_no_img_no_padding = false;
        if (_.get(section, 'enable_cards', null)) {
             is_card = true;
        }
        if ((((_.get(item, 'title', null) || _.get(item, 'subtitle', null)) || _.get(item, 'content', null)) || _.get(item, 'actions', null))) {
             has_text = true;
        }
        if (_.get(item, 'image', null)) {
             has_image = true;
        }
        if (((has_image === false) || (has_text === false))) {
             image_pos = 'top';
        }
        if (_.get(item, 'image_has_padding', null)) {
             image_has_padding = true;
        }
        if (((image_pos === 'left') || (image_pos === 'right'))) {
             is_horiz = true;
        }
        if (((image_pos === 'top') || (image_pos === 'bottom'))) {
             is_vert = true;
        }
        if ((is_card && image_has_padding)) {
             is_card_has_padding = true;
        }
        if ((is_card && (image_has_padding === false))) {
             is_card_no_padding = true;
        }
        if (((is_card && (has_image === false)) && (image_has_padding === false))) {
             is_card_no_img_no_padding = true;
        }
        return (
            <React.Fragment>
                <div className={classNames('cell-12', 'cell-md-6', {'cell-lg-4': (columns === 'three') || (columns === 'four'), 'cell-xl-3': columns === 'four', 'my-1': gap_y === 'small', 'my-2': gap_y !== 'small', 'my-sm-3': gap_y === 'large'})}>
                	<div className={classNames('item', {'card': is_card, 'card--highlight': is_card, 'card--horiz': is_card && is_horiz, 'card--vert': is_card && is_vert, 'p-3': is_card_has_padding || is_card_no_img_no_padding, 'p-sm-4': is_card_has_padding || is_card_no_img_no_padding})}>
                		<div className={classNames({'grid': is_horiz, 'grid-gap-none': is_horiz, 'flex': is_vert, 'flex-column': is_vert})}>
                			{has_image && (
                			<div className={classNames({'cell-12': is_horiz, 'cell-md-3': is_horiz && (image_width === 'twenty-five'), 'cell-md-4': is_horiz && (image_width === 'thirty-three'), 'cell-md-5': is_horiz && (image_width === 'fourty'), 'cell-md-6': is_horiz && (image_width === 'fifty'), 'cell-md-7': is_horiz && (image_width === 'sixty')})}>
                				<div className={classNames('item__media', {'card__media': is_card, 'card__media--fill': is_card_no_padding, 'card__media--top': is_card && (image_pos === 'top'), 'card__media--bottom': is_card && (image_pos === 'bottom'), 'card__media--left': is_card && (image_pos === 'left'), 'card__media--right': is_card && (image_pos === 'right'), 'mb-3': ((image_pos !== 'bottom') && has_text) && (is_card_no_padding === false), 'mb-md-0': (is_horiz && has_text) && (is_card_no_padding === false), 'ml-md-3': ((image_pos === 'right') && has_text) && (is_card_no_padding === false), 'mr-md-3': ((image_pos === 'left') && has_text) && (is_card_no_padding === false), 'mt-3': ((image_pos === 'bottom') && has_text) && (is_card_no_padding === false)})}>
                					<img src={withPrefix(_.get(item, 'image', null))} alt={_.get(item, 'image_alt', null)} className={classNames('', {'mx-auto': image_align_x === 'center', 'ml-auto': image_align_x === 'right'})} />
                				</div>
                			</div>
                			)}
                			{has_text && (
                			<div className={classNames({'cell-12': is_horiz, 'cell-md-9': is_horiz && (image_width === 'twenty-five'), 'cell-md-8': is_horiz && (image_width === 'thirty-three'), 'cell-md-7': is_horiz && (image_width === 'fourty'), 'cell-md-6': is_horiz && (image_width === 'fifty'), 'cell-md-5': is_horiz && (image_width === 'sixty'), 'order-md-first': has_image && (image_pos === 'right'), 'order-first': has_image && (image_pos === 'bottom'), 'mb-auto': (is_card && (image_pos === 'bottom')) && (image_has_padding === false)})}>
                				<div className={classNames('item__body', {'p-3': has_image && is_card_no_padding, 'px-sm-4': has_image && is_card_no_padding, 'pb-sm-4': (has_image && is_card_no_padding) && (image_pos !== 'bottom'), 'pt-sm-4': (has_image && is_card_no_padding) && (image_pos === 'bottom'), 'py-md-4': (has_image && is_card_no_padding) && is_horiz, 'pr-md-4': (has_image && is_card_no_padding) && (image_pos === 'left'), 'pl-md-3': (has_image && is_card_no_padding) && (image_pos === 'left'), 'pl-md-4': (has_image && is_card_no_padding) && (image_pos === 'right'), 'pr-md-3': (has_image && is_card_no_padding) && (image_pos === 'right')})}>
                					{_.get(item, 'title', null) && (
                						_.get(section, 'title', null) ? (
                						<h3 className={classNames('item__title', {'h3': columns === 'two', 'h4': columns === 'three', 'h5': columns === 'four', 'text-center': title_align_x === 'center', 'text-right': title_align_x === 'right'})}>{_.get(item, 'title', null)}</h3>
                						) : 
                						<h2 className={classNames('item__title', {'h3': columns === 'two', 'h4': columns === 'three', 'h5': columns === 'four', 'text-center': title_align_x === 'center', 'text-right': title_align_x === 'right'})}>{_.get(item, 'title', null)}</h2>
                					)}
                					{_.get(item, 'subtitle', null) && (
                					<p className={classNames('item__subtitle', {'text-center': title_align_x === 'center', 'text-right': title_align_x === 'right'})}>
                						{_.get(item, 'subtitle', null)}
                					</p>
                					)}
                					{_.get(item, 'content', null) && (
                					<div className={classNames('item__copy', {'text-center': content_align_x === 'center', 'text-right': content_align_x === 'right'})}>
                						{markdownify(_.get(item, 'content', null))}
                					</div>
                					)}
                					{_.get(item, 'actions', null) && (
                					<div className={classNames('item__actions', 'btn-group', {'btn-group--fill': actions_width === 'full-width', 'justify-center': actions_align_x === 'center', 'justify-end': actions_align_x === 'right'})}>
                						<SectionActions {...this.props} actions={_.get(item, 'actions', null)} />
                					</div>
                					)}
                				</div>
                			</div>
                			)}
                		</div>
                	</div>
                </div>
            </React.Fragment>
        );
    }
}
