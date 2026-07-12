import { Link } from "react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import logo from "../../imports/Logo.jpeg";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#03045e" }} className="text-blue-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="PUEA Alumni Logo" className="w-12 h-12 object-contain" />
              <span className="text-xl font-bold text-white">PUEA Alumni</span>
            </div>
            <p className="text-blue-300 mb-4">
              Presbyterian University Alumni Association — Connecting graduates, fostering careers, and building a stronger alumni community.
            </p>
            <div className="text-sm">
              <a href="https://puealumni.org" className="text-[#ade8f4] hover:text-white transition-colors">
                puealumni.org
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/alumni" className="hover:text-white transition-colors">Alumni Directory</Link></li>
              <li><Link to="/jobs" className="hover:text-white transition-colors">Job Portal</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Events & News</Link></li>
              <li>
                <a href="https://www.presbyuniversity.ac.ke" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Presbyterian University of East Africa
                </a>
              </li>
              <li>
                <a href="/constitution.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Alumni Constitution
                </a>
              </li>
              <li><Link to="/donate" className="hover:text-white transition-colors">Donate</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Admin</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ade8f4]" />
                <a href="mailto:puaa@puea.ac.ke" className="text-sm hover:text-white transition-colors">puaa@puea.ac.ke</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ade8f4]" />
                <a href="tel:0748177184" className="text-sm hover:text-white transition-colors">0748 177 184</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#ade8f4]" />
                <a href="tel:0701010191" className="text-sm hover:text-white transition-colors">0701 010 191</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#ade8f4]" />
                <a href="https://wa.me/254748177184" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                  WhatsApp: 0748 177 184
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 text-[#ade8f4]" />
                <span className="text-sm">PUEA Main Campus<br />Kikuyu, Kiambu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-400">
          <p>&copy; {new Date().getFullYear()} PUEA — Presbyterian University Alumni Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
