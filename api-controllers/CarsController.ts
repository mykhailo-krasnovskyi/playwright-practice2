class CarsController {
    private request;

    constructor(request) {
        this.request = request;
    }

    async getUserCars(cookies: string) {
        return await this.request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${cookies}`
            }
        });
    }

    async addNewCar(carBrandId: number, carModelId: number, mileage: number, cookies: string) {
        return await this.request.post('/api/cars', {
            data: {
                carBrandId,
                carModelId,
                mileage,
            },
            headers: {
                'Cookie': `sid=${cookies}`
            }
        });
    }
}

export default CarsController;