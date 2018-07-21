import {Directive, HostBinding, HostListener} from "@angular/core";

@Directive({
    selector: '[wfmDropDown]'
})
export class DpordownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') onClick(){
        this.isOpen = !this.isOpen;
    }
}