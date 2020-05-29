import React, {useState} from "react";

import './style.css';

const Tooltip = ({ text, isHidden = true, placement, bgColor, textColor }) => {
    const styles = {
        backgroundColor: bgColor,
        color: textColor
    }

    return (
        <div
            style={styles}
            className={`
                overlay__tooltip 
                ${isHidden ? '' : 'overlay__tooltip--is-visible'}
                overlay__tooltip--position-${placement}
            `}
        >{text}</div>
    );
}

const TooltipOverlay = ({ children, placement, tooltip }) => {
    const [showTooltip, setShowTooltip] = useState(true);
    const { text, position, bgColor, textColor } = tooltip;

    return (
        <div
            className="overlay"
            onMouseOver={() => setShowTooltip(false)}
            onMouseLeave={() => setShowTooltip(true)}
        >
            <Tooltip
                text={text}
                isHidden={showTooltip}
                placement={position}
                bgColor={bgColor}
                textColor={textColor}
            />
            {children}
        </div>
    )
};

export default TooltipOverlay;
