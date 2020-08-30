import React from 'react';

const TRANSPARENT_IMAGE_DATA_SRC = "data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export default function SimpleImage({src="", className="", alt=""}) {
    return (
        <img
            src={TRANSPARENT_IMAGE_DATA_SRC}
            data-src={src}
            className={className + " lazy"}
            {...{alt}}
        />
    )
}
