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
}

export default CarsController;