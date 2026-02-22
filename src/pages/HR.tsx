import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, UserPlus, GraduationCap, Heart, Award, TrendingUp, ArrowRight, BarChart3, Shield } from "lucide-react";
import hrModule from "@/assets/hr-module.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const capabilities = [
  {
    icon: UserPlus,
    title: "Talent Acquisition",
    description: "AI-powered recruitment pipeline from job posting to onboarding, with automated screening, interview scheduling, and candidate scoring.",
    features: ["AI Resume Screening", "Interview Scheduling", "Candidate Scorecards", "Automated Onboarding"],
  },
  {
    icon: Award,
    title: "Performance Management",
    description: "Continuous feedback, goal tracking, and 360° reviews that drive employee growth and organizational alignment.",
    features: ["OKR & Goal Tracking", "360° Reviews", "Continuous Feedback", "Skill Gap Analysis"],
  },
  {
    icon: GraduationCap,
    title: "Learning & Development",
    description: "Personalized learning paths, compliance training, and professional development programs with progress tracking.",
    features: ["Custom Learning Paths", "Compliance Training", "Certification Tracking", "Skills Development"],
  },
];

const HR = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6 text-center">
          <SectionHeading
            badge="HR Module"
            title="Human Capital Management, Reimagined"
            description="veltronyx HR empowers enterprises to attract, develop, and retain top talent with AI-driven insights and seamless people operations."
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-border"
          >
            <img src={hrModule} alt="veltronyx HR Dashboard" className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-muted/50 section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <SectionHeading
            badge="Capabilities"
            title="Comprehensive People Operations"
            description="From hire to retire — manage every stage of the employee lifecycle in one platform."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <cap.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{cap.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{cap.description}</p>
                <ul className="space-y-2">
                  {cap.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                badge="Why veltronyx HR"
                title="People-First, Data-Driven"
                description="Combine employee experience with workforce analytics to make smarter talent decisions at scale."
                centered={false}
              />
              <div className="space-y-4">
                {[
                  { icon: Heart, text: "Employee engagement & well-being tools" },
                  { icon: BarChart3, text: "Workforce analytics & predictive insights" },
                  { icon: Shield, text: "Built-in labor law compliance (50+ countries)" },
                  { icon: TrendingUp, text: "Compensation benchmarking & equity analysis" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-foreground">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="inline-block mt-8">
                <Button variant="hero" size="lg">
                  Schedule a Demo <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <motion.div {...fadeInUp} className="grid grid-cols-2 gap-4">
              {[
                { label: "Time to Hire", value: "-35%" },
                { label: "Retention Rate", value: "94%" },
                { label: "Countries", value: "50+" },
                { label: "Employee NPS", value: "78" },
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

export default HR;
