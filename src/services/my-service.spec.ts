/// <reference path="../../typings/main/ambient/jasmine/jasmine.d.ts" />

import {it, describe, expect, beforeEachProviders, inject} from "angular2/testing";
import {Response, XHRBackend, ResponseOptions, HTTP_PROVIDERS} from "angular2/http";
import {MyService} from "./my-service";
import {MockConnection, MockBackend} from "angular2/src/http/backends/mock_backend";
import {provide} from "angular2/core";

describe('MyService Tests', () => {
    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            MyService
        ]
    });

    it('Should create a component MyList',
        inject([XHRBackend, MyService], (backend, service) => {
            backend.connections.subscribe(
                (connection:MockConnection) => {
                    var options = new ResponseOptions({
                        body: [
                            {
                                "fname": "Tim",
                                "lName": "Cook",
                                "age": "14",
                                "gender": "Male",
                                "address": "4, Franks ISLA, IL 60015",
                                "studImage": "images/male.png"
                            }
                        ]
                    });

                    var response = new Response(options);

                    connection.mockRespond(response);
                }
            );

            service.getUsers().subscribe(
                (users) => {
                    expect(users[0].fname).toBe('Tim');
                }
            );

            /*service.getUsers(5).subscribe(
                (users) => {
                    expect(users[0].login).toBe('mojombo');
                }
            );*/
        })
    );
});
