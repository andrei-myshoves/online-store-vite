export const validateImages = (files: Express.Multer.File[]) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (files.length > 5) {
        throw new Error('Максимум 5 изображений')
    }

    for (const file of files) {
        if (!allowedTypes.includes(file.mimetype)) {
            throw new Error('Неверный формат файла')
        }
    }
}
