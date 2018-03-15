import { PersonalityQuestion } from "../types/PersonalityQuestion";

const personalityQuestions: PersonalityQuestion[] = [
  {
    text:
      "I value hearing other peers feedback of my work, and I am happy to give up time to help them as well.",
    questionType: "collaborative",
    questionOpposite: "independent",
    userResponse: 0
  },
  {
    text: "I go stir crazy sitting at a desk for too long",
    questionType: "clientFacing",
    questionOpposite: "backOffice",
    userResponse: 0
  },
  {
    text:
      "I have desires to be a top level executive. The corporate world is an arena I would be excited to conquery.",
    questionType: "formal",
    questionOpposite: "casual",
    userResponse: 0
  },
  {
    text: "Formal attire is a rare occurnace for me. I find it to be a drag",
    questionType: "casual",
    questionOpposite: "formal",
    userResponse: 0
  },
  {
    text:
      "Social interactions with new affiliates can be an anxious experience for me.",
    questionType: "backOffice",
    questionOpposite: "clientFacing",
    userResponse: 0
  },
  {
    text:
      "If you dropped me in a new role and provided me with no instructions, I'd be confident in finding the best way to get the job done.",
    questionType: "improvisor",
    questionOpposite: "taskOriented",
    userResponse: 0
  },
  {
    text: "I feel lost if my duties aren't clearly defined.",
    questionType: "taskOriented",
    questionOpposite: "improvisor",
    userResponse: 0
  },
  {
    text:
      "I want to avoid a 9 - 5 office job. I'm a people person and want to be out of the office.",
    questionType: "clientFacing",
    questionOpposite: "backOffice",
    userResponse: 0
  },
  {
    text: 'I consider myself a sort of "jack of all trades."',
    questionType: "improvisor",
    questionOpposite: "taskOriented",
    userResponse: 0
  },
  {
    text:
      "I'm comfortable with an \"elevator\" pitch... You give me 30 seconds and I'll pique your interest",
    questionType: "clientFacing",
    questionOpposite: "backOffice",
    userResponse: 0
  },
  {
    text: "I believe in dressing dor the job you want, not the one you have.",
    questionType: "formal",
    questionOpposite: "casual",
    userResponse: 0
  },
  {
    text:
      "I find that to get anyting done, I need to first to list out all of the steps and objectives.",
    questionType: "taskOriented",
    questionOpposite: "improvisor",
    userResponse: 0
  },
  {
    text:
      "I often find myself thinking of what I'm going to say back before hearing a peer out.",
    questionType: "independent",
    questionOpposite: "collaborative",
    userResponse: 0
  },
  {
    text:
      "I consider myself cut out for the traditional business office culture -- rules and regulations don't bother me as long as my work shines through and I can advance quickly",
    questionType: "formal",
    questionOpposite: "casual",
    userResponse: 0
  },
  {
    text:
      'The idea of a "suit and tie desk job" scares me. I want to be able to dress like I would on the weekend',
    questionType: "casual",
    questionOpposite: "formal",
    userResponse: 0
  },
  {
    text:
      "Give me alist of 10 things that need tobe on your desk by 5 o'clock, and I'll feel in the zone",
    questionType: "taskOriented",
    questionOpposite: "improvisor",
    userResponse: 0
  },
  {
    text:
      "Spending all week in an office drives me nuts. I need to be out interacting with the clients or generating business.",
    questionType: "clientFacing",
    questionOpposite: "backOffice",
    userResponse: 0
  },
  {
    text:
      "Pushing a team to vicory can be more rewarding to me than winning alone",
    questionType: "collaborative",
    questionOpposite: "independent",
    userResponse: 0
  },
  {
    text:
      'In meetings, I often find myself "zoning out" to think of my course of action rather than listen to colleagues',
    questionType: "independent",
    questionOpposite: "collaborative",
    userResponse: 0
  },
  {
    text:
      "I believe that the best work is produced when multiple minds are given the freedom to collaborate.",
    questionType: "collaborative",
    questionOpposite: "independent",
    userResponse: 0
  },
  {
    text:
      "I would rather work in the office that has staff games and a keg on draft than a suit and tie desk job",
    questionType: "casual",
    questionOpposite: "formal",
    userResponse: 0
  },
  {
    text:
      "In my experience, too many hands in the pie derail a project. I prefer to take the reigns.",
    questionType: "independent",
    questionOpposite: "collaborative",
    userResponse: 0
  },
  {
    text:
      "It is important for me to find a team of peers to bring out the best in my work.",
    questionType: "collaborative",
    questionOpposite: "independent",
    userResponse: 0
  },
  {
    text:
      "I like a job where I know what needs to be done, and I can cross it off my checklist each day.",
    questionType: "taskOriented",
    questionOpposite: "improvisor",
    userResponse: 0
  },
  {
    text:
      "I'm the type of person that is confident I'll land on my feet in any situation -- the unexpected fuels me.",
    questionType: "improvisor",
    questionOpposite: "taskOriented",
    userResponse: 0
  },
  {
    text:
      "While social interactions aren't my \"forte\", I'm the kind of person that has got everything on my to-do list under control",
    questionType: "backOffice",
    questionOpposite: "clientFacing",
    userResponse: 0
  },
  {
    text:
      'I\'d consider myself a little "nerdy" and proud to admit it. The office is my place of comfort.',
    questionType: "backOffice",
    questionOpposite: "clientFacing",
    userResponse: 0
  },
  {
    text:
      "Nothing bogs me down more than a rigif daily routine. Leave me free to roam in my day to day schedule and I'll make magic.",
    questionType: "improvisor",
    questionOpposite: "taskOriented",
    userResponse: 0
  },
  {
    text:
      "Mapping out my schedule is like putting out the fire... you're only limiting all of my extra contributions.",
    questionType: "improvisor",
    questionOpposite: "taskOriented",
    userResponse: 0
  },
  {
    text:
      "I find myself to be most valuable when meeting new people and representing the company.",
    questionType: "clientFacing",
    questionOpposite: "backOffice",
    userResponse: 0
  },
  {
    text:
      "I find that a light-hearted, pressure free work place brings out my best work.",
    questionType: "casual",
    questionOpposite: "formal",
    userResponse: 0
  },
  {
    text: "I find it easier to get my work done when left to my own devices.",
    questionType: "independent",
    questionOpposite: "collaborative",
    userResponse: 0
  },
  {
    text:
      "When given a job, you could compare me to a racehorse with blinders on... I'm running my race and not worried about other people's opinions until the job is done.",
    questionType: "independent",
    questionOpposite: "collaborative",
    userResponse: 0
  },
  {
    text:
      "It is important to me that every mind in the room gets the opportunity to add their two cents.",
    questionType: "collaborative",
    questionOpposite: "independent",
    userResponse: 0
  },
  {
    text:
      "I get my best work done when given time and space to concentrate in the office.",
    questionType: "backOffice",
    questionOpposite: "clientFacing",
    userResponse: 0
  },
  {
    text:
      "I am fully geared up to work long hours and put in hard work at the office at a young age to climb the busines ladder",
    questionType: "formal",
    questionOpposite: "casual",
    userResponse: 0
  },
  {
    text:
      "I don't need to be seen or heard out in front of the company. I'm fine with being the \"mastermind\" in the background",
    questionType: "backOffice",
    questionOpposite: "clientFacing",
    userResponse: 0
  },
  {
    text:
      "I like knowing what my daily duties are so that I can check out, disconnect from work and know my tasks are complete.",
    questionType: "taskOriented",
    questionOpposite: "improvisor",
    userResponse: 0
  },
  {
    text:
      "I picture myself thriving in a traditional business office, striving to climb the ladder and claim the corner office",
    questionType: "formal",
    questionOpposite: "casual",
    userResponse: 0
  },
  {
    text:
      "I like a job that let's me dress however I want, so long as my personality and performance shine through.",
    questionType: "casual",
    questionOpposite: "formal",
    userResponse: 0
  }
];

export default personalityQuestions;
