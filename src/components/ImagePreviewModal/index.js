import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {Link} from 'react-router-dom';

import ImagePreview from "../ImagePreview"

import './style.css';

const ImagePreviewModal = ({ image, show, onHide, onImageDelete }) => {
    if(!image) return null

    return (
        <Modal dialogClassName="image-preview-modal" show={show} onHide={onHide}>
            <Modal.Body>
                <ImagePreview
                    imageSrc={image.src}
                    tooltip={image.tooltip}
                />
            </Modal.Body>
            <Modal.Footer>
                <Link to={`/edit/${image.id}`}>
                    <Button variant="primary">Edit</Button>
                </Link>
                <Button variant="danger" onClick={onImageDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default React.memo(ImagePreviewModal);
