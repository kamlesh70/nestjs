import { Inject, Injectable } from '@nestjs/common';
import { StoreModule, StoreOptions } from 'src/store/store.module';

@Injectable()
export class ProfileService {

    constructor(
        @Inject('STORE') private store: StoreOptions
    ){
        console.log(this.store, "from profile")
    }
}
