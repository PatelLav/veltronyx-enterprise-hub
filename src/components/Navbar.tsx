import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoDark from "@/assets/logo-dark.svg";

const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const solutionsLinks = [
  { label: "ERP Solution", href: "/erp" },
  { label: "HR Management", href: "/hr" },
  { label: "ESG Reporting", href: "/esg" },
  { label: "ESG Calculator", href: "/esg-calculator" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [hoveredSolutions, setHoveredSolutions] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-border">
      <div className="container-narrow mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logoDark} alt="Veltronyx" className="h-8" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <div key={link.href}>
              <Link
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
              {link.label === "Platform" && (
                <div 
                  className="inline-block relative ml-1"
                  onMouseEnter={() => setHoveredSolutions(true)}
                  onMouseLeave={() => setHoveredSolutions(false)}
                >
                  <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-1 ${
                    solutionsLinks.some(sol => location.pathname === sol.href)
                      ? "text-primary bg-primary/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}>
                    Solutions
                    <ChevronDown size={16} className={`transition-transform ${hoveredSolutions ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {hoveredSolutions && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50"
                      >
                        {solutionsLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            className={`block px-4 py-3 text-sm transition-colors border-b border-border/50 last:border-b-0 ${
                              location.pathname === link.href
                                ? "text-primary bg-primary/5 font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/contact">
            <Button variant="hero" size="lg">Request Demo</Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === link.href
                        ? "text-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                  
                  {link.label === "Platform" && (
                    <div>
                      <button
                        onClick={() => setSolutionsOpen(!solutionsOpen)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                          solutionsLinks.some(sol => location.pathname === sol.href)
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                      >
                        Solutions
                        <ChevronDown size={16} className={`transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {solutionsOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            {solutionsLinks.map((link) => (
                              <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => {
                                  setMobileOpen(false);
                                  setSolutionsOpen(false);
                                }}
                                className={`block px-4 py-3 text-sm transition-colors ml-4 rounded-lg ${
                                  location.pathname === link.href
                                    ? "text-primary bg-primary/5 font-medium"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                }`}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-3">
                <Link to="/contact" onClick={() => setMobileOpen(false)}>
                  <Button variant="hero" className="w-full">Request Demo</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
