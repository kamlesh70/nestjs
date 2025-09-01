import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class TestPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        // we can work here and transform value 
        // metadata will provide info about the type 
        return value;
    }
}