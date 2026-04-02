type ValidateImagesOptions = {
    files: Express.Multer.File[]
    allowedTypes?: string[]
    maxCount?: number
    minCount?: number
    maxSizeMb?: number
}

const DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

/**
 * Проверяет массив файлов изображений
 *
 * @param options.files - массив файлов multer
 * @param options.allowedTypes - допустимые mime-типы
 * @param options.maxCount - максимум файлов
 * @param options.minCount - минимум файлов
 * @param options.maxSizeMb - максимальный размер файла (MB)
 */
export const validateImages = ({
    files,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    maxCount = 5,
    minCount = 0,
    maxSizeMb = 5,
}: ValidateImagesOptions) => {
    if (files.length > maxCount) {
        throw new Error(`Максимум ${maxCount} файлов`)
    }

    if (files.length < minCount) {
        throw new Error(`Минимум ${minCount} файлов`)
    }

    for (const file of files) {
        if (!allowedTypes.includes(file.mimetype)) {
            throw new Error('Неверный формат файла')
        }

        const sizeMb = file.size / (1024 * 1024)

        if (sizeMb > maxSizeMb) {
            throw new Error(`Файл больше ${maxSizeMb}MB`)
        }
    }
}
