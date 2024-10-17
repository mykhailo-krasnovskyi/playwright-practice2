class AuthController {
    private request;

    constructor(request) {
        this.request = request;
    }

    async signInAndGetCookies(email: string, password: string) {
        let sid: string = '';
        const authRequest = await this.request.post('/api/auth/signin', {
            data: {
                "email": email,
                "password": password,
                "remember": false
            }

        })

        const cookies = authRequest.headers()['set-cookie'];
        if (cookies) {
            const cookieArray = cookies.split('\n');
            for (const cookie of cookieArray) {
                if (cookie.trim().startsWith('sid=')) {
                    sid = (cookie.trim().split('=')[1]).split(';')[0];
                    break;
                }
            }
        }
        return sid;


    }
}

export default AuthController;