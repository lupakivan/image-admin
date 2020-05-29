import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useHistory } from 'react-router-dom';

import {deleteImage} from "../../actions/image";
import ImagePreviewModal from "../ImagePreviewModal";

import './style.css';

const MainPage = () => {
    const dispatch = useDispatch();
    const images = useSelector(state => state.images);
    const history = useHistory();
    const [activeImageID, setActiveImageID] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const redirectToCreateImagePage = () => {
        history.push('/create');
    }

    const handleGridItemClick = e => {
        if(e.target.tagName === 'IMG') {
            setActiveImageID(e.target.getAttribute('data-id'));
            setShowModal(true);
        }
    }

    const getActiveImage = () => {
        return images ? images.filter(image => image.id === activeImageID)[0] : null;
    }

    const handleModalHide = () => {
        setShowModal(false);
    }

    const handleImageDelete = () => {
        dispatch(deleteImage(activeImageID));
        setShowModal(false);
    }

    const renderImages = images => {
        if(images) {
            return (
                <Row onClick={handleGridItemClick}>{
                    images.map(image => {
                        return (
                            <Col key={image.id} md={{ span: 4 }} className="grid__item">
                                <Image src={image.src} fluid data-id={image.id} />
                            </Col>
                        )
                    })
                }
                </Row>
            )
        }

        return <div>Loading...</div>
    }

    return (
        <div className="grid">
            <Row>
                <Col className="grid__add-button-wrapper" md={{ offset: 4, span: 4 }}>
                    <button onClick={redirectToCreateImagePage}>Add New Image</button>
                </Col>
            </Row>
            {renderImages(images)}
            <ImagePreviewModal
                show={showModal}
                image={getActiveImage()}
                onHide={handleModalHide}
                onImageDelete={handleImageDelete}
            />
        </div>
    )
}

export default MainPage;
