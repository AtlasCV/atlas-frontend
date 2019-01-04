const ROOT_URL = "http://showcase-dev.us-east-1.elasticbeanstalk.com";

// create constants for each service URL here and replace DEV_URL
const DEV_URL = "http://localhost:10013";
const URL = {
  development: {
    personalityEvaluations: `${DEV_URL}/personality-evaluations`,
    applicants: `${DEV_URL}/applicants`,
    industries: `${DEV_URL}/industries`,
    skills: `${DEV_URL}/skills`,
    certifications: `${DEV_URL}/certifications`,
    industrySectors: `${DEV_URL}/industrySectors`,
    me: `${DEV_URL}/me`,
    login: `${DEV_URL}/login`
  },
  staging: {
    personalityEvaluations: `${DEV_URL}/personality-evaluations`,
    applicants: `${DEV_URL}/applicants`,
    industries: `${DEV_URL}/industries`,
    skills: `${DEV_URL}/skills`,
    certifications: `${DEV_URL}/certifications`,
    industrySectors: `${DEV_URL}/industrySectors`,
    me: `${DEV_URL}/me`,
    login: `${DEV_URL}/login`
  },
  production: {
    personalityEvaluations: `${ROOT_URL}/personality-evaluations`,
    applicants: `${ROOT_URL}/applicants`,
    industries: `${ROOT_URL}/industries`,
    skills: `${ROOT_URL}/skills`,
    certifications: `${ROOT_URL}/certifications`,
    industrySectors: `${ROOT_URL}/industrySectors`,
    me: `${ROOT_URL}/me`,
    login: `${ROOT_URL}/login`
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
