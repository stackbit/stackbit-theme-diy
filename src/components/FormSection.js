import React from 'react';
import _ from 'lodash';

import { classNames, markdownify } from '../utils';
import SectionBackground from './SectionBackground';
import FormField from './FormField';

export default class FormSection extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const sectionId = _.get(section, 'section_id');
        const title = _.get(section, 'title');
        const subtitle = _.get(section, 'subtitle');
        const titleAlignX = _.get(section, 'title_align', 'left');
        const content = _.get(section, 'content');
        const contentAlignX = _.get(section, 'content_align', 'left');
        const backgroundColor = _.get(section, 'background_color', 'none');
        const backgroundImage = _.get(section, 'background_image');
        const paddingTop = _.get(section, 'padding_top', 'medium');
        const paddingBottom = _.get(section, 'padding_bottom', 'medium');
        const alignY = _.get(section, 'align_vert', 'top');
        const hasBorder = _.get(section, 'has_border');
        const formWidth = _.get(section, 'form_width', 'fifty');
        const formPosition = _.get(section, 'form_position', 'bottom');
        const formLayout = _.get(section, 'form_layout', 'stacked');
        const isCard = _.get(section, 'enable_card');
        const formId = _.get(section, 'form_id');
        const formAction = _.get(section, 'form_action');
        let formFields = _.get(section, 'form_fields', []);
        if (formLayout === 'inline') {
            formFields = formFields.slice(0, 1);
        }
        const submitLabel = _.get(section, 'submit_label');
        const formHoneypotInputId = formId + '-honeypot';
        const formHoneypotLabelId = formId + '-honeypot-label';
        const formHoneypotName = formId + '-bot-field';
        const isHorizontal = content && (formPosition === 'left' || formPosition === 'right');

        const annotationPrefix = this.props.annotationPrefix;
        return (
            <section
                id={sectionId}
                className={classNames('section', {
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
                data-sb-field-path={annotationPrefix}
            >
                {backgroundImage && <SectionBackground section={section} />}
                {(title || subtitle) && (
                    <div
                        className={classNames('container', 'container--medium', 'mb-3', {
                            'text-center': titleAlignX === 'center',
                            'text-right': titleAlignX === 'right'
                        })}
                    >
                        {subtitle && <div className="section__subtitle" data-sb-field-path=".subtitle">{subtitle}</div>}
                        {title && <h2 className="section__title mt-0" data-sb-field-path=".title">{title}</h2>}
                    </div>
                )}
                <div
                    className={classNames('container', {
                        'container--medium': !isHorizontal
                    })}
                >
                    <div
                        className={classNames('section__content', 'grid', {
                            'items-center': isHorizontal && alignY === 'middle',
                            'items-end': isHorizontal && alignY === 'bottom'
                        })}
                    >
                        {content && (
                            <div
                                className={classNames('section__copy', 'my-2', 'cell-12', {
                                    'cell-md-7': isHorizontal && formWidth === 'fourty',
                                    'cell-md-6': isHorizontal && formWidth === 'fifty',
                                    'cell-md-5': isHorizontal && formWidth === 'sixty',
                                    'text-center': contentAlignX === 'center',
                                    'text-right': contentAlignX === 'right'
                                })}
                                data-sb-field-path=".content"
                            >
                                {markdownify(content)}
                            </div>
                        )}
                        <div
                            className={classNames('section__form', 'my-2', 'cell-12', {
                                'cell-md-5': isHorizontal && formWidth === 'fourty',
                                'cell-md-6': isHorizontal && formWidth === 'fifty',
                                'cell-md-7': isHorizontal && formWidth === 'sixty',
                                'order-first': formPosition === 'top' || formPosition === 'left'
                            })}
                        >
                            <form
                                name={formId}
                                id={formId}
                                {...(formAction ? ({ action: formAction }) : null)}
                                method="POST"
                                data-netlify="true"
                                data-netlify-honeypot={formHoneypotName}
                                className={classNames({
                                    'form-inline': formLayout === 'inline',
                                    'card': isCard,
                                    'p-4': isCard,
                                    'p-sm-5': isCard
                                })}
                                data-sb-field-path=".form_id#@name .form_layout#@class .enable_card#@class"
                            >
                                <div className="sr-only">
                                    <label id={formHoneypotLabelId} htmlFor={formHoneypotInputId}>Don't fill this out if you're human:</label>
                                    <input aria-labelledby={formHoneypotLabelId} id={formHoneypotInputId} name={formHoneypotName} />
                                </div>
                                <input type="hidden" name="form-name" value={formId} />
                                <div
                                    className={classNames('form-content', {
                                        'flex': formLayout === 'inline',
                                        'flex-column': formLayout === 'inline',
                                        'flex-xs-row': formLayout === 'inline'
                                    })}
                                    data-sb-field-path=".form_fields"
                                >
                                    {_.map(formFields, (field, index) => (
                                            <div
                                                key={index}
                                                className={classNames('form-group', {
                                                    'mb-2': formLayout === 'stacked',
                                                    'mb-1': formLayout === 'inline',
                                                    'mb-xs-0': formLayout === 'inline',
                                                    'flex-auto': formLayout === 'inline'
                                                })}
                                                data-sb-field-path={`.${index} .${index}.input_type .${index}.is_required`}
                                            >
                                                <FormField field={field} />
                                            </div>
                                    ))}
                                    <div
                                        className={classNames('form-submit', {
                                            'mt-3': formLayout === 'stacked',
                                            'mx-auto': formLayout === 'inline',
                                            'mr-xs-0': formLayout === 'inline',
                                            'ml-xs-1': formLayout === 'inline'
                                        })}
                                    >
                                        <button type="submit" className="btn btn--primary" data-sb-field-path={`${annotationPrefix}.submit_label`}>{submitLabel}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
