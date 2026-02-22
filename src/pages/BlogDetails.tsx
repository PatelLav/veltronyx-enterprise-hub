import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Share2, BookmarkIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const blogPosts: Record<
  number,
  {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    content: string;
  }
> = {
  1: {
    id: 1,
    title: "The Future of Enterprise ERP Systems",
    excerpt: "Discover how AI and machine learning are transforming enterprise resource planning and what it means for your organization.",
    category: "ERP",
    author: "Sarah Chen",
    date: "Feb 20, 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `<h2>Introduction</h2>
<p>Enterprise Resource Planning (ERP) systems have been the backbone of enterprise operations for decades. However, the landscape is rapidly changing with the introduction of artificial intelligence and machine learning technologies.</p>

<h2>The Current State of ERP</h2>
<p>Traditional ERP systems have served organizations well, providing centralized data management and streamlined operations. However, they often come with challenges such as complexity, high implementation costs, and difficulty in adapting to rapidly changing business needs.</p>

<h2>AI and Machine Learning Integration</h2>
<p>Modern ERP systems are being enhanced with AI and ML capabilities that enable:</p>
<ul>
<li>Predictive analytics for demand forecasting</li>
<li>Automated process optimization</li>
<li>Intelligent resource allocation</li>
<li>Real-time insights and decision support</li>
</ul>

<h2>Benefits for Organizations</h2>
<p>Organizations adopting AI-powered ERP systems are experiencing:</p>
<ul>
<li>30-40% reduction in operational costs</li>
<li>Improved decision-making speed</li>
<li>Better resource utilization</li>
<li>Enhanced scalability and flexibility</li>
</ul>

<h2>Looking Ahead</h2>
<p>The future of ERP is undoubtedly intelligent. Organizations that embrace these technologies will gain a significant competitive advantage in an increasingly complex and fast-paced business environment.</p>`,
  },
  2: {
    id: 2,
    title: "ESG Reporting Made Simple",
    excerpt: "A comprehensive guide to understanding and implementing ESG metrics for sustainable business growth.",
    category: "ESG",
    author: "Michael Rodriguez",
    date: "Feb 18, 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `<h2>What is ESG?</h2>
<p>ESG stands for Environmental, Social, and Governance. It's a framework used to measure an organization's sustainability and ethical impact.</p>

<h2>Environmental Factors</h2>
<p>Environmental metrics include carbon emissions, energy usage, waste management, and resource conservation. Organizations are increasingly focusing on reducing their environmental footprint.</p>

<h2>Social Factors</h2>
<p>Social metrics encompass employee welfare, community engagement, diversity and inclusion, and customer satisfaction. These factors reflect how well an organization treats its stakeholders.</p>

<h2>Governance Factors</h2>
<p>Governance includes board composition, executive compensation, audit practices, and risk management. Strong governance ensures accountability and transparency.</p>

<h2>Implementation Steps</h2>
<p>To implement ESG reporting in your organization:</p>
<ol>
<li>Conduct a baseline assessment</li>
<li>Set clear, measurable goals</li>
<li>Implement tracking systems</li>
<li>Report transparently and regularly</li>
<li>Continuously improve and iterate</li>
</ol>`,
  },
  3: {
    id: 3,
    title: "Revolutionizing HR with Modern Platforms",
    excerpt: "Learn how digital HR solutions are reshaping workforce management and employee engagement.",
    category: "HR",
    author: "Emily Watson",
    date: "Feb 15, 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `<h2>The HR Digital Transformation</h2>
<p>Human Resources has undergone a significant transformation from a traditional administrative function to a strategic business partner, powered by modern technology.</p>

<h2>Key Components of Modern HR Platforms</h2>
<p>Contemporary HR solutions include talent management, performance tracking, employee engagement, and analytics. These tools enable better decision-making and improved employee experiences.</p>

<h2>Benefits of Digital HR</h2>
<ul>
<li>Increased efficiency in routine tasks</li>
<li>Better employee engagement and satisfaction</li>
<li>Data-driven HR decision making</li>
<li>Improved talent retention</li>
<li>Enhanced compliance and security</li>
</ul>

<h2>Employee Experience Improvements</h2>
<p>Modern HR platforms provide employees with self-service capabilities, faster processes, and better communication channels with their managers and the HR team.</p>

<h2>The Future of Work</h2>
<p>As organizations continue to evolve, HR platforms will play an increasingly important role in supporting flexible work arrangements, continuous learning, and employee development.</p>`,
  },
  4: {
    id: 4,
    title: "Data Security in Enterprise Cloud",
    excerpt: "Understanding the importance of data security and how modern platforms protect your sensitive information.",
    category: "Security",
    author: "David Park",
    date: "Feb 12, 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `<h2>The Critical Importance of Data Security</h2>
<p>In an increasingly digital world, protecting sensitive business data is paramount. Enterprise organizations handle massive amounts of critical information that must be safeguarded against threats.</p>

<h2>Common Security Threats</h2>
<p>Enterprises face various security challenges including unauthorized access, data breaches, ransomware attacks, and insider threats. Modern security frameworks address these challenges comprehensively.</p>

<h2>Cloud Security Best Practices</h2>
<ul>
<li>Implement multi-factor authentication</li>
<li>Use encryption for data in transit and at rest</li>
<li>Regular security audits and assessments</li>
<li>Employee security training and awareness</li>
<li>Incident response planning</li>
</ul>

<h2>Compliance and Regulations</h2>
<p>Organizations must comply with various regulations such as GDPR, HIPAA, and SOC 2. Enterprise platforms help ensure compliance through built-in security controls.</p>

<h2>Looking Forward</h2>
<p>As threats evolve, so do security measures. Organizations must stay vigilant and invested in their security infrastructure to protect their most valuable asset: data.</p>`,
  },
  5: {
    id: 5,
    title: "Digital Transformation Success Stories",
    excerpt: "Real-world case studies showcasing how enterprises have successfully transformed their operations.",
    category: "Case Study",
    author: "Lisa Thompson",
    date: "Feb 10, 2025",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `<h2>Case Study 1: Manufacturing Excellence</h2>
<p>A global manufacturing company implemented an integrated ERP platform, resulting in 25% reduction in operational costs and improved supply chain visibility across all operations.</p>

<h2>Case Study 2: Retail Transformation</h2>
<p>A major retail chain deployed a modern HR management system, improving employee engagement scores by 40% and reducing turnover by 18% within the first year.</p>

<h2>Case Study 3: Financial Services Innovation</h2>
<p>A financial services organization adopted advanced analytics and AI-powered tools, enabling faster decision-making and identifying new revenue opportunities worth millions.</p>

<h2>Common Success Factors</h2>
<ul>
<li>Strong executive sponsorship and commitment</li>
<li>Clear vision and measurable objectives</li>
<li>Comprehensive change management</li>
<li>Investment in employee training</li>
<li>Phased implementation approach</li>
</ul>

<h2>Lessons Learned</h2>
<p>These success stories demonstrate that digital transformation is not just about technology—it requires organizational alignment, cultural change, and sustained commitment to achieving business objectives.</p>`,
  },
  6: {
    id: 6,
    title: "Integrating Legacy Systems with Modern Platforms",
    excerpt: "Best practices for seamlessly integrating your existing enterprise systems with modern solutions.",
    category: "Integration",
    author: "James Mitchell",
    date: "Feb 08, 2025",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
    content: `<h2>The Legacy System Challenge</h2>
<p>Many enterprises have invested heavily in legacy systems over the years. Rather than replacing everything at once, smart organizations are finding ways to integrate new modern platforms with existing systems.</p>

<h2>Integration Approaches</h2>
<p>There are several strategies for integrating legacy and modern systems:</p>
<ul>
<li>APIs and microservices architecture</li>
<li>Data middleware and ETL tools</li>
<li>Phased migration strategies</li>
<li>Hybrid cloud solutions</li>
</ul>

<h2>Benefits of Integration</h2>
<ul>
<li>Reduced disruption to business operations</li>
<li>Lower total cost of ownership</li>
<li>Flexibility to modernize at your pace</li>
<li>Preservation of existing investments</li>
<li>Improved data consistency and flow</li>
</ul>

<h2>Best Practices</h2>
<p>When integrating systems, organizations should focus on data quality, clear governance, security, and comprehensive testing before going live.</p>

<h2>Future-Proofing Your Integration</h2>
<p>Build your integration architecture with flexibility in mind. Use standards-based APIs and cloud-native technologies that scale with your business needs.</p>`,
  },
};

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const postId = id ? parseInt(id) : 1;
  const post = blogPosts[postId];

  if (!post) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-narrow mx-auto px-4 md:px-6 text-center py-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/blog")}>Back to Blog</Button>
          </div>
        </section>
      </Layout>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <Layout>
      {/* Back Button & Meta */}
      <section className="bg-surface section-padding">
        <div className="container-narrow mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              className="mb-6 p-0 h-auto text-primary hover:text-primary hover:bg-transparent"
              onClick={() => navigate("/blog")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>

            <Badge className="mb-4">{post.category}</Badge>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {post.author}
              </div>
              <div>{post.readTime}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-muted">
        <motion.img
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="space-y-6 text-muted-foreground leading-relaxed"
            />
          </motion.div>

          <Separator className="my-8" />

          {/* Article Footer Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center justify-between py-6"
          >
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "border-primary text-primary" : ""}
              >
                <BookmarkIcon className="h-4 w-4 mr-2" />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>

          {/* Author Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl bg-card border border-border mt-8"
          >
            <h3 className="text-lg font-bold text-foreground mb-2">About the Author</h3>
            <p className="text-muted-foreground">
              {post.author} is an enterprise software expert with deep experience in implementing and optimizing business solutions for Fortune 500 companies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary/5 border-t border-border">
        <div className="container-narrow mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Enterprise?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Learn how our platform can help you achieve similar results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Request a Demo</Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/blog")}>
              Read More Articles
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetails;
