import { Link } from "react-router-dom";

const footerLinks = {
  Platform: [
    { label: "ERP Module", href: "/platform" },
    { label: "HR Module", href: "/platform" },
    { label: "ESG Module", href: "/esg" },
    { label: "Security", href: "/platform" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/" },
  ],
  Resources: [
    { label: "Documentation", href: "/" },
    { label: "API Reference", href: "/" },
    { label: "Status", href: "/" },
    { label: "Support", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
    { label: "Cookie Policy", href: "/" },
    { label: "GDPR", href: "/" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-dark text-dark-foreground">
      <div className="container-narrow mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold">Veltrix</span>
            </Link>
            <p className="text-sm text-dark-foreground/60 leading-relaxed">
              Powering intelligent &amp; sustainable enterprises worldwide.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-dark-foreground/60 hover:text-dark-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-dark-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-dark-foreground/40">
            © {new Date().getFullYear()} Veltrix. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-sm text-dark-foreground/40">SOC 2 Compliant</span>
            <span className="text-sm text-dark-foreground/40">ISO 27001</span>
            <span className="text-sm text-dark-foreground/40">GDPR Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
