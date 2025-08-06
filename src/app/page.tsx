"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // ShadCN Card
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // ShadCN Accordion

const sections = ["features", "pricing", "faq"];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Set initial dark mode state based on system preference or local storage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDarkMode(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    const handleScroll = () => {
      const offsets = sections.map((id) => {
        const el = document.getElementById(id);
        // Adjust offset to account for sticky header height (e.g., 80px)
        return el ? { id, top: el.getBoundingClientRect().top - 80 } : null;
      }).filter(Boolean) as { id: string; top: number }[];

      // Find the first section that is at or above the top of the viewport
      const active = offsets.find((section) => section.top <= 0) || offsets[0]; // Changed to <= 0 for better active state
      if (active && active.id !== activeSection) {
        setActiveSection(active.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]); // Added activeSection to dependency array to re-run effect when it changes

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900 dark:from-gray-900 dark:to-black dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="p-6 flex flex-wrap items-center justify-between border-b border-gray-200 dark:border-gray-800 sticky top-0 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 z-50 shadow-sm transition-all duration-300 h-[80px]">
        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white">Mofako Invoice</h1>
        <nav className="flex flex-wrap items-center gap-4 text-sm md:text-base mt-4 md:mt-0">
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition font-medium relative ${
                activeSection === id ? "text-blue-600 dark:text-blue-400 font-bold after:scale-x-100" : ""
              } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400 after:w-full after:scale-x-0 after:transition-transform after:duration-300`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
            <a href="/dashboard">Open App</a>
          </Button>
          <Button asChild variant="link" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
            <a href="/auth">Login / Sign Up</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-4.275l-.707-.707M4.372 19.325l-.707-.707m10.606 0l.707-.707M4.372 4.372l-.707-.707" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </Button>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative text-center py-24 px-6 md:px-0 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" fill="none">
            <circle cx="600" cy="600" r="500" fill="url(#hero-gradient)" />
            <defs>
              <radialGradient id="hero-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(600) rotate(90) scale(600)">
                <stop stopColor="#6366F1" /> {/* Tailwind blue-500 */}
                <stop offset="1" stopColor="#A855F7" stopOpacity="0" /> {/* Tailwind purple-500 */}
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Create Invoices in Seconds</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
            Generate professional, localized invoices and documents effortlessly — no login required.
          </p>
          <div className="mt-8 space-x-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <a href="/dashboard">Get Started Free</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-1">
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">What You Can Do</h3>
            <ul className="space-y-4 text-lg list-disc list-inside text-gray-700 dark:text-gray-300">
              <li>Create up to 3 free invoices/month</li>
              <li>Download PDF with watermark</li>
              <li>Send invoices via WhatsApp or Email</li>
              <li>Customize taxes, logo, and branding</li>
              <li>Upgrade for recurring invoices and more</li>
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow-2xl transform rotate-3 scale-105 hover:rotate-0 hover:scale-100 transition-transform duration-500">
            {/* Placeholder for invoice preview image */}
            <img src="https://placehold.co/600x400/E0E7FF/3B82F6?text=Invoice+Preview" alt="Invoice Preview" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-blue-500 opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12">Simple Pricing</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: "Free", price: "$0", desc: "3 invoices/month", details: ["3 monthly invoices", "Watermarked PDF", "Basic support"] },
              { title: "Starter", price: "$5/mo", desc: "Unlimited invoices, no watermark", details: ["Unlimited invoices", "No watermarks", "Branding customization"], highlight: true },
              { title: "Pro", price: "$10/mo", desc: "All features + AI, reminders, e-signature", details: ["Everything in Starter", "AI-powered suggestions", "Payment reminders", "E-signature"], },
            ].map((plan) => (
              <Card key={plan.title} className={`p-8 border-2 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${plan.highlight ? "border-blue-500 dark:border-blue-400 scale-105" : "border-gray-200 dark:border-gray-700"}`}>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-2xl font-bold text-blue-600 dark:text-blue-400">{plan.title}</CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-300">{plan.desc}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 mb-4">
                  <p className="text-4xl font-extrabold mt-4 mb-4">{plan.price}</p>
                  <ul className="space-y-2 text-left text-gray-700 dark:text-gray-300">
                    {plan.details.map((detail, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-0 mt-6">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full">Choose Plan</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              {
                q: "Can I use this without signing up?",
                a: "Yes, you can create and download invoices as a guest. Your data will be saved locally in your browser for a limited time."
              },
              {
                q: "How do I upgrade?",
                a: "You can upgrade anytime from the dashboard to unlock more features like recurring invoices and AI assistance."
              },
              {
                q: "Is my data secure?",
                a: "Yes, we use Supabase and encrypted storage to protect your data. Your privacy is our top priority."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 px-6">
                <AccordionTrigger className="font-bold text-xl text-gray-800 dark:text-white py-4 hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <p className="text-sm">© {new Date().getFullYear()} Mofako Labs. All rights reserved.</p>
      </footer>
    </main>
  );
}