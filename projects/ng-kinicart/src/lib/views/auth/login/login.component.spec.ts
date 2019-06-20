import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('MyPreRegistrationsComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginButtons;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                FormsModule,
                RouterTestingModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        loginButtons = fixture.debugElement.queryAll(By.css('button'));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disable login button if no username password', () => {
        let loginButton = loginButtons[0].nativeElement;
        fixture.detectChanges();
        expect(loginButton.disabled).toBe(true);
    });

    it('should enable login when username password entered', () => {
        let loginButton = loginButtons[0].nativeElement;
        component.email = 'test@me.com';
        component.password = 'password';
        fixture.detectChanges();
        expect(loginButton.disabled).toBe(false);
    })
});
