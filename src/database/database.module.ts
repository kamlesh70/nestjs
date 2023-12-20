import { Module } from '@nestjs/common';
import { MongooseService } from './mongoose-service/mongoose-service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [MongooseModule.forRootAsync({
        useClass: MongooseService
    })],
  providers: [MongooseService]
})
export class DatabaseModule {}
