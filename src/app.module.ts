import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { StoreModule } from './store/store.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig
      ],
    }),
    DatabaseModule,
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest')
    // MongooseModule.forRootAsync({
    //   useFactory: () => {
    //     return { uri: "mongodb://localhost:27017/nest-practice" }
    //   }
    // }),
    UserModule, 
    ProfileModule, 
    StoreModule,
    AuthModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
