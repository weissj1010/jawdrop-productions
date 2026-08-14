import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import contactImage from "@assets/29.jpg";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  businessType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  _honey: z.string().max(0, "Bot detected").optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessType: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check — if a bot filled in the hidden field, silently reject
    if (data._honey) {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      return;
    }

    setIsSubmitting(true);

    const formPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone || "Not provided",
      businessType: data.businessType || "Not specified",
      message: data.message,
    };

    // Save to backend as a backup record
    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formPayload),
      });
    } catch {
      // Backend save is best-effort — don't block the main submission
    }

    // Send via FormSubmit.co for email notification
    try {
      const response = await fetch("https://formsubmit.co/ajax/weissj1010@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...formPayload,
          "Business Type": formPayload.businessType,
          _subject: `New JAW Drop Productions inquiry from ${data.name}`,
          _captcha: "false",
          _template: "table",
          _honey: "",
        }),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success !== "false") {
        toast({
          title: "Message sent successfully!",
          description: "We'll get back to you within 24 hours.",
        });
        form.reset();
      } else {
        console.error("FormSubmit.co error:", result);
        throw new Error(result?.message || "Failed to send");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-jaw-gray mb-6">
              Ready to Get{" "}
              <span className="text-jaw-dark-silver">Started?</span>
            </h2>
            <p className="text-xl text-jaw-dark-silver mb-8 leading-relaxed">
              Tell me what you're working on. I'll figure out the best way to make it happen.
            </p>

            <div className="space-y-6">
              {/* <div className="flex items-center">
                <div className="bg-jaw-gray text-white p-3 rounded-lg mr-4">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="font-semibold text-jaw-gray">Phone</div>
                  <div className="text-jaw-dark-silver">(555) 123-4567</div>
                </div>
              </div> */}

              {/* <div className="flex items-center">
                <div className="bg-jaw-gray text-white p-3 rounded-lg mr-4">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="font-semibold text-jaw-gray">Email</div>
                  <div className="text-jaw-dark-silver">hello@jawdropproductions.com</div>
                </div>
              </div> */}

              <div className="flex items-center">
                <div className="bg-jaw-gray text-white p-3 rounded-lg mr-4">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="font-semibold text-jaw-gray">Location</div>
                  <div className="text-jaw-dark-silver">Milwaukee, WI</div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <img
                src={contactImage}
                alt="JAW Drop Productions"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 border border-jaw-silver"
          >
            <h3 className="text-2xl font-bold text-jaw-gray mb-6">
              Want To Talk About Your Project?
            </h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot field — invisible to real users, catches bots */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden", tabIndex: -1 }}>
                <label htmlFor="_honey">Leave this empty</label>
                <input
                  id="_honey"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  {...form.register("_honey")}
                />
              </div>

              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  {...form.register("name")}
                  className="mt-2"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...form.register("email")}
                  className="mt-2"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  {...form.register("phone")}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select
                  onValueChange={(value) => form.setValue("businessType", value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="restaurant">Restaurant/Food Service</SelectItem>
                    <SelectItem value="retail">Retail/E-commerce</SelectItem>
                    <SelectItem value="professional">Professional Services</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="realestate">Real Estate</SelectItem>
                    <SelectItem value="fitness">Fitness/Wellness</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Project Details *</Label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your video marketing goals and what you'd like to achieve..."
                  {...form.register("message")}
                  className="mt-2 resize-none"
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-jaw-gray hover:bg-jaw-silver hover:text-jaw-gray text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting
                  ? "Sending..."
                  : "Let's Talk"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
