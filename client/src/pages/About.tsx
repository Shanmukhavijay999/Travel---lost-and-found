import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Target,
  Heart,
  Users,
  Award,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Empathy First",
    description: "We understand the stress of losing personal belongings during travel. Every interaction is designed with compassion.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Security is paramount. We verify drivers and protect user information until mutual consent is given.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built on the collective goodwill of travelers and drivers helping each other recover lost items.",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description: "Real-time notifications and streamlined processes ensure quick item recovery.",
  },
];

const team = [
  { name: "Rahul Sharma", role: "Founder & CEO", image: "RS" },
  { name: "Priya Patel", role: "CTO", image: "PP" },
  { name: "Amit Kumar", role: "Head of Operations", image: "AK" },
  { name: "Sneha Reddy", role: "Product Designer", image: "SR" },
];

const milestones = [
  { year: "2022", title: "Founded", description: "Started with a vision to help travelers" },
  { year: "2023", title: "10K Users", description: "Reached our first major milestone" },
  { year: "2024", title: "Pan-India", description: "Expanded to all major cities" },
  { year: "2025", title: "50K+ Users", description: "Growing stronger every day" },
];

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">About Us</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Reuniting Travelers with
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
              Their Lost Belongings
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to eliminate the stress of losing items during travel by connecting 
            passengers with drivers through a seamless, secure platform.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-4">Our Mission</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Solving a Real Problem for Millions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                Every day, thousands of travelers lose personal items during bus, train, auto, cab, 
                and metro journeys. Phones, wallets, bags, laptops — items that hold not just monetary 
                but often sentimental value.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                We created LostFound to bridge the gap between passengers who lose items and drivers 
                who find them. Our platform provides a structured, secure way to report, find, and 
                recover lost belongings.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time notifications when items are found",
                  "Secure chat between passengers and drivers",
                  "Verified driver network across India",
                  "Contact reveal only after item confirmation",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-1">
                <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-900 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Target className="w-24 h-24 text-blue-500 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Our Vision</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      A world where no traveler has to worry about losing their belongings, 
                      knowing there's a community ready to help.
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-xs">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Values</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              What Drives Us
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <Card key={i} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Milestones
            </h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-px h-full w-0.5 bg-slate-200 dark:bg-slate-700 hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <div key={i} className={`relative flex items-center ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                    <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl">
                      <div className="text-sm font-bold text-blue-600 mb-1">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{milestone.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-slate-950 shadow hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Meet the People Behind LostFound
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-xl">
                  {member.image}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <Badge className="mb-4">Contact Us</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                Have questions or feedback? We'd love to hear from you. Reach out through any of 
                these channels.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Email</div>
                    <div className="font-medium text-slate-900 dark:text-white">support@lostfound.travel</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Phone</div>
                    <div className="font-medium text-slate-900 dark:text-white">+91 98765 43210</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">Address</div>
                    <div className="font-medium text-slate-900 dark:text-white">
                      123 Transport Hub, Tech Park, Bangalore, India 560001
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
              <Globe className="w-16 h-16 mb-6 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">Available Across India</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Our platform operates in all major cities including Delhi, Mumbai, Bangalore, 
                Chennai, Hyderabad, Kolkata, Pune, and many more.
              </p>
              <Link href="/categories">
                <Button className="bg-white text-blue-600 hover:bg-blue-50" data-testid="about-cta">
                  Report Lost Item
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
