export interface PersonalityQuestion {
  text: string;
  questionType:
    | "clientFacing"
    | "backOffice"
    | "formal"
    | "casual"
    | "independent"
    | "collaborative"
    | "improvisor"
    | "taskOriented";
  questionOpposite:
    | "clientFacing"
    | "backOffice"
    | "formal"
    | "casual"
    | "independent"
    | "collaborative"
    | "improvisor"
    | "taskOriented";
  userResponse: number;
}
