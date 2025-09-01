import { DynamicModule, Module } from '@nestjs/common';
import { STORE_TYPE, StoreService } from './store.service';
import { StoreController } from './store.controller';

export type StoreOptions = {
  STORE_TYPE: STORE_TYPE;
  STORE_NAME: string;
}

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  exports: [StoreService]
})
export class StoreModule {

  static register(options: StoreOptions) : DynamicModule {
    const store: StoreOptions = {
      STORE_NAME: options?.STORE_NAME || 'store',
      STORE_TYPE: options?.STORE_TYPE || STORE_TYPE.FILE
    }
    return {
      module: StoreModule,
      providers: [{
        provide: "STORE",
        useValue: store
      }],
      exports: ['STORE']
    }
  }

  static forRoot(name: String) : DynamicModule {
    if(name == 'test101'){
      return {
        module: StoreModule,
        providers: [
          {
            provide: 'TEST',
            useValue: 'testing test101'
          }
        ],
        exports: ['TEST']
      }
    }else{
      return {
        module: StoreModule,
        providers: [
          {
            provide: 'TEST',
            useValue: name
          }
        ],
        exports: ['TEST']
      }
      }
    }
}
