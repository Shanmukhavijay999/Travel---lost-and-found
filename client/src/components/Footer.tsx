import { Link } from "wouter";
import { Search, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Search className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">LostFound</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Helping travelers recover lost items during bus, train, auto, cab, and metro journeys. Connect with drivers and reunite with your belongings.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                data-testid="footer-social-facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition-colors"
                data-testid="footer-social-twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors"
                data-testid="footer-social-instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-700 transition-colors"
                data-testid="footer-social-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Report Lost Item
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Login / Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Transport Modes</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Bus
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Train
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Auto
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Cab / Taxi
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Metro
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  123 Transport Hub, Tech Park,<br />Bangalore, India 560001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="text-slate-400 text-sm">support@lostfound.travel</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              2024 Travel Lost & Found Portal. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              AI Match (Coming Soon)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              QR Scanning (Planned)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              GPS Integration (Planned)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              WhatsApp Notifications (Planned)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
