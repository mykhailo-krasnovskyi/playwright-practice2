import { test, expect, Locator } from '@playwright/test';
import { mainUserEmail, mainUserPassword } from '../../test-data/credentials';
import AuthController from '../../api-controllers/AuthController';
import CarsController from '../../api-controllers/CarsController';


test.describe('API preconditions', () => {
    let carsController: CarsController;
    let authController: AuthController;

    let sid: string;

    test.beforeAll(async ({ request }) => {
        authController = new AuthController(request);
        sid = await authController.signInAndGetCookies(mainUserEmail, mainUserPassword);

    })
    test.beforeEach(async ({ request }) => {
        authController = new AuthController(request);
        carsController = new CarsController(request);
    })

    test('Delete/Create mainUser1', async () => {
        const responseOnDeleting = await authController.deleteUser(sid);
        const bodyOnDeleting = await responseOnDeleting.json();
        expect(bodyOnDeleting.status).toBe('ok');

        const responseOnCreating = await authController.createUser('Test', 'LastName', mainUserEmail, mainUserPassword, sid);
        const bodyOnCreating = await responseOnCreating.json();
        expect(bodyOnDeleting.status).toBe('ok');

    })

})
