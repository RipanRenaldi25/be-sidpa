export const getFileExtension = (originalname: string) => {
    const splitedFileName = originalname.split('.');
    const fileExtension = splitedFileName[splitedFileName.length - 1];

    return fileExtension;
};