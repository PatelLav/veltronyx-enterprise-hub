import Layout from "@/components/Layout";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import { Target, Eye, Award, TrendingUp, Users, Globe } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const leaders = [
  { name: "Lav Patel", role: "CEO & Co-Founder", initials: "LP" },
  { name: "Marcus Weber", role: "CTO", initials: "MW" },
  { name: "Priya Sharma", role: "Chief Product Officer", initials: "PS" },
  { name: "James Okonkwo", role: "Chief Revenue Officer", initials: "JO" },
];

const values = [
  { icon: Target, title: "Innovation First", description: "We push boundaries to solve enterprise challenges with intelligent technology." },
  { icon: Award, title: "Enterprise Excellence", description: "We hold ourselves to the highest standards of quality, security, and reliability." },
  { icon: Globe, title: "Sustainable Impact", description: "We believe technology should drive positive environmental and social outcomes." },
  { icon: Users, title: "Customer Obsession", description: "Our customers' success is our success. We partner, not just provide." },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6 text-center">
          <SectionHeading
            badge="About veltronyx"
            title="Building the Future of Enterprise Software"
            description="We're on a mission to make enterprise operations intelligent, sustainable, and unified."
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-muted/50 section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div {...fadeInUp} className="p-8 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower enterprises with an intelligent, integrated platform that unifies operations, empowers people, and drives sustainable growth — making complexity simple and impact measurable.
              </p>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }} className="p-8 rounded-2xl bg-card border border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                A world where every enterprise operates intelligently and sustainably — where technology amplifies human potential and drives responsible business outcomes at global scale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <SectionHeading badge="Values" title="Why veltronyx" description="The principles that guide everything we build." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...fadeInUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-card border border-border text-center"
              >
                <v.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">{v.title}</h4>
                <p className="text-sm text-muted-foreground">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-muted/50 section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <SectionHeading badge="Leadership" title="Led by Industry Veterans" description="Our leadership team brings decades of enterprise software experience." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                {...fadeInUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">{leader.initials}</span>
                </div>
                <h4 className="font-semibold text-foreground">{leader.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{leader.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2,400+", label: "Enterprise Clients" },
              { value: "$2.1B", label: "Revenue Managed" },
              { value: "45+", label: "Countries" },
              { value: "850+", label: "Team Members" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-sm text-primary-foreground/70 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
