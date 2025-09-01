import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { StoreModule } from 'src/store/store.module';
import { STORE_TYPE } from 'src/store/store.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserModel } from 'src/database/schema/user/User.schema';
import {UniqueUserRule} from 'src/decorators/Rules/unique_user.rule';


@Module({
  imports: [
    // StoreModule.register({ STORE_TYPE: STORE_TYPE.MEMORY, STORE_NAME: 'user'}),
    MongooseModule.forFeature([
      { name: User.name, schema: UserModel }
    ]),
    StoreModule.forRoot('test101')
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UniqueUserRule,
    // {
    //   provide: 'Factory_Provider',
    //   useFactory: (env : string = 'development') => {
    //     const env_mode = env === 'development' ? 'development' : 'production';
    //     return env_mode
    //   },
    //   inject : [{ token: 'ENV_MODE', optional: true}]
    // },
    // {
    //   provide: 'ENV_MODE',
    //   useValue: 'PROD'
    // }
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {}
