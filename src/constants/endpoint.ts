const ROOT_URL = "http://zeus-dev.us-east-1.elasticbeanstalk.com";

// create constants for each service URL here and replace DEV_URL
const DEV_URL = "http://localhost:10013";
const URL = {
  development: {
    personalityEvaluations: `${DEV_URL}/personality-evaluations`,
    applicants: `${DEV_URL}/applicants`,
    industries: `${DEV_URL}/industries`,
    me: `${DEV_URL}/me`
  },
  staging: {
    personalityEvaluations: `${DEV_URL}/personality-evaluations`,
    applicants: `${DEV_URL}/applicants`,
    industries: `${DEV_URL}/industries`,
    me: `${DEV_URL}/me`
  },
  production: {
    personalityEvaluations: `${ROOT_URL}/personality-evaluations`,
    applicants: `${ROOT_URL}/applicants`,
    industries: `${ROOT_URL}/industries`,
    me: `${ROOT_URL}/me`
  }
};

enum Env {
  dev = "development",
  stage = "staging",
  prod = "production"
}

function setEnv(environmentString: string): Env {
  switch (environmentString) {
    case "development":
      return Env.dev;
    case "staging":
      return Env.stage;
    case "production":
      return Env.prod;
    default:
      return Env.dev;
  }
}

const environment = setEnv(process.env.NODE_ENV || "development");

export default URL[environment];
