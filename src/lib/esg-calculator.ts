export interface EnvironmentalInputs {
  electricityUsage: number;
  fuelConsumption: number;
  waterUsage: number;
  carbonEmissions: number;
}

export interface SocialInputs {
  totalEmployees: number;
  femaleEmployees: number;
  trainingHours: number;
  workplaceIncidents: number;
}

export interface GovernanceInputs {
  compliancePolicies: number;
  auditCompletionRate: number;
  riskIncidents: number;
  ethicsTrainingCoverage: number;
}

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

export function calculateEnvironmentalScore(inputs: EnvironmentalInputs): number {
  const { electricityUsage, fuelConsumption, waterUsage, carbonEmissions } = inputs;
  
  // Lower values = better score. Benchmarks for a mid-size enterprise.
  const electricityScore = clamp(100 - (electricityUsage / 500) * 100);
  const fuelScore = clamp(100 - (fuelConsumption / 300) * 100);
  const waterScore = clamp(100 - (waterUsage / 200) * 100);
  const carbonScore = clamp(100 - (carbonEmissions / 100) * 100);

  // Weighted: carbon 40%, electricity 25%, fuel 20%, water 15%
  return Math.round(carbonScore * 0.4 + electricityScore * 0.25 + fuelScore * 0.2 + waterScore * 0.15);
}

export function calculateSocialScore(inputs: SocialInputs): number {
  const { totalEmployees, femaleEmployees, trainingHours, workplaceIncidents } = inputs;

  const diversityRatio = totalEmployees > 0 ? femaleEmployees / totalEmployees : 0;
  // 50% = perfect diversity score
  const diversityScore = clamp(100 - Math.abs(0.5 - diversityRatio) * 200);
  const trainingScore = clamp((trainingHours / 40) * 100);
  const incidentScore = clamp(100 - (workplaceIncidents / 10) * 100);

  // Weighted: diversity 35%, training 35%, incidents 30%
  return Math.round(diversityScore * 0.35 + trainingScore * 0.35 + incidentScore * 0.3);
}

export function calculateGovernanceScore(inputs: GovernanceInputs): number {
  const { compliancePolicies, auditCompletionRate, riskIncidents, ethicsTrainingCoverage } = inputs;

  const complianceScore = clamp((compliancePolicies / 20) * 100);
  const auditScore = clamp(auditCompletionRate);
  const riskScore = clamp(100 - (riskIncidents / 10) * 100);
  const ethicsScore = clamp(ethicsTrainingCoverage);

  // Weighted: compliance 30%, audit 25%, risk 25%, ethics 20%
  return Math.round(complianceScore * 0.3 + auditScore * 0.25 + riskScore * 0.25 + ethicsScore * 0.2);
}

export function calculateOverallESG(env: number, social: number, gov: number): number {
  return Math.round((env + social + gov) / 3);
}

export function getScoreColor(score: number): string {
  if (score <= 40) return "hsl(0, 84%, 60%)";
  if (score <= 70) return "hsl(45, 93%, 47%)";
  return "hsl(142, 71%, 45%)";
}

export function getScoreLabel(score: number): string {
  if (score <= 40) return "Needs Improvement";
  if (score <= 70) return "Moderate";
  return "Excellent";
}
