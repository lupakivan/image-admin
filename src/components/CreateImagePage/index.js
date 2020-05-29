import React, {useState} from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from 'yup';
import InputColor from 'react-input-color';

import ImagePreview from "../ImagePreview";
import TooltipPositionBar from "../TooltipPositionBar";
import {TOOLTIP_POSITION} from "../../constants/tooltip";
import { createImage } from "../../actions/image";

import './styles.css';

const allowedFileExt = ['jpeg', 'jpg', 'png', 'bmp', 'gif'];
const formValidationSchema = Yup.object().shape({
    tooltipText: Yup.string()
        .min(2, 'too short!')
        .max(50, 'too long')
        .required('required!'),
    image: Yup.mixed()
        .required('is required')
        .test('fileFormat', `format must be one of ${allowedFileExt.join(', ')}`, file => {
            if(!file) return false

            const [, fileExtension] = file.name.split('.');
            return allowedFileExt.includes(fileExtension);
        })
})

const CreateImagePage = () => {
    const [localImageURL, setLocalImageURL] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const showImage = file => {
        const [, fileExtension] = file.name.split('.');

        if(fileExtension && allowedFileExt.includes(fileExtension)) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setLocalImageURL(e.target.result);
            }

            reader.readAsDataURL(file);
        }
    }

    const handleFormSubmit = (data) => {
        const {
            tooltipText,
            tooltipPosition,
            image,
            tooltipBgColor,
            tooltipTextColor
        } = data;

        dispatch(createImage({
            history,
            data: image,
            tooltip: {
                text: tooltipText,
                position: tooltipPosition,
                bgColor: tooltipBgColor,
                textColor: tooltipTextColor
            }
        }));
    }

    return (
        <Col md={{ offset: 3, span: 6 }}>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={{
                    tooltipText: '',
                    tooltipPosition: TOOLTIP_POSITION.TOP,
                    tooltipBgColor: '#000',
                    tooltipTextColor: '#fff',
                    image: null
                }}
                validationSchema={formValidationSchema}
            >
                {({ handleSubmit, values, handleChange, handleBlur, setFieldValue, errors }) => (
                    <Form onSubmit={handleSubmit}>
                        {console.log(errors)}
                        <Form.Group>
                            <Form.Label>Image file: </Form.Label>
                            <Form.Control
                                type="file"
                                label="Custom file input"
                                name="image"
                                isInvalid={errors.image}
                                onChange={event => {
                                    const file =  event.currentTarget.files[0]
                                    setFieldValue("image", file);
                                    showImage(file);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                image file {errors.image}
                            </Form.Control.Feedback>
                            {
                                localImageURL &&
                                <ImagePreview
                                    className="image-preview"
                                    imageSrc={localImageURL}
                                    tooltip={{
                                        position: values.tooltipPosition,
                                        text: values.tooltipText,
                                        bgColor: values.tooltipBgColor,
                                        textColor: values.tooltipTextColor
                                    }}
                                />
                            }
                        </Form.Group>
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

export default CreateImagePage;
