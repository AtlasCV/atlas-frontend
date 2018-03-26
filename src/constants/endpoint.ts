const ROOT_URL = "http://zeus-dev.us-east-1.elasticbeanstalk.com";

// create constants for each service URL here and replace DEV_URL
const DEV_URL = "https://localhost:10013";
const URL = {
  development: {
    personalityEvaluations: `${DEV_URL}/applicants/personality-evaluations`
  },
  staging: {},
  production: {
    personalityEvaluations: `${ROOT_URL}/applicants/personality-evaluations`
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
