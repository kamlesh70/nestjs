import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { StoreModule, StoreOptions } from 'src/store/store.module';

@Injectable()
export class ProfileService {

    constructor(
        @Inject('STORE') private store: StoreOptions,
        private readonly httpService: HttpService,
    ){
        console.log(this.store, "from profile")
    }

    async test(){
        const request = this.httpService.get('https://jsonplaceholder.typicode.com/todos/1')
            .pipe(
             map((res) => {
                return res.data;
                }),
            );
        const response = await lastValueFrom(request);
        return response;
    }
}
