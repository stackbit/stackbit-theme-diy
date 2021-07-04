import React from 'react';
import _ from 'lodash';

export default class FormField extends React.Component {
    render() {
        const field = _.get(this.props, 'field');
        const inputType = _.get(field, 'input_type');
        const name = _.get(field, 'name');
        const defaultValue = _.get(field, 'default_value');
        const options = _.get(field, 'options');
        const required = _.get(field, 'is_required');
        const label = _.get(field, 'label');
        const labelId = `${name}-label`;
        const attr = {};
        if (label) {
            attr['aria-labelledby'] = labelId;
        }
        if (required) {
            attr.required = true;
        }

        switch (inputType) {
            case 'checkbox':
                return (
                    <div className="form-checkbox">
                        <input type="checkbox" id={name} name={name} {...attr} data-sb-field-path=".name#@name .default_value#@value" />
                        {label && <label htmlFor={name} id={labelId} data-sb-field-path=".label">{label}</label>}
                    </div>
                );
            case 'select':
                return (
                    <React.Fragment>
                        {label && <label htmlFor={name} id={labelId} data-sb-field-path=".label">{label}</label>}
                        <div className="form-select">
                            <select id={name} name={name} {...attr} data-sb-field-path=".name#@name .default_value#@value .options">
                                {defaultValue && <option value="">{defaultValue}</option>}
                                {_.map(options, (option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>
                    </React.Fragment>
                );
            case 'textarea':
                return (
                    <React.Fragment>
                        {label && <label htmlFor={name} id={labelId} data-sb-field-path=".label">{label}</label>}
                        <textarea name={name} id={name} rows="5" {...(defaultValue ? { placeholder: defaultValue } : null)} {...attr} data-sb-field-path=".name#@name .default_value#@placeholder"/>
                    </React.Fragment>
                );
            default:
                return (
                    <React.Fragment>
                        {label && <label htmlFor={name} id={labelId} data-sb-field-path=".label">{label}</label>}
                        <input type={inputType} name={name} id={name} {...(defaultValue ? { placeholder: defaultValue } : null)} {...attr} data-sb-field-path=".name#@name .default_value#@placeholder"/>
                        <span className="animate-border" aria-hidden="true" />
                    </React.Fragment>
                );
        }
    }
}
