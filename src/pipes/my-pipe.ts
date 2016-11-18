///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import { Pipe } from 'angular2/core';

@Pipe({name: 'MyPipe'})
export class MyPipe {
    
    transform(value:any[], queryString:any): any{
        
        if (queryString !== undefined && value !== undefined) {
            return value.filter(item => item.fname.toLowerCase().indexOf(queryString.toString().toLowerCase()) !== -1);
        } else {
            return value;
        }
    }
}
