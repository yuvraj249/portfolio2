"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, FileDown, Copy, Check, Send, Sparkles, Loader2, ExternalLink } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import TiltCard from "../ui/TiltCard";
import MagneticButton from "../ui/MagneticButton";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const email = "yuvrajbisht41@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        // Mailto fallback if API fails
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
          formData.subject || "Portfolio Contact Inquiry"
        )}&body=${encodeURIComponent(
          `Hi Yuvraj,\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}`
        )}`;
        window.location.href = mailtoUrl;
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Contact submit error:", err);
      const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
        formData.subject || "Portfolio Contact Inquiry"
      )}&body=${encodeURIComponent(
        `Hi Yuvraj,\n\nMy name is ${formData.name} (${formData.email}).\n\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
    formData.subject || "Role Opportunity / Project Query"
  )}&body=${encodeURIComponent(
    `Hi Yuvraj,\n\nMy name is ${formData.name || "[Your Name]"} (${formData.email || "[Your Email]"}).\n\n${
      formData.message || "[Your Message]"
    }`
  )}`;

  return (
    <section id="contact" className="py-24 bg-forest-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="GET IN TOUCH"
          title="Let's Build Something Reliable Together"
          description="Open to Software Developer, QA Automation Engineer, and Applied AI roles. Drop a message or connect directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Links & Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <TiltCard glowColor="emerald" className="space-y-6">
              <h3 className="text-xl font-sans font-bold text-text-primary flex items-center gap-2">
                <span>Contact Details</span>
                <Sparkles className="h-4 w-4 text-emerald-bright" />
              </h3>

              <div className="space-y-4 font-mono text-sm">
                {/* Email Action */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-forest-950 border border-forest-750">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Mail className="h-4 w-4 text-emerald-bright shrink-0" />
                    <span className="text-text-primary truncate">{email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded hover:bg-forest-800 text-text-muted hover:text-emerald-bright transition-colors shrink-0"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? <Check className="h-4 w-4 text-emerald-bright" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>

                {/* Phone */}
                <a
                  href="tel:+918799110247"
                  className="flex items-center gap-3 p-3 rounded-lg bg-forest-950 border border-forest-750 hover:border-emerald-accent/40 text-text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-gold-accent shrink-0" />
                  <span>+91-8799110247</span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-forest-950 border border-forest-750 text-text-secondary">
                  <MapPin className="h-4 w-4 text-emerald-bright shrink-0" />
                  <span>Vadodara, Gujarat, India</span>
                </div>
              </div>

              {/* Social Buttons & Resume */}
              <div className="pt-4 border-t border-forest-750 flex flex-wrap items-center gap-3">
                <MagneticButton href="https://github.com/yuvraj249">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-forest-800 hover:bg-forest-750 border border-forest-700 text-text-primary font-mono text-xs transition-colors">
                    <Github className="h-4 w-4 text-emerald-bright" />
                    <span>GitHub</span>
                  </button>
                </MagneticButton>

                <MagneticButton href="https://linkedin.com/in/yuvraj-bisht">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-forest-800 hover:bg-forest-750 border border-forest-700 text-text-primary font-mono text-xs transition-colors">
                    <Linkedin className="h-4 w-4 text-gold-accent" />
                    <span>LinkedIn</span>
                  </button>
                </MagneticButton>

                <MagneticButton href="/resume.pdf" download>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-accent hover:bg-emerald-bright text-forest-950 font-mono font-bold text-xs shadow-emerald-glow transition-all">
                    <FileDown className="h-4 w-4" />
                    <span>Resume (PDF)</span>
                  </button>
                </MagneticButton>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <TiltCard glowColor="gold" className="space-y-4">
              <h3 className="text-xl font-sans font-bold text-text-primary">Send a Direct Message</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl bg-forest-950 border border-emerald-accent/50 text-center space-y-3 font-mono text-xs"
                >
                  <div className="h-12 w-12 rounded-full bg-emerald-accent/20 border border-emerald-accent flex items-center justify-center text-emerald-bright mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-text-primary">Message Dispatched!</h4>
                  <p className="text-text-secondary leading-relaxed">
                    Your message has been transmitted to <strong className="text-emerald-bright">yuvrajbisht41@gmail.com</strong>.
                  </p>

                  <div className="pt-2 flex justify-center gap-3">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-forest-800 hover:bg-forest-750 text-emerald-bright border border-forest-700 font-mono text-xs"
                    >
                      <span>Open in Mail App</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>

                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="px-4 py-2 rounded-lg bg-forest-900 hover:bg-forest-850 text-text-muted hover:text-text-primary border border-forest-750 text-xs"
                    >
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-text-muted mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-lg bg-forest-950 border border-forest-750 text-text-primary focus:border-emerald-accent outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-text-muted mb-1.5">Your Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-lg bg-forest-950 border border-forest-750 text-text-primary focus:border-emerald-accent outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-text-muted mb-1.5">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Role Opportunity / Project Query"
                      className="w-full px-4 py-2.5 rounded-lg bg-forest-950 border border-forest-750 text-text-primary focus:border-emerald-accent outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-text-muted mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Yuvraj, I'd like to discuss..."
                      className="w-full px-4 py-2.5 rounded-lg bg-forest-950 border border-forest-750 text-text-primary focus:border-emerald-accent outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <MagneticButton className="flex-1">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-emerald-accent hover:bg-emerald-bright text-forest-950 font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-emerald-glow transition-all disabled:opacity-50"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Transmitting...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>Transmit Message</span>
                          </>
                        )}
                      </button>
                    </MagneticButton>

                    <a
                      href={mailtoHref}
                      className="px-4 py-3 rounded-lg bg-forest-850 hover:bg-forest-800 text-emerald-bright border border-forest-750 font-mono text-xs flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                      title="Open directly in Gmail / Apple Mail"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Open Mail App</span>
                    </a>
                  </div>
                </form>
              )}
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
