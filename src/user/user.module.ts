import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { StoreModule } from 'src/store/store.module';
import { STORE_TYPE } from 'src/store/store.service';


@Module({
  imports: [StoreModule.register({ STORE_TYPE: STORE_TYPE.MEMORY, STORE_NAME: 'user'})],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'Factory_Provider',
      useFactory: (env : string = 'development') => {
        const env_mode = env === 'development' ? 'development' : 'production';
        return env_mode
      },
      inject : [{ token: 'ENV_MODE', optional: true}]
    },
    {
      provide: 'ENV_MODE',
      useValue: 'PROD'
    }
  ]
})
export class UserModule {}
