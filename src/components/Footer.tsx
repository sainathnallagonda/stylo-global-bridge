
import { Globe, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Globe className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                Stylo
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Connecting hearts across borders, making distance disappear through care and technology.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Food Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Groceries</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gifts & Cakes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ride Booking</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Travel Companions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cultural Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Currency Info</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Mail size={16} className="mr-3" />
                <span>hello@stylo.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-3" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-3" />
                <span>Global HQ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Stylo. All rights reserved. Made with ❤️ for global families.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
