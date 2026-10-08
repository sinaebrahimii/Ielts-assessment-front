import { authKy } from "@/lib/api-client";

export type CriterionType =
  | "task_response"
  | "coherence_cohesion"
  | "lexical_resource"
  | "grammatical_range_accuracy";

export interface EssaySubmissionPayload {
  essay_prompt: string;
  essay: string;
}

// Criteria Assessments detail interfaces (extend as your backend schemas provide)
export interface TaskResponseAssessment {
  score: number;
  [key: string]: unknown;
}

export interface CoherenceCohesionAssessment {
  score: number;
  [key: string]: unknown;
}

export interface RepeatedWordDiagnostic {
  word: string;
  count: number;
  suggested_alternatives: string[];
}

export interface LexicalResourceAssessment {
  score: number;
  justification?: string;
  repeated_words?: RepeatedWordDiagnostic[];
  inaccurate_collocations?: string[];
  spelling_and_formation_errors?: string[];
  effective_advanced_vocabulary?: string[];
  actionable_advice?: string[];
}

export interface GrammaticalRangeAssessment {
  score: number;
  [key: string]: unknown;
}

export interface TaskResponseCriterionOut {
  criterion: "task_response";
  details: TaskResponseAssessment;
}

export interface CoherenceCohesionCriterionOut {
  criterion: "coherence_cohesion";
  details: CoherenceCohesionAssessment;
}

export interface LexicalResourceCriterionOut {
  criterion: "lexical_resource";
  details: LexicalResourceAssessment;
}

export interface GrammaticalRangeCriterionOut {
  criterion: "grammatical_range_accuracy";
  details: GrammaticalRangeAssessment;
}

export type CriterionAssessmentOut =
  | TaskResponseCriterionOut
  | CoherenceCohesionCriterionOut
  | LexicalResourceCriterionOut
  | GrammaticalRangeCriterionOut;

export interface DetailedCriteriaOut {
  task_response: TaskResponseAssessment;
  coherence_cohesion: CoherenceCohesionAssessment;
  lexical_resource: LexicalResourceAssessment;
  grammatical_range_accuracy: GrammaticalRangeAssessment;
}

export interface EssayFeedbackResponse {
  submission_id: string;
  overall_band: number | null;
  created_at: string;
  criteria: CriterionAssessmentOut[];
  details: DetailedCriteriaOut;
}

export async function submitEssayForFeedback(
  payload: EssaySubmissionPayload,
): Promise<EssayFeedbackResponse> {
  return await authKy
    .post("feedback", {
      json: payload,
      timeout: 120000,
    })
    .json<EssayFeedbackResponse>();
}
