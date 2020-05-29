import {LS_KEYS} from "../constants/localstorage"
import shortID from 'shortid';

const getImagesFromLS = () => {
    const images = localStorage.getItem(LS_KEYS.IMAGES);
    return images ? JSON.parse(images) : [];
};

const saveImagesToLS = images => {
    localStorage.setItem(LS_KEYS.IMAGES, JSON.stringify(images));
}

const saveImageToLS = image => {
    const images = getImagesFromLS();

    images.push(image);

    saveImagesToLS(images);
};

const handlePost = body => {
    return new Promise(((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageData = {
                id: shortID(),
                src: e.target.result,
                tooltip: {
                    text: body.get('tooltipText'),
                    position: body.get('tooltipPosition'),
                    bgColor: body.get('tooltipBgColor'),
                    textColor: body.get('tooltipTextColor'),
                }
            }
            saveImageToLS(imageData);

            resolve({
                status: 201,
                json() {
                    return Promise.resolve(imageData)
                }
            });
        }

        reader.readAsDataURL(body.get('file'));
    }));
}

const handleGet = () => {
    return Promise.resolve({
        status: 200,
        json() {
            return Promise.resolve(getImagesFromLS())
        }
    });
}

const handleDelete = id => {
    const images = getImagesFromLS();

    saveImagesToLS(images.filter(image => image.id !== id));

    return Promise.resolve({ status: 200 });
}

const handleUpdate = (id, data) => {
    const images = getImagesFromLS();
    const index = images.findIndex(image => image.id === id);
    const image = images[index];

    image.tooltip.text = data.tooltip.text;
    image.tooltip.position = data.tooltip.position;
    image.tooltip.bgColor = data.tooltip.bgColor;
    image.tooltip.textColor = data.tooltip.textColor;

    saveImagesToLS(images);

    return Promise.resolve({
        status: 200,
        json() {
            return Promise.resolve({
                image
            });
        }
    });
}

export default (url, { method = 'GET', body = {} } = {}) => {
    if(url.startsWith('https://api.com/images')) {
        if(method === 'GET') {
            return handleGet();
        }

        if(method === 'POST') {
            return handlePost(body);
        }

        if(method === 'DELETE') {
            return handleDelete(url.split('/').pop());
        }

        if(method === 'PUT') {
            return handleUpdate(url.split('/').pop(), body);
        }

        return handleGet();
    }
}
