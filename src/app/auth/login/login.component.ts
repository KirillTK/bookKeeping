import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {Message} from '../../shared/models/message.model';
import {AuthService} from '../../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AngularFireDatabase} from "angularfire2/database";

@Component({
    selector: 'wfm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    message: Message;

    constructor(private  usersService: UsersService, private authService: AuthService,
                private router: Router, private route: ActivatedRoute) {
        // Nothing
    }

    ngOnInit() {
        this.message = new Message('', 'danger');
        this.route.queryParams
            .subscribe((param: Params) => {
                if (param['nowCanLogin']) {
                    this.showMessage({text: 'Теперь вы можете войти в систему', type: 'success'});
                }
            });
        this.loginForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'passoword': new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    private showMessage(message: Message): void {
        this.message = message;
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }

    onSumbit(): void {
        const formData = this.loginForm.value;
        this.usersService.getUserByEmail(formData.email)
            .subscribe(user => {
                if (user) {
                    if (user.password.toString() == formData.passoword) {
                        this.message.text = '';
                        window.localStorage.setItem('user', JSON.stringify(user));
                        this.authService.login();
                        this.router.navigate(['/system','bill']);
                    } else {
                        this.showMessage({text: 'Пароль не верный', type: 'danger'});
                    }
                } else {
                    this.showMessage({text: 'Такого пользователя не существует', type: 'danger'});
                }
            }, error => console.log(error));
    }

}
