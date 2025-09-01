import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    collection: "address"
})
export class Address{
    @Prop({
        require: true
    })
    address1: string;

    @Prop()
    address2: string;

    @Prop({
        require: true
    })
    city: string;

    @Prop({
        require: true
    })
    state: string;

    @Prop({
        require: true
    })
    postalCode: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
AddressSchema.set("toJSON", {
    transform: function (doc, obj, opt) {
        delete obj['__v'];
        return obj;
    }
})