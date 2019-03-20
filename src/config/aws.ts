import { config, S3, Credentials } from 'aws-sdk';

const bucketName = 'atlas-profile-pictures';
const bucketRegion = 'us-east-1';
const accessKeyId = 'AKIAINT4UKQU6SK2GKYA';
const secretAccessKey = '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';

config.update({
  region: bucketRegion,
  credentials: new Credentials({
    accessKeyId,
    secretAccessKey
  })
});

export default new S3({
  params: {Bucket: bucketName}
});
