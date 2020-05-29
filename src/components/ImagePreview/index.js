import React from "react";
import Image from 'react-bootstrap/Image';

import TooltipOverlay from "./TooltipOverlay";

const ImagePreview = ({ imageSrc, tooltip }) => {
    return (
        <TooltipOverlay
            tooltip={tooltip}
        >
            <Image src={imageSrc} fluid rounded />
        </TooltipOverlay>
    )
}

export default React.memo(ImagePreview);
