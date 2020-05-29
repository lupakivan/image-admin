import React from "react";
import FormCheck from "react-bootstrap/FormCheck";
import FormLabel from "react-bootstrap/FormLabel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

import { TOOLTIP_POSITION } from "../../constants/tooltip"
import noop from "../../utils/noop";

const TooltipPositionBar = ({ activePosition = TOOLTIP_POSITION.TOP, onChange = noop, name }) => {

    const handleInputChange = ({ target }) => {
        onChange(name, target.value)
    }

    return (
        <Form.Row>
            <Col md={{ offset: 2, span: 2 }}>
                <FormLabel>
                    <FormCheck
                        name={name}
                        type="radio"
                        value={TOOLTIP_POSITION.TOP}
                        checked={activePosition === TOOLTIP_POSITION.TOP}
                        onChange={handleInputChange}
                    />
                    {TOOLTIP_POSITION.TOP}
                </FormLabel>
            </Col>
            <Col md={2}>
                <FormLabel>
                    <FormCheck
                        name={name}
                        type="radio"
                        value={TOOLTIP_POSITION.RIGHT}
                        checked={activePosition === TOOLTIP_POSITION.RIGHT}
                        onChange={handleInputChange}
                    />
                    {TOOLTIP_POSITION.RIGHT}
                </FormLabel>
            </Col>
            <Col md={2}>
                <FormLabel>
                    <FormCheck
                        name={name}
                        type="radio"
                        value={TOOLTIP_POSITION.BOTTOM}
                        checked={activePosition === TOOLTIP_POSITION.BOTTOM}
                        onChange={handleInputChange}
                    />
                    {TOOLTIP_POSITION.BOTTOM}
                </FormLabel>
            </Col>
            <Col md={2}>
                <FormLabel>
                    <FormCheck
                        name={name}
                        type="radio"
                        value={TOOLTIP_POSITION.LEFT}
                        checked={activePosition === TOOLTIP_POSITION.LEFT}
                        onChange={handleInputChange}
                    />
                    {TOOLTIP_POSITION.LEFT}
                </FormLabel>
            </Col>
        </Form.Row>
    )
}

export default React.memo(TooltipPositionBar)
