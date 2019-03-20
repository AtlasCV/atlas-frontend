import { config, S3, Credentials } from 'aws-sdk';

const bucketName = 'atlas-profile-pictures';
const bucketRegion = 'us-east-1';
const accessKeyId = process.env.ACCESS_KEY_ID || '';
const secretAccessKey = process.env.ACCESS_KEY_ID || '';

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
