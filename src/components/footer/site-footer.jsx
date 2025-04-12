import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import React from "react"


export default function SiteFooter() {
  return (
    <footer className="bg-gray-50" >
      <div className="container px-4 py-16" style={{width:"90%" ,margin:"0 auto"}}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <img
              src="https://www.ville-marrakech.ma/images/blog/alc.jpg"
              alt="Logo"
              className="h-12 w-auto mb-6"
            />
            <p className="text-gray-600 leading-relaxed">
              L'art de la réussite consiste à savoir s'entourer des meilleurs. S'inscrire Dans La Continuité Du Succès.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">À-PROPOS</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span>Marrakech, Maroc</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="h-5 w-5 text-blue-500" />
                <span>+212 6 75 77 58 84</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>contact@centerkech.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">LIENS</h3>
            <ul className="space-y-4">
              {[
                { label: "CONTACTEZ-NOUS", to: "/contact" },
                { label: "REJOIGNEZ-NOUS", to: "/join" },
                { label: "FAQs", to: "/faq" },
                { label: "Nos actualités", to: "/news" },
                { label: "Politique de confidentialité", to: "/privacy" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-600 hover:text-blue-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">SUIVEZ-NOUS</h3>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-blue-500 hover:border-blue-500 transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="container px-4 py-6">
          <p className="text-center text-gray-600">
            © Copyright 2023 | Centre Kech. Tous droits réservés. Powered By Mohamed Sari
          </p>
        </div>
      </div>
    </footer>
  )
}

