import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$2,499",
    period: "/month",
    description: "For growing companies starting their digital transformation journey.",
    features: [
      "Up to 100 users",
      "Core ERP modules",
      "Basic HR management",
      "ESG reporting (starter)",
      "Email support",
      "99.9% uptime SLA",
      "Single region deployment",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$6,999",
    period: "/month",
    description: "For mid-market enterprises requiring advanced capabilities.",
    features: [
      "Up to 500 users",
      "Full ERP suite",
      "Advanced HR & talent management",
      "Full ESG compliance engine",
      "Priority support (24/7)",
      "99.95% uptime SLA",
      "Multi-region deployment",
      "API access & integrations",
      "Custom workflows",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large enterprises with complex, global requirements.",
    features: [
      "Unlimited users",
      "Full platform access",
      "Dedicated success manager",
      "Custom ESG frameworks",
      "24/7 premium support",
      "99.99% uptime SLA",
      "Global multi-region",
      "Advanced security & SSO",
      "Custom integrations",
      "On-premises option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <Layout>
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <SectionHeading
            badge="Pricing"
            title="Transparent Enterprise Pricing"
            description="Choose the plan that fits your organization's scale and requirements."
          />

          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative p-8 rounded-2xl border ${
                  tier.highlighted
                    ? "border-primary bg-card shadow-xl shadow-primary/10 scale-[1.02]"
                    : "border-border bg-card"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-8">{tier.description}</p>
                <Link to="/contact">
                  <Button
                    variant={tier.highlighted ? "hero" : "hero-outline"}
                    className="w-full mb-8"
                    size="lg"
                  >
                    {tier.cta} {tier.highlighted && <ArrowRight className="ml-1 h-4 w-4" />}
                  </Button>
                </Link>
                <ul className="space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className="h-4 w-4 text-secondary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
