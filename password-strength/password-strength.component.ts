import {Component, OnInit, Input, SimpleChange} from '@angular/core';

@Component({
    selector: 'app-password-strength',
    templateUrl: './password-strength.component.html',
    styleUrls: ['./password-strength.component.css']
})
export class PasswordStrengthComponent implements OnInit {
    @Input() strPass: string;
    private progressVal: number = 0;

    constructor() { }

    //jQuery grep source code
    jqGrep = function (elems, callback, inv) {
        let ret = [];
        for (let i = 0, length = elems.length; i < length; i++) {
            if (!inv !== !callback(elems[i], i)) {
                ret.push(elems[i]);
            }
        }
        return ret;
    };

    getStrength = function (p) {

        let _force = 0;
        let _regex = /[$-/:-?{-~!"^_`\[\]]/g;

        let _lowerLetters = /[a-z]+/.test(p);
        let _upperLetters = /[A-Z]+/.test(p);
        let _numbers = /[0-9]+/.test(p);
        let _symbols = _regex.test(p);

        let _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];
        let _passedMatches = this.jqGrep(_flags, function (el) {
            return el === true;
        }).length;

        _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
        _force += _passedMatches * 10;

        // penality (short password)
        _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

        // penality (poor letiety of characters)
        _force = (_passedMatches == 1) ? Math.min(_force, 33) : _force;
        _force = (_passedMatches == 2) ? Math.min(_force, 66) : _force;
        _force = (_passedMatches == 3) ? Math.min(_force, 100) : _force;
        return _force;

    }


    ngOnChanges(changes: SimpleChange) {
        this.progressVal = this.getStrength(changes['strPass'].currentValue);
    }

    ngOnInit() {

    }

}
