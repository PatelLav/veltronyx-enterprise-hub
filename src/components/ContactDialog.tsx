import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! Our team will be in touch within 24 hours.");
    setFormData({ name: "", email: "", company: "", role: "", message: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Contact Enterprise Sales</DialogTitle>
          <DialogDescription>
            For organizations with 1,000+ employees, our enterprise team will help you find the perfect solution.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 py-4">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Full Name
              </label>
              <Input
                placeholder="Jane Smith"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Work Email
              </label>
              <Input
                type="email"
                placeholder="jane@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Company
              </label>
              <Input
                placeholder="Acme Corp"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Role
              </label>
              <Input
                placeholder="VP of Operations"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Message
              </label>
              <Textarea
                placeholder="Tell us about your enterprise needs..."
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <Button
              variant="hero"
              type="submit"
              className="w-full"
            >
              Submit Request <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">
                      enterprise@veltronyx.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      +1 (800) 555-0199
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Headquarters
                    </p>
                    <p className="text-sm text-muted-foreground">
                      550 Enterprise Way
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
