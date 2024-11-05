import { test, expect, Locator } from '@playwright/test';
import { mainUserEmail, mainUserPassword } from '../../test-data/credentials';
import AuthController from '../../api-controllers/AuthController';
import CarsController from '../../api-controllers/CarsController';
import ExpensesController from '../../api-controllers/ExpensesController';
import { carFordFocus } from '../../test-data/cars';


test.describe('API preconditions', () => {
    let carsController: CarsController;
    let authController: AuthController;
    let expensesController: ExpensesController;

    let sid: string;
    let newAddedCarId: number;
    let newAddedCarMileage: number;


    test.beforeAll(async ({ request }) => {
        authController = new AuthController(request);
       
        carsController = new CarsController(request);

        sid = await authController.signInAndGetCookies(mainUserEmail, mainUserPassword);

        const responseOnAddingCar = await carsController.addNewCar(carFordFocus.carBrandId, carFordFocus.carModelId, carFordFocus.mileage, sid);
        const responseOnAddingCarJson = await responseOnAddingCar.json();
        newAddedCarId = responseOnAddingCarJson.data.id;
        newAddedCarMileage = responseOnAddingCarJson.data.mileage;

    })
    test.beforeEach(async ({ request }) => {
        authController = new AuthController(request);
        expensesController = new ExpensesController(request);
    })

    test('Get Expenses', async () => {
        const responseOnAddingExpenses = await expensesController.getExpenses(newAddedCarId, sid);
        console.log(await responseOnAddingExpenses.json());
    })

    test('Add Expenses', async () => {
        const responseOnAddingExpenses = await expensesController.addExpenses(newAddedCarId, '2024-11-04', newAddedCarMileage + 1, 10, 1000, sid);
        console.log(await responseOnAddingExpenses.json());
    })

})
