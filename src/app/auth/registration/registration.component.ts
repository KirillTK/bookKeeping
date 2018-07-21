import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/users.service';
import {User} from '../../shared/models/user.model';
import {Router} from '@angular/router';

@Component({
    selector: 'wfm-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    registrationForm: FormGroup;

    constructor(private userService: UsersService, private router: Router) {
    }

    ngOnInit() {
        this.registrationForm = new FormGroup({
            'email': new FormControl(null, [Validators.required, Validators.email],this.forBiddenEmails.bind(this)),
            'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
            'name': new FormControl(null, [Validators.required]),
            'agree': new FormControl(false, [Validators.requiredTrue]),
        });
    }

    onSumbmit() {
        const {email, password, name} = this.registrationForm.value;
        const user = new User(email, password, name);
        this.userService.createNewUser(user);
        this.router.navigate(['/login'], {
            queryParams: {nowCanLogin: true}
        });
    }

    forBiddenEmails(control: FormControl): Promise<any> {
        return new Promise((resolve, reject) => {
            this.userService.getUserByEmail(control.value)
                .subscribe((user) => {
                    if (user) {
                        resolve({forBiddenEmail: true});
                    } else {
                        resolve(null);
                    }
                });
        });
    }

}
