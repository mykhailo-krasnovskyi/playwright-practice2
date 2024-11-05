import { test, expect, Locator } from '@playwright/test';
import { mainUserEmail, mainUserPassword } from '../../../test-data/credentials';
import AuthController from '../../../api-controllers/AuthController';
import CarsController from '../../../api-controllers/CarsController';
import { send } from 'process';

test.describe('DDT', () => {

    let sid: string;

    test.beforeAll(async ({ request }) => {
        const authController = new AuthController(request);
        sid = await authController.signInAndGetCookies(mainUserEmail, mainUserPassword);

    })

    const carsList = [

        {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 123
        },
        {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 321
        },
        {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 421
        },
        {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 124
        },
        {
            "carBrandId": 1,
            "carModelId": 1,
            "mileage": 412
        },


    ]

    const senderAddress = "Test";

    const usersList = [
        {
            receiver: 'Test 1',
        },
        {
            receiver: 'Test 2',
        },
        {
            receiver: 'Test 3',
        },
    ]

    usersList.forEach((user) => {
        test(`Send `, async ({ request }) => {
            const response = await request.post('/api/cars/', {
                // receiver: user.receiver,
                // sender: 'Test Address',
            });
            console.log(await response.json());
        })
    })


    carsList.forEach((car) => {
        test(`Car with mileage ${car.mileage} added`, async ({ request }) => {
            const response = await request.post('/api/cars/', {
                data: car,
                headers: {
                    'Cookie': `sid=${sid}`
                }
            });
            console.log(await response.json());
        })

    })
})

// 7 passed (4.4s)
test.describe('API requests', () => {
    let carsController: CarsController;

    test('get models', async ({ request }) => {
        const response = await request.get('/api/cars/models');
        const body = await response.json();
        const carTitle = body.data[3].title;
        expect(carTitle).toEqual('A6');
    })

    test('get brands', async ({ request }) => {
        const response = await request.get('/api/cars/brands');
        const body = await response.json();
        const brandTitle = body.data[2].title;
        expect(brandTitle).toEqual('Ford');
    })

    let sid: string;

    test.beforeAll(async ({ request }) => {
        const authController = new AuthController(request);
        sid = await authController.signInAndGetCookies(mainUserEmail, mainUserPassword);

    })

    test.beforeEach(async ({ request }) => {
        carsController = new CarsController(request);
    })

    test('private get cars 1', async ({ request }) => {
        console.log(await request.storageState());

        const response = await carsController.getUserCars(sid);
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(0);
        console.log(body)
    })

    test('private get cars 2', async ({ request }) => {


        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        });
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(0);
    })

    test('private get cars 3', async ({ request }) => {


        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        });
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(0);
    })

    test('private get cars 4', async ({ request }) => {

        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        });
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(0);
    })

    test('private get cars 5', async ({ request }) => {

        const response = await request.get('/api/cars', {
            headers: {
                'Cookie': `sid=${sid}`
            }
        });
        const body = await response.json();
        expect(body.data.length).toBeGreaterThan(0);
    })


})
