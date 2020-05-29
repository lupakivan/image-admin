import * as Yup from "yup"

const tooltipTextSchema = Yup.string()
    .min(2, 'too short!')
    .max(50, 'too long')
    .required('required!');

const allowedFileExt = ['jpeg', 'jpg', 'png', 'bmp', 'gif'];
const imageFileSchema = Yup.mixed()
    .required('is required')
    .test('fileFormat', `format must be one of ${allowedFileExt.join(', ')}`, file => {
        const [, fileExtension] = file.name.split('.');
        return allowedFileExt.includes(fileExtension);
    });

export const editImageFormSchema = Yup.object().shape({
    tooltipText: tooltipTextSchema
});

export const createImageFormSchema = Yup.object().shape({
    tooltipText: tooltipTextSchema,
    image: imageFileSchema
})
