import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, DollarSign, Package, Truck, Settings, TrendingUp, ArrowRight, Layers, Database, LineChart } from "lucide-react";
import erpModule from "@/assets/erp-module.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const capabilities = [
  {
    icon: DollarSign,
    title: "Financial Management",
    description: "Complete general ledger, accounts payable/receivable, budgeting, and multi-currency financial operations with real-time consolidation.",
    features: ["General Ledger & Sub-ledgers", "AP/AR Automation", "Multi-currency Support", "Budget Planning & Forecasting"],
  },
  {
    icon: Package,
    title: "Supply Chain",
    description: "End-to-end supply chain visibility from procurement to delivery with intelligent demand forecasting and inventory optimization.",
    features: ["Demand Forecasting", "Inventory Optimization", "Warehouse Management", "Order Fulfillment"],
  },
  {
    icon: Truck,
    title: "Procurement",
    description: "Streamline vendor management, purchase orders, and contract lifecycle with automated compliance checks and spend analytics.",
    features: ["Vendor Management", "Purchase Order Automation", "Contract Lifecycle", "Spend Analytics"],
  },
];

const ERP = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6 text-center">
          <SectionHeading
            badge="ERP Module"
            title="Intelligent Enterprise Resource Planning"
            description="veltronyx ERP unifies financial operations, supply chain, and procurement into a single intelligent platform built for global enterprises."
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 rounded-xl overflow-hidden shadow-2xl shadow-primary/10 border border-border"
          >
            <img src={erpModule} alt="veltronyx ERP Dashboard" className="w-full" />
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-muted/50 section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <SectionHeading
            badge="Capabilities"
            title="Core ERP Capabilities"
            description="Purpose-built modules that cover every dimension of enterprise resource management."
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

      {/* Key Differentiators */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                badge="Why veltronyx ERP"
                title="Built for Modern Enterprises"
                description="Unlike legacy ERP systems, veltronyx is cloud-native, AI-powered, and designed for rapid deployment."
                centered={false}
              />
              <div className="space-y-4">
                {[
                  { icon: Layers, text: "Modular architecture — deploy what you need" },
                  { icon: LineChart, text: "Real-time analytics and decision intelligence" },
                  { icon: Database, text: "Seamless integration with 200+ enterprise tools" },
                  { icon: Settings, text: "Configurable workflows without custom code" },
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
                { label: "Deployment Time", value: "< 8 weeks" },
                { label: "Cost Reduction", value: "40%" },
                { label: "Integrations", value: "200+" },
                { label: "Data Accuracy", value: "99.9%" },
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

export default ERP;
