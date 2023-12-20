import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { StoreModule } from 'src/store/store.module';
import { STORE_TYPE } from 'src/store/store.service';

@Module({
  imports: [StoreModule.register({ STORE_NAME: 'profile', STORE_TYPE: STORE_TYPE.FILE })],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
