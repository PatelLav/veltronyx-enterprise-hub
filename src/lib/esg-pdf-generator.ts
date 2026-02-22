import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ESGReportData {
  envScore: number;
  socialScore: number;
  govScore: number;
  overallScore: number;
  env: {
    electricityUsage: number;
    fuelConsumption: number;
    waterUsage: number;
    carbonEmissions: number;
  };
  social: {
    totalEmployees: number;
    femaleEmployees: number;
    trainingHours: number;
    workplaceIncidents: number;
  };
  gov: {
    compliancePolicies: number;
    auditCompletionRate: number;
    riskIncidents: number;
    ethicsTrainingCoverage: number;
  };
  scoreLabel: string;
}

export const generateESGPDF = async (data: ESGReportData) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();
  let yPosition = 15;

  // Header with gradient-like effect
  pdf.setFillColor(20, 184, 166); // Teal color (ESG theme)
  pdf.rect(0, 0, pageWidth, 30, 'F');

  // Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont(undefined, 'bold');
  pdf.text('ESG SUSTAINABILITY REPORT', 15, 12);

  // Subtitle
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'normal');
  pdf.text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 15, 22);

  yPosition = 40;

  // Overall Score Section
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(16);
  pdf.setFont(undefined, 'bold');
  pdf.text('Overall ESG Score', 15, yPosition);

  yPosition += 8;
  pdf.setFontSize(28);
  pdf.setFont(undefined, 'bold');

  // Color code the score
  const scoreColor = getScoreColorRGB(data.overallScore);
  pdf.setTextColor(scoreColor.r, scoreColor.g, scoreColor.b);
  pdf.text(`${data.overallScore}/100`, 15, yPosition);

  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(11);
  pdf.setFont(undefined, 'normal');
  pdf.text(`Rating: ${data.scoreLabel}`, 15, yPosition + 8);

  yPosition += 20;

  // Score Breakdown Box
  pdf.setDrawColor(200, 200, 200);
  pdf.setFillColor(245, 245, 245);
  pdf.rect(15, yPosition - 5, pageWidth - 30, 35, 'FD');

  pdf.setFontSize(10);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(0, 0, 0);

  const boxStartY = yPosition;
  pdf.text('Score Breakdown', 18, boxStartY);

  pdf.setFontSize(9);
  pdf.setFont(undefined, 'normal');

  // Environmental Score
  pdf.setTextColor(34, 197, 94); // Green
  pdf.text(`Environmental: ${data.envScore}/100`, 18, boxStartY + 8);

  // Social Score
  pdf.setTextColor(59, 130, 246); // Blue
  pdf.text(`Social: ${data.socialScore}/100`, 18, boxStartY + 15);

  // Governance Score
  pdf.setTextColor(168, 85, 247); // Purple
  pdf.text(`Governance: ${data.govScore}/100`, 18, boxStartY + 22);

  yPosition += 40;

  // Environmental Metrics Section
  addMetricsSection(
    pdf,
    yPosition,
    'Environmental Metrics',
    [
      { label: 'Electricity Usage', value: `${data.env.electricityUsage} kWh` },
      { label: 'Fuel Consumption', value: `${data.env.fuelConsumption} L` },
      { label: 'Water Usage', value: `${data.env.waterUsage} m³` },
      { label: 'Carbon Emissions', value: `${data.env.carbonEmissions} tons` },
    ],
    '#22c55e'
  );

  yPosition += 36;

  // Social Metrics Section
  const femaleRatio = data.social.totalEmployees > 0 
    ? ((data.social.femaleEmployees / data.social.totalEmployees) * 100).toFixed(2)
    : '0';

  addMetricsSection(
    pdf,
    yPosition,
    'Social Metrics',
    [
      { label: 'Total Employees', value: data.social.totalEmployees.toString() },
      { label: 'Female Employees', value: `${data.social.femaleEmployees} (${femaleRatio}%)` },
      { label: 'Training Hours/Employee', value: `${data.social.trainingHours} hrs` },
      { label: 'Workplace Incidents', value: data.social.workplaceIncidents.toString() },
    ],
    '#3b82f6'
  );

  yPosition += 36;

  // Check if we need a new page
  if (yPosition > pageHeight - 50) {
    pdf.addPage();
    yPosition = 15;
  }

  // Governance Metrics Section
  addMetricsSection(
    pdf,
    yPosition,
    'Governance Metrics',
    [
      { label: 'Compliance Policies', value: data.gov.compliancePolicies.toString() },
      { label: 'Audit Completion Rate', value: `${data.gov.auditCompletionRate}%` },
      { label: 'Risk Incidents', value: data.gov.riskIncidents.toString() },
      { label: 'Ethics Training Coverage', value: `${data.gov.ethicsTrainingCoverage}%` },
    ],
    '#a855f7'
  );

  yPosition += 40;

  // Recommendations Section
  if (yPosition > pageHeight - 60) {
    pdf.addPage();
    yPosition = 15;
  }

  pdf.setFontSize(12);
  pdf.setFont(undefined, 'bold');
  pdf.setTextColor(0, 0, 0);
  pdf.text('Recommendations', 15, yPosition);

  yPosition += 8;
  pdf.setFontSize(9);
  pdf.setFont(undefined, 'normal');
  pdf.setTextColor(50, 50, 50);

  const recommendations = getRecommendations(data.envScore, data.socialScore, data.govScore, data.overallScore);
  const splitText = pdf.splitTextToSize(recommendations, pageWidth - 30);
  pdf.text(splitText, 15, yPosition);

  yPosition += splitText.length * 5 + 10;

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(150, 150, 150);
  pdf.text('Veltronyx ESG Calculator | Comprehensive Sustainability Reporting Platform', 15, pageHeight - 10);

  // Save the PDF
  pdf.save(`ESG-Report-${new Date().getTime()}.pdf`);
};

function addMetricsSection(
  pdf: jsPDF,
  yStart: number,
  title: string,
  metrics: { label: string; value: string }[],
  color: string
) {
  // Header with color
  const colorRGB = hexToRGB(color);
  pdf.setFillColor(colorRGB.r, colorRGB.g, colorRGB.b);
  pdf.rect(15, yStart, 180, 6, 'F');

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont(undefined, 'bold');
  pdf.text(title, 18, yStart + 4.5);

  // Metrics
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(9);
  pdf.setFont(undefined, 'normal');

  let metricsY = yStart + 12;
  metrics.forEach((metric) => {
    pdf.text(`${metric.label}:`, 18, metricsY);
    pdf.setFont(undefined, 'bold');
    pdf.text(metric.value, 120, metricsY);
    pdf.setFont(undefined, 'normal');
    metricsY += 6;
  });
}

function getScoreColorRGB(score: number): { r: number; g: number; b: number } {
  if (score >= 80) return { r: 34, g: 197, b: 94 }; // Green
  if (score >= 60) return { r: 59, g: 130, b: 246 }; // Blue
  if (score >= 40) return { r: 251, g: 146, b: 60 }; // Orange
  return { r: 239, g: 68, b: 68 }; // Red
}

function hexToRGB(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: parseInt(result?.[1] || '0', 16),
    g: parseInt(result?.[2] || '0', 16),
    b: parseInt(result?.[3] || '0', 16),
  };
}

function getRecommendations(
  envScore: number,
  socialScore: number,
  govScore: number,
  overallScore: number
): string {
  const recommendations = [];

  if (envScore < 50) {
    recommendations.push('• Implement renewable energy initiatives to reduce your carbon footprint.');
  }
  if (envScore < 70) {
    recommendations.push('• Optimize water usage and waste management systems.');
  }

  if (socialScore < 50) {
    recommendations.push('• Enhance employee training and professional development programs.');
    recommendations.push('• Strengthen workplace safety protocols and incident prevention measures.');
  }
  if (socialScore < 70 && socialScore >= 50) {
    recommendations.push('• Continue improving diversity and inclusion initiatives.');
  }

  if (govScore < 50) {
    recommendations.push('• Develop comprehensive governance and compliance policies.');
    recommendations.push('• Establish regular audit schedules and risk assessment frameworks.');
  }
  if (govScore < 70 && govScore >= 50) {
    recommendations.push('• Expand ethics training coverage across the organization.');
  }

  if (overallScore >= 80) {
    recommendations.push('• Maintain and continue your excellent ESG practices.');
    recommendations.push('• Consider becoming a sustainability leader in your industry.');
  } else if (overallScore >= 60) {
    recommendations.push('• Continue improving across all ESG categories for better overall performance.');
  } else {
    recommendations.push('• Develop a comprehensive ESG improvement strategy with measurable targets.');
  }

  return recommendations.length > 0
    ? recommendations.join('\n\n')
    : 'Continue monitoring and maintaining your ESG metrics.';
}
