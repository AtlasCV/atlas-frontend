const ROOT_URL = process.env.ROOT_URL;

console.log(process.env);

console.log(ROOT_URL);

const URL = {
  personalityEvaluations: `${ROOT_URL}/personality-evaluations`,
  applicants: `${ROOT_URL}/applicants`,
  industries: `${ROOT_URL}/industries`,
  skills: `${ROOT_URL}/skills`,
  certifications: `${ROOT_URL}/certifications`,
  industrySectors: `${ROOT_URL}/industrySectors`,
  me: `${ROOT_URL}/me`,
  login: `${ROOT_URL}/login`
};

export default URL;
