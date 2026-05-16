export const advertisementMockState = {
    advertisement: {
        data: {
            id: 1,
            name: 'Fantastic Gold Bike',
            description: 'Очень хороший товар. Практически новый.',
            price: 72769,
            city: 'Gdańsk',
            images: [],
            userId: 1,
            reviewsCount: 12,
            createdAt: new Date().toISOString(),
        },
        isLoading: false,
        error: null,
    },
}
