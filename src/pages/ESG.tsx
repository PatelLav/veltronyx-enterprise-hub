import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf, BarChart3, FileCheck, Globe, TrendingUp, Shield, ArrowRight } from "lucide-react";
import DashboardCarousel from "@/components/DashboardCarousel";
import esgSlide1 from "@/assets/esg-slide-1.jpg";
import esgSlide2 from "@/assets/esg-slide-2.jpg";
import esgSlide3 from "@/assets/esg-slide-3.jpg";

const esgSlides = [
  { src: esgSlide1, alt: "Governance & Social Impact Dashboard" },
  { src: esgSlide2, alt: "Sustainability Reporting" },
  { src: esgSlide3, alt: "Carbon Emissions Tracking" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const pillars = [
  {
    icon: Leaf,
    title: "Environmental",
    description: "Track carbon emissions, energy consumption, water usage, and waste management across your entire organization.",
    metrics: ["Carbon Footprint", "Energy Intensity", "Waste Diversion", "Water Usage"],
  },
  {
    icon: Globe,
    title: "Social",
    description: "Monitor diversity metrics, employee well-being, community impact, and supply chain labor practices.",
    metrics: ["DEI Metrics", "Employee Safety", "Community Impact", "Supply Chain Ethics"],
  },
  {
    icon: Shield,
    title: "Governance",
    description: "Ensure board diversity, ethical business conduct, risk management, and transparent reporting.",
    metrics: ["Board Composition", "Ethics & Compliance", "Risk Management", "Data Privacy"],
  },
];

const ESG = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6 text-center">
          <SectionHeading
            badge="ESG Compliance"
            title="Sustainability That Scales"
            description="veltronyx ESG gives enterprises the tools to measure, manage, and report sustainability metrics with regulatory confidence."
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12"
          >
            <DashboardCarousel slides={esgSlides} />
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-muted/50 section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <SectionHeading
            badge="Framework"
            title="The Three Pillars of ESG"
            description="Comprehensive tracking across all dimensions of sustainable business."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <pillar.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{pillar.description}</p>
                <ul className="space-y-2">
                  {pillar.metrics.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                badge="Reporting"
                title="Compliance-Ready Reporting"
                description="Generate reports aligned with GRI, SASB, TCFD, CDP, and EU Taxonomy frameworks automatically."
                centered={false}
              />
              <div className="space-y-4">
                {[
                  { icon: FileCheck, text: "Auto-generated sustainability reports" },
                  { icon: BarChart3, text: "Real-time ESG scoring dashboard" },
                  { icon: TrendingUp, text: "Trend analysis and benchmarking" },
                  { icon: Globe, text: "Multi-framework support (GRI, SASB, TCFD)" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="inline-block mt-8">
                <Button variant="hero" size="lg">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <motion.div {...fadeInUp} className="grid grid-cols-2 gap-4">
              {[
                { label: "Frameworks", value: "12+" },
                { label: "Metrics Tracked", value: "200+" },
                { label: "Compliance Rate", value: "99.7%" },
                { label: "Report Generation", value: "< 5 min" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-card border border-border text-center">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ESG;
