"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Phone,
  ChevronDown,
  X,
  Home,
  GraduationCap,
  MessageSquare,
  UserPlus,
  BookOpen,
  Languages,
  Award,
  Compass,
  BookCheck,
  Brain,
} from "lucide-react";
import logo from "../../../public/imgs/logo.jpg";

const Button = ({ children, className, to, onClick, ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all duration-300";

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${className}`} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`${baseStyles} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const formations = [
  {
    title: "Cours de soutien scolaire",
    to: "/formations/soutien",
    description: "Des cours d'aide et de soutien scolaire",
    icon: BookOpen,
  },
  {
    title: "Langues et communication",
    to: "/formations/langues",
    description: "Apprenez de nouvelles langues",
    icon: Languages,
  },
  {
    title: "Préparation Aux concours",
    to: "/formations/concours",
    description: "Préparez-vous aux examens",
    icon: Award,
  },
  {
    title: "Coaching scolaire et orientation",
    to: "/formations/coaching",
    description: "Orientation et accompagnement",
    icon: Compass,
  },
  {
    title: "Formation continue",
    to: "/formations/continue",
    description: "Formation professionnelle continue",
    icon: BookCheck,
  },
  {
    title: "Développement personnel",
    to: "/formations/development",
    description: "Développez vos compétences personnelles",
    icon: Brain,
  },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="group flex items-center space-x-2 text-sm font-medium transition-all duration-300 hover:text-blue-500"
    >
      {children}
    </Link>
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white"
      }`}
    >
      {/* Top bar with contact info */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-50 via-white to-blue-50 py-2 shadow-sm">
        <div className="container mx-auto px-4 flex justify-end">
          <a
            href="tel:+212675775884"
            className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-all duration-200 text-sm font-medium"
          >
            <div className="p-1.5 bg-blue-100 rounded-full">
              <Phone className="h-4 w-4 text-blue-600" />
            </div>
            <span className="tracking-wide">+212 6 75 77 58 84</span>
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3 z-50">
          <img
            src={logo || "/placeholder.svg"}
            alt="Centre Red City Logo"
            className="h-12 w-auto object-contain"
          />
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Center <span className="text-blue-600">Kech</span>
          </h2>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          <NavLink to="/">
            <Home className="w-4 h-4" />
            <span>ACCUEIL</span>
          </NavLink>

          <div className="relative group">
            <button
              className="flex items-center space-x-2 text-sm font-medium group py-2"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <GraduationCap className="w-4 h-4 text-blue-500" />
              <span className="text-blue-500">NOS FORMATIONS</span>
              <ChevronDown
                className={`h-4 w-4 text-blue-500 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Horizontal dropdown menu */}
            <div
              className={`absolute top-full left-0 w-[700px] bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-300 ${
                dropdownOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              }`}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="grid grid-cols-3 gap-2 p-4">
                {formations.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.title}
                      to={item.to}
                      className="group grid grid-cols-[auto,1fr] gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-blue-500">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900 group-hover:text-blue-500 transition-colors">
                          {item.title}
                        </div>
                        <span className="text-xs text-gray-500">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <NavLink to="/contact">
            <MessageSquare className="w-4 h-4" />
            <span>CONTACTEZ-NOUS</span>
          </NavLink>

          <NavLink to="/join">
            <UserPlus className="w-4 h-4" />
            <span>REJOIGNEZ-NOUS</span>
          </NavLink>
        </nav>

        <div className="hidden lg:block">
          <Button
            to="/join"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2.5 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            REJOIGNEZ-NOUS
          </Button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden z-50 p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 bg-white z-40 transition-all duration-500 lg:hidden ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none"
          }`}
        >
          <div className="h-full overflow-y-auto px-4 py-24">
            <nav className="space-y-8">
              <div className="space-y-6">
                <NavLink to="/" onClick={() => setIsOpen(false)}>
                  <Home className="w-5 h-5" />
                  <span className="text-lg">ACCUEIL</span>
                </NavLink>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-lg font-medium text-blue-500">
                    <GraduationCap className="w-5 h-5" />
                    <span>NOS FORMATIONS</span>
                  </div>
                  <div className="pl-7 space-y-4">
                    {formations.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.title}
                          to={item.to}
                          className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <NavLink to="/contact" onClick={() => setIsOpen(false)}>
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-lg">CONTACTEZ-NOUS</span>
                </NavLink>

                <NavLink to="/join" onClick={() => setIsOpen(false)}>
                  <UserPlus className="w-5 h-5" />
                  <span className="text-lg">REJOIGNEZ-NOUS</span>
                </NavLink>
              </div>

              <div className="space-y-4">
                <a
                  href="tel:+212675775884"
                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    +212 6 75 77 58 84
                  </span>
                </a>
                <Button
                  to="/join"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-md py-2.5"
                  onClick={() => setIsOpen(false)}
                >
                  REJOIGNEZ-NOUS
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
