import React from 'react';
import _ from 'lodash';

import { withPrefix } from '../utils';

export default class SectionBackground extends React.Component {
    render() {
        const section = _.get(this.props, 'section');
        const backgroundImage = _.get(section, 'background_image');
        const backgroundImageOpacity = _.get(section, 'background_image_opacity', 100) * 0.01;
        const backgroundImageSize = _.get(section, 'background_image_size', 'cover');
        const backgroundImagePosition = _.get(section, 'background_image_position', 'center center');
        const backgroundImageRepeat = _.get(section, 'background_image_repeat', 'no-repeat');

        return (
            <div
                className="cover-img"
                style={{
                    backgroundImage: `url('${withPrefix(backgroundImage)}')`,
                    opacity: backgroundImageOpacity,
                    backgroundSize: backgroundImageSize,
                    backgroundPosition: backgroundImagePosition,
                    backgroundRepeat: backgroundImageRepeat
                }}
                data-sb-field-path=".background_image#@style .background_image_opacity#@style .background_image_size#@style .background_image_position#@style .background_image_repeat#@style"
            />
        );
    }
}
