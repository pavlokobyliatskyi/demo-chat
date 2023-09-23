import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('UploadPolicyFormData')
class UploadPolicyFormDataType {
  @Field()
  bucket: string;

  @Field()
  key: string;

  @Field()
  contentType: string;

  @Field()
  contentDisposition: string;

  @Field()
  xAmzDate: string;

  @Field()
  xAmzAlgorithm: string;

  @Field()
  xAmzCredential: string;

  @Field()
  policy: string;

  @Field()
  xAmzSignature: string;
}

@ObjectType('PreUploadPolicy')
export class UploadPolicyType {
  @Field()
  id: string;

  @Field()
  postUrl: string;

  @Field(() => UploadPolicyFormDataType)
  formData: UploadPolicyFormDataType;
}
