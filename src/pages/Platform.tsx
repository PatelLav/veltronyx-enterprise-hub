import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { BarChart3, Users, Leaf, Shield, Server, Lock, Layers, Database, FileCheck, TrendingUp, Settings, Globe } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const modules = [
  {
    icon: BarChart3,
    title: "ERP Module",
    subtitle: "Enterprise Resource Planning",
    description: "End-to-end visibility into financial operations, supply chain, procurement, and asset management.",
    features: ["Financial Management & GL", "Supply Chain Optimization", "Procurement & Vendor Management", "Asset Lifecycle Tracking", "Real-time Analytics & Reporting"],
  },
  {
    icon: Users,
    title: "HR Module",
    subtitle: "Human Capital Management",
    description: "Comprehensive people management from recruitment to retirement, powered by AI insights.",
    features: ["Talent Acquisition & Onboarding", "Performance Management", "Compensation & Benefits", "Learning & Development", "Workforce Analytics"],
  },
  {
    icon: Leaf,
    title: "ESG Module",
    subtitle: "Sustainability & Compliance",
    description: "Track, measure, and report on environmental, social, and governance metrics with regulatory confidence.",
    features: ["Carbon Footprint Tracking", "ESG Score Dashboard", "Regulatory Compliance Engine", "Sustainability Reporting", "Stakeholder Disclosure"],
  },
];

const securityFeatures = [
  { icon: Shield, title: "SOC 2 Type II", description: "Independently audited security controls." },
  { icon: Lock, title: "End-to-End Encryption", description: "AES-256 encryption at rest and in transit." },
  { icon: Server, title: "99.99% Uptime SLA", description: "Multi-region redundancy and failover." },
  { icon: Database, title: "Data Residency", description: "Choose where your data is stored globally." },
  { icon: FileCheck, title: "GDPR & CCPA", description: "Built-in privacy compliance tools." },
  { icon: Globe, title: "28 Global Regions", description: "Low-latency access worldwide." },
];

const Platform = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6 text-center">
          <SectionHeading
            badge="Platform"
            title="The Veltrix Enterprise Cloud"
            description="A unified, intelligent platform that integrates ERP, HR, and ESG into a single source of truth for your enterprise."
          />
        </div>
      </section>

      {/* Modules */}
      <section className="bg-muted/50 section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6 space-y-20">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
            >
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <mod.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-primary uppercase tracking-wider">{mod.subtitle}</span>
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-4">{mod.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{mod.description}</p>
                <ul className="space-y-3">
                  {mod.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/10 border border-border flex items-center justify-center">
                  <div className="text-center p-8">
                    <mod.icon className="h-16 w-16 text-primary/20 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Interactive {mod.title} Preview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <SectionHeading
            badge="Security"
            title="Enterprise-Grade Security"
            description="Built with security-first architecture to protect your most sensitive data."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                {...fadeInUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors"
              >
                <f.icon className="h-6 w-6 text-primary mb-4" />
                <h4 className="font-semibold text-foreground mb-2">{f.title}</h4>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Platform;
