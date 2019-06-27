import { LoginComponent } from './login.component';

class MockAuthService {

    public login(email, password) {
        return Promise.resolve(email === password ? { step: '2FA' } : true);
    }

}

class MockRouter {

    public navigate(route) {
        return route;
    }

}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let service: any;
    let router: any;

    beforeEach(async () => {
        service = new MockAuthService();
        router = new MockRouter();
        component = new LoginComponent(router, service);
    });

    afterEach(async () => {
        service = null;
        component = null;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not attempt a login if no email & password is supplied', (done) => {
        let loginSpy = spyOn(service, 'login');
        component.ngOnInit().then(() => {
            component.login();
            expect(loginSpy).not.toHaveBeenCalled();
            done();
        });
    });

    it('should attempt a login if an email and password is supplied', (done) => {
        let loginSpy = spyOn(service, 'login').and.callThrough();
        let routerSpy = spyOn(router, 'navigate');
        component.ngOnInit().then(() => {
            component.email = 'hello';
            component.password = 'password';
            component.login().then(() => {
                expect(loginSpy).toHaveBeenCalledWith('hello', 'password');
                expect(component.loading).toBeFalsy();
                expect(routerSpy).toHaveBeenCalledWith(['/']);
                done();
            });
        });
    });

    it('should attempt a login if an email and password is supplied and navigate to the passed in route', (done) => {
        let loginSpy = spyOn(service, 'login').and.callThrough();
        let routerSpy = spyOn(router, 'navigate');
        component.ngOnInit().then(() => {
            component.email = 'hello';
            component.password = 'password';
            component.loginRoute = '/my-account';
            component.login().then(() => {
                expect(loginSpy).toHaveBeenCalledWith('hello', 'password');
                expect(component.loading).toBeFalsy();
                expect(component.twoFA).toBeFalsy();
                expect(routerSpy).toHaveBeenCalledWith(['/my-account']);
                done();
            });
        });
    });

    it('should prompt for 2FA workflow if login supports it', (done) => {
        let loginSpy = spyOn(service, 'login').and.callThrough();
        let routerSpy = spyOn(router, 'navigate');
        component.ngOnInit().then(() => {
            component.email = 'hello';
            component.password = 'hello';
            component.login().then(() => {
                expect(loginSpy).toHaveBeenCalledWith('hello', 'hello');
                expect(component.loading).toBeFalsy();
                expect(routerSpy).not.toHaveBeenCalled();
                expect(component.twoFA).toBeTruthy();
                done();
            });
        });
    });

});
