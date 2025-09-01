import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';

@Injectable()
export class MongooseService  implements MongooseOptionsFactory {
    constructor(private configService: ConfigService){}
    createMongooseOptions(): MongooseModuleOptions | Promise<MongooseModuleOptions> {
        console.log("======== this.configService.get('database.DATABASE_URL')", this.configService.get('database.DATABASE_URL'))
        return {
            uri: this.configService.get('database.DATABASE_URL'),
        }
    }
}
