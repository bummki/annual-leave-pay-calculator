"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Calculator, Calendar as CalendarIcon, Briefcase, Bell, LayoutDashboard, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "연차 수당", href: "/calculator/money", icon: Calculator },
    { name: "입사일 vs 회계", href: "/calculator/leave-days", icon: Briefcase },
    { name: "연차 촉진 알림", href: "/calculator/promotion", icon: Bell },
    { name: "2026 황금연휴", href: "/calculator/calendar", icon: CalendarIcon },
    { name: "신입사원 현황", href: "/calculator/new-hire", icon: LayoutDashboard },
    { name: "HR 대시보드", href: "/hr-admin", icon: FileSpreadsheet },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                            <CalendarIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">
                            PagePulse <span className="text-primary">연차계산기</span>
                        </span>
                        <span className="font-bold text-xl text-primary sm:hidden">Pulse</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors flex items-center gap-2"
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={cn(
                    "md:hidden absolute w-full bg-white border-b border-slate-100 transition-all duration-300 ease-in-out overflow-hidden",
                    isOpen ? "max-h-96 opacity-100 shadow-xl" : "max-h-0 opacity-0"
                )}
            >
                <div className="px-4 pt-2 pb-6 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-primary hover:bg-slate-50 active:bg-slate-100 transition-all"
                        >
                            <item.icon className="w-5 h-5 text-slate-400 group-hover:text-primary" />
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
