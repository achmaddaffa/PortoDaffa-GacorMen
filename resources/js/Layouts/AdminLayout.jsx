import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, 
    User, 
    FolderKanban, 
    Wrench, 
    GraduationCap, 
    Mail, 
    ExternalLink, 
    LogOut, 
    Menu, 
    X, 
    CheckCircle2, 
    AlertCircle,
    Flame,
    KeyRound
} from 'lucide-react';

export default function AdminLayout({ children, title = 'Admin Panel' }) {
    const { props, url: pageUrl } = usePage();
    const { auth, flash } = props || {};
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const currentUrl = pageUrl || '';

    const navItems = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, current: currentUrl.startsWith('/admin/dashboard') },
        { name: 'Profile & Bio', href: '/admin/profile-setting', icon: User, current: currentUrl.startsWith('/admin/profile-setting') },
        { name: 'Projects', href: '/admin/projects', icon: FolderKanban, current: currentUrl.startsWith('/admin/projects') },
        { name: 'Skills Matrix', href: '/admin/skills', icon: Wrench, current: currentUrl.startsWith('/admin/skills') },
        { name: 'Education & Exp', href: '/admin/experiences', icon: GraduationCap, current: currentUrl.startsWith('/admin/experiences') },
        { name: 'Inquiries Inbox', href: '/admin/messages', icon: Mail, current: currentUrl.startsWith('/admin/messages') },
        { name: 'Akun & Password', href: '/profile', icon: KeyRound, current: currentUrl.startsWith('/profile') },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased font-sans">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-sm border border-cyan-500/30">
                        <Flame className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="font-bold text-base tracking-wide text-white">Daffa Admin</span>
                </div>
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800/80 p-5 flex flex-col justify-between
                transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:inset-auto
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div>
                    {/* Brand */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <span className="font-extrabold text-white text-base">AD</span>
                            </div>
                            <div>
                                <h1 className="font-bold text-sm text-white tracking-wide">Achmad Daffa</h1>
                                <p className="text-xs text-cyan-400 font-medium">Portfolio Admin</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="mt-6 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                        item.current
                                            ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                                    }`}
                                >
                                    <Icon className={`w-4 h-4 ${item.current ? 'text-cyan-400' : 'text-slate-400'}`} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom actions */}
                <div className="pt-6 border-t border-slate-800 space-y-2">
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-800/40 transition"
                    >
                        <span className="flex items-center space-x-2">
                            <span>View Live Site</span>
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition"
                    >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out ({auth?.user?.name || 'Admin'})</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 flex flex-col min-h-screen bg-slate-950">
                {/* Topbar */}
                <header className="h-16 border-b border-slate-800/80 px-6 hidden md:flex items-center justify-between bg-slate-900/40 backdrop-blur-md">
                    <div>
                        <h2 className="text-base font-semibold text-white tracking-wide">{title}</h2>
                        <p className="text-xs text-slate-400">Engineering Portfolio CMS & Content Management</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <a
                            href="/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
                        >
                            <span>Live Preview</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                        <div className="w-px h-6 bg-slate-800"></div>
                        <div className="flex items-center space-x-2 text-xs text-slate-300">
                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span>Online as <strong className="text-white">{auth?.user?.name || 'Admin'}</strong></span>
                        </div>
                    </div>
                </header>

                {/* Notifications / Flash alerts */}
                {flash?.success && (
                    <div className="mx-6 mt-4 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center space-x-3">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                        <span className="text-sm font-medium">{flash.success}</span>
                    </div>
                )}
                {flash?.error && (
                    <div className="mx-6 mt-4 p-4 rounded-xl bg-rose-900/40 border border-rose-500/30 text-rose-300 flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
                        <span className="text-sm font-medium">{flash.error}</span>
                    </div>
                )}

                {/* Page Body */}
                <div className="p-4 md:p-8 flex-1">
                    {children}
                </div>
            </main>
        </div>
    );
}
