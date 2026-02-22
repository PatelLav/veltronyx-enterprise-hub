import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Download, RotateCcw, HelpCircle, Leaf, Users, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { generateESGPDF } from "@/lib/esg-pdf-generator";
import {
  type EnvironmentalInputs,
  type SocialInputs,
  type GovernanceInputs,
  calculateEnvironmentalScore,
  calculateSocialScore,
  calculateGovernanceScore,
  calculateOverallESG,
  getScoreColor,
  getScoreLabel,
} from "@/lib/esg-calculator";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const tooltips = {
  electricityUsage: "Total electricity consumed in kilowatt-hours. Lower usage improves your environmental score.",
  fuelConsumption: "Total fossil fuel consumed in liters. Includes diesel, petrol, and natural gas.",
  waterUsage: "Total water consumption in cubic meters across all facilities.",
  carbonEmissions: "Direct and indirect CO₂ emissions measured in metric tons.",
  totalEmployees: "Total headcount including full-time and part-time employees.",
  femaleEmployees: "Number of female employees. Closer to 50% ratio scores higher.",
  trainingHours: "Average training and development hours per employee per year.",
  workplaceIncidents: "Number of reported workplace safety incidents in the period.",
  compliancePolicies: "Number of formally implemented compliance and regulatory policies.",
  auditCompletionRate: "Percentage of planned audits completed during the reporting period.",
  riskIncidents: "Number of identified risk incidents or breaches in the period.",
  ethicsTrainingCoverage: "Percentage of employees who completed ethics and compliance training.",
};

function MetricInput({
  label,
  tooltip,
  value,
  onChange,
  unit,
}: {
  label: string;
  tooltip: string;
  value: number;
  onChange: (v: number) => void;
  unit?: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Label className="text-sm text-foreground/80">{label}</Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-[240px] text-xs">{tooltip}</TooltipContent>
        </Tooltip>
      </div>
      <div className="relative">
        <Input
          type="number"
          min={0}
          value={value || ""}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className="pr-12 bg-background"
          placeholder="0"
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

function ScoreBadge({ score, label }: { score: number; label: string }) {
  const color = getScoreColor(score);
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="relative w-20 h-20 rounded-full flex items-center justify-center border-4"
        style={{ borderColor: color }}
      >
        <span className="text-xl font-bold" style={{ color }}>{score}</span>
      </div>
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

const defaultEnv: EnvironmentalInputs = { electricityUsage: 0, fuelConsumption: 0, waterUsage: 0, carbonEmissions: 0 };
const defaultSocial: SocialInputs = { totalEmployees: 0, femaleEmployees: 0, trainingHours: 0, workplaceIncidents: 0 };
const defaultGov: GovernanceInputs = { compliancePolicies: 0, auditCompletionRate: 0, riskIncidents: 0, ethicsTrainingCoverage: 0 };

const trendData = [
  { month: "Jan", score: 52 },
  { month: "Feb", score: 55 },
  { month: "Mar", score: 58 },
  { month: "Apr", score: 54 },
  { month: "May", score: 62 },
  { month: "Jun", score: 67 },
  { month: "Jul", score: 71 },
  { month: "Aug", score: 69 },
  { month: "Sep", score: 74 },
  { month: "Oct", score: 78 },
  { month: "Nov", score: 76 },
  { month: "Dec", score: 82 },
];

const ESGCalculator = () => {
  const [env, setEnv] = useState<EnvironmentalInputs>(defaultEnv);
  const [social, setSocial] = useState<SocialInputs>(defaultSocial);
  const [gov, setGov] = useState<GovernanceInputs>(defaultGov);

  const envScore = useMemo(() => calculateEnvironmentalScore(env), [env]);
  const socialScore = useMemo(() => calculateSocialScore(social), [social]);
  const govScore = useMemo(() => calculateGovernanceScore(gov), [gov]);
  const overallScore = useMemo(() => calculateOverallESG(envScore, socialScore, govScore), [envScore, socialScore, govScore]);

  const donutData = [
    { name: "Environmental", value: envScore, color: "hsl(142, 71%, 45%)" },
    { name: "Social", value: socialScore, color: "hsl(217, 91%, 60%)" },
    { name: "Governance", value: govScore, color: "hsl(262, 83%, 58%)" },
  ];

  const chartConfig = {
    environmental: { label: "Environmental", color: "hsl(142, 71%, 45%)" },
    social: { label: "Social", color: "hsl(217, 91%, 60%)" },
    governance: { label: "Governance", color: "hsl(262, 83%, 58%)" },
  };

  const handleReset = () => {
    setEnv(defaultEnv);
    setSocial(defaultSocial);
    setGov(defaultGov);
  };

  const handleDownloadReport = async () => {
    try {
      await generateESGPDF({
        envScore,
        socialScore,
        govScore,
        overallScore,
        env,
        social,
        gov,
        scoreLabel: getScoreLabel(overallScore),
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const updateEnv = (key: keyof EnvironmentalInputs) => (v: number) => setEnv((p) => ({ ...p, [key]: v }));
  const updateSocial = (key: keyof SocialInputs) => (v: number) => setSocial((p) => ({ ...p, [key]: v }));
  const updateGov = (key: keyof GovernanceInputs) => (v: number) => setGov((p) => ({ ...p, [key]: v }));

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-24 pb-16 px-4">
        <div className="container-narrow mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                ESG Score Calculator
              </h1>
              <p className="text-muted-foreground mt-1.5 text-base">
                Measure Environmental, Social, and Governance performance in real time.
              </p>
            </div>
            <Button variant="outline" className="gap-2 shrink-0 self-start md:self-auto" onClick={handleDownloadReport}>
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>

          {/* Input cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Environmental */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-primary" />
                    </div>
                    Environmental
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-bold" style={{ color: getScoreColor(envScore) }}>{envScore}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MetricInput label="Electricity Usage" tooltip={tooltips.electricityUsage} value={env.electricityUsage} onChange={updateEnv("electricityUsage")} unit="kWh" />
                  <MetricInput label="Fuel Consumption" tooltip={tooltips.fuelConsumption} value={env.fuelConsumption} onChange={updateEnv("fuelConsumption")} unit="L" />
                  <MetricInput label="Water Usage" tooltip={tooltips.waterUsage} value={env.waterUsage} onChange={updateEnv("waterUsage")} unit="m³" />
                  <MetricInput label="Carbon Emissions" tooltip={tooltips.carbonEmissions} value={env.carbonEmissions} onChange={updateEnv("carbonEmissions")} unit="tons" />
                </CardContent>
              </Card>
            </motion.div>

            {/* Social */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-blue-500" />
                    </div>
                    Social
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-bold" style={{ color: getScoreColor(socialScore) }}>{socialScore}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MetricInput label="Total Employees" tooltip={tooltips.totalEmployees} value={social.totalEmployees} onChange={updateSocial("totalEmployees")} />
                  <MetricInput label="Female Employees" tooltip={tooltips.femaleEmployees} value={social.femaleEmployees} onChange={updateSocial("femaleEmployees")} />
                  <MetricInput label="Training Hours / Employee" tooltip={tooltips.trainingHours} value={social.trainingHours} onChange={updateSocial("trainingHours")} unit="hrs" />
                  <MetricInput label="Workplace Incidents" tooltip={tooltips.workplaceIncidents} value={social.workplaceIncidents} onChange={updateSocial("workplaceIncidents")} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Governance */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-purple-500" />
                    </div>
                    Governance
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-2xl font-bold" style={{ color: getScoreColor(govScore) }}>{govScore}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <MetricInput label="Compliance Policies" tooltip={tooltips.compliancePolicies} value={gov.compliancePolicies} onChange={updateGov("compliancePolicies")} />
                  <MetricInput label="Audit Completion Rate" tooltip={tooltips.auditCompletionRate} value={gov.auditCompletionRate} onChange={updateGov("auditCompletionRate")} unit="%" />
                  <MetricInput label="Risk Incidents" tooltip={tooltips.riskIncidents} value={gov.riskIncidents} onChange={updateGov("riskIncidents")} />
                  <MetricInput label="Ethics Training Coverage" tooltip={tooltips.ethicsTrainingCoverage} value={gov.ethicsTrainingCoverage} onChange={updateGov("ethicsTrainingCoverage")} unit="%" />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mb-8">
            <Button variant="hero" size="lg" className="gap-2">
              Calculate ESG Score
            </Button>
            <Button variant="outline" size="lg" className="gap-2" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          {/* Overall Score + Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Overall Score */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Overall ESG Score</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                  <div
                    className="relative w-32 h-32 rounded-full flex items-center justify-center border-[6px]"
                    style={{ borderColor: getScoreColor(overallScore) }}
                  >
                    <div className="text-center">
                      <span className="text-4xl font-bold" style={{ color: getScoreColor(overallScore) }}>
                        {overallScore}
                      </span>
                      <p className="text-[10px] font-medium text-muted-foreground mt-0.5">
                        {getScoreLabel(overallScore)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-6">
                    <ScoreBadge score={envScore} label="Environmental" />
                    <ScoreBadge score={socialScore} label="Social" />
                    <ScoreBadge score={govScore} label="Governance" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Donut Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="aspect-square max-h-[250px] mx-auto">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {donutData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                  <div className="flex justify-center gap-4 mt-2">
                    {donutData.map((d) => (
                      <div key={d.name} className="flex items-center gap-1.5 text-xs">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
                        <span className="text-muted-foreground">{d.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trend Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Historical Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ score: { label: "ESG Score", color: "hsl(var(--primary))" } }} className="aspect-[4/3] max-h-[250px]">
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} className="text-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "hsl(var(--primary))" }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ESGCalculator;
