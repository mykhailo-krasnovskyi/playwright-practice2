class ExpensesController {
    private request;

    constructor(request) {
        this.request = request;
    }

    async addExpenses(carId: number, reportedAt: string, mileage: number, liters: number, totalCost: number, cookies: string) {
        return await this.request.post('/api/expenses', {
            data: {
                carId,
                reportedAt,
                mileage,
                liters,
                totalCost
            },
            headers: {
                'Cookie': `sid=${cookies}`
            },

        });
    }

    async getExpenses(carId: number, cookies: string) {
        return await this.request.get(`/api/expenses?carId=${carId} `, {
            headers: {
                'Cookie': `sid=${cookies}`
            },

        });
    }
}

export default ExpensesController;