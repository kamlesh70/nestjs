import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { StoreModule } from './store/store.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, ProfileModule, StoreModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
