import { Injectable } from '@nestjs/common';

export enum STORE_TYPE {
    FILE= 'FILE',
    MEMORY= 'MEMORY',
} 

@Injectable()
export class StoreService {}
