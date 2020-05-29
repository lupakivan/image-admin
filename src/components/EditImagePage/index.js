import React from "react";
import {useParams, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Formik} from "formik"
import InputColor from "react-input-color"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import ImagePreview from "../ImagePreview";
import TooltipPositionBar from "../TooltipPositionBar";
import {updateImage} from "../../actions/image"
import {editImageFormSchema} from '../../validation/forms';

const EditImagePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const image = useSelector(state => state.images.find(image => image.id === id));

    const handleFormSubmit = (data) => {
        const {
            tooltipText,
            tooltipPosition,
            tooltipBgColor,
            tooltipTextColor
        } = data;

        dispatch(updateImage({
            history,
            image: {
                ...image,
                tooltip: {
                    text: tooltipText,
                    position: tooltipPosition,
                    bgColor: tooltipBgColor,
                    textColor: tooltipTextColor
                }
            }
        }));
    }

    if(!image) {
        return <div>Loading...</div>
    }

    return (
        <Col md={{ offset: 3, span: 6 }}>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={{
                    tooltipText: image.tooltip.text,
                    tooltipPosition: image.tooltip.position,
                    tooltipBgColor: image.tooltip.bgColor,
                    tooltipTextColor: image.tooltip.textColor,
                }}
                validationSchema={editImageFormSchema}
            >
                {({ handleSubmit, values, handleChange, handleBlur, setFieldValue, errors }) => (
                    <Form onSubmit={handleSubmit}>
                        <ImagePreview
                            className="image-preview"
                            imageSrc={image.src}
                            tooltip={{
                                position: values.tooltipPosition,
                                text: values.tooltipText,
                                bgColor: values.tooltipBgColor,
                                textColor: values.tooltipTextColor
                            }}
                        />
                        <Form.Group>
                            <Form.Label>Tooltip text: </Form.Label>
                            <Form.Control
                                type="text"
                                value={values.tooltipText}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="tooltipText"
                                isInvalid={errors.tooltipText}
                            />
                            <Form.Control.Feedback type="invalid">
                                tooltip text is {errors.tooltipText}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Tooltip background color: </Form.Label>
                                    <InputColor
                                        className="create-image-form__color-picker"
                                        initialValue={values.tooltipBgColor}
                                        onChange={({hex}) => setFieldValue('tooltipBgColor', hex)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Tooltip text color: </Form.Label>
                                    <InputColor
                                        className="create-image-form__color-picker"
                                        initialValue={values.tooltipTextColor}
                                        onChange={({hex}) => setFieldValue('tooltipTextColor', hex)}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Group>
                            <TooltipPositionBar
                                activePosition={values.tooltipPosition}
                                onChange={setFieldValue}
                                name="tooltipPosition"
                            />
                        </Form.Group>
                        <Button className="submit-button" type="submit" block>Save</Button>
                    </Form>
                )}
            </Formik>
        </Col>
    )
}

export default EditImagePage;
