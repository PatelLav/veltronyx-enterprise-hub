import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Users, Leaf, Shield, Zap, Globe, ArrowRight, CheckCircle2 } from "lucide-react";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const features = [
  {
    icon: BarChart3,
    title: "Enterprise Resource Planning",
    description: "Streamline operations with intelligent ERP that adapts to your business complexity.",
  },
  {
    icon: Users,
    title: "Human Resources",
    description: "Attract, manage, and retain top talent with a unified HR platform.",
  },
  {
    icon: Leaf,
    title: "ESG Compliance",
    description: "Track, report, and improve your sustainability metrics with confidence.",
  },
];

const benefits = [
  "Reduce operational costs by up to 40%",
  "Unified data across all departments",
  "Real-time compliance monitoring",
  "AI-powered insights and automation",
  "Enterprise-grade security & SOC 2",
  "Scales with your organization",
];

const trustedBy = ["Siemens", "Deloitte", "Unilever", "Shell", "HSBC", "Schneider Electric"];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container-narrow mx-auto px-4 md:px-6 section-padding relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary">
                Enterprise Cloud Platform
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] mb-6"
            >
              Powering Intelligent &amp;{" "}
              <span className="text-gradient">Sustainable Enterprises</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Vltronix unifies ERP, HR, and ESG into one intelligent enterprise platform.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/contact">
                <Button variant="hero" size="lg" className="text-base px-8 h-12">
                  Request Demo <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/platform">
                <Button variant="hero-outline" size="lg" className="text-base px-8 h-12">
                  Explore Platform
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 md:mt-20 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-border"
          >
            <img src={dashboardMockup} alt="Vltronix Enterprise Dashboard" className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="bg-surface border-y border-border">
        <div className="container-narrow mx-auto px-4 md:px-6 py-12">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider">
            Trusted by leading enterprises worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {trustedBy.map((name) => (
              <span key={name} className="text-lg font-semibold text-muted-foreground/40">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <SectionHeading
            badge="Platform"
            title="One Platform, Three Pillars"
            description="A unified enterprise cloud that brings together the critical pillars of modern business operations."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted/50 section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                badge="Benefits"
                title="Built for Enterprise Scale"
                description="Vltronix is designed for organizations that demand performance, security, and intelligence."
                centered={false}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit}
                    {...fadeInUp}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                    <span className="text-sm font-medium text-foreground">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div {...fadeInUp} className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: "SOC 2 Type II", value: "Certified" },
                { icon: Zap, label: "Uptime SLA", value: "99.99%" },
                { icon: Globe, label: "Data Centers", value: "28 Global" },
                { icon: Users, label: "Enterprises", value: "2,400+" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-2xl bg-card border border-border text-center">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Enterprise?
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Join 2,400+ enterprises using Vltronix to drive intelligent, sustainable operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="secondary" size="lg" className="text-base px-8 h-12 font-semibold">
                  Request Demo
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="hero-outline" size="lg" className="text-base px-8 h-12 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
