import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    FolderKanban, 
    Wrench, 
    GraduationCap, 
    Mail, 
    ArrowUpRight, 
    CheckCircle2, 
    Clock, 
    Send, 
    ShieldCheck,
    FileText,
    ExternalLink
} from 'lucide-react';

export default function Dashboard({ profile, stats = {}, recentMessages = [], recentProjects = [] }) {
    return (
        <AdminLayout title="Overview Dashboard">
            <Head title="Admin Dashboard - Daffa Portfolio" />

            <div className="space-y-8 max-w-7xl mx-auto">
                {/* Welcome Hero Banner */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-indigo-500/20 p-6 md:p-8">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>Oil & Gas Mechanical Engineering Portfolio</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                                Halo, {profile?.full_name || 'Achmad Daffa'}! 👋
                            </h1>
                            <p className="text-sm md:text-base text-slate-400 max-w-2xl">
                                Kelola seluruh konten portfolio engineering, proyek perpipaan & CAD, data keahlian, dan pantau pesan rekruter yang masuk ke inbox Anda secara real-time.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <Link
                                href="/admin/projects/create"
                                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20"
                            >
                                + Tambah Proyek
                            </Link>
                            <Link
                                href="/admin/profile-setting"
                                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition"
                            >
                                Edit Profil & Bio
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/40 transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Proyek</span>
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                                <FolderKanban className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline space-x-2">
                            <span className="text-3xl font-extrabold text-white">{stats?.totalProjects ?? 0}</span>
                            <span className="text-xs text-cyan-400 font-medium">engineering cases</span>
                        </div>
                        <Link href="/admin/projects" className="mt-3 text-xs text-slate-400 hover:text-cyan-400 flex items-center space-x-1">
                            <span>Kelola proyek</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-amber-500/40 transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Skills & Software</span>
                            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                                <Wrench className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline space-x-2">
                            <span className="text-3xl font-extrabold text-white">{stats?.totalSkills ?? 0}</span>
                            <span className="text-xs text-amber-400 font-medium">CAD, FEA, P&ID</span>
                        </div>
                        <Link href="/admin/skills" className="mt-3 text-xs text-slate-400 hover:text-amber-400 flex items-center space-x-1">
                            <span>Kelola matriks keahlian</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/40 transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pendidikan & Organisasi</span>
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline space-x-2">
                            <span className="text-3xl font-extrabold text-white">{stats?.totalExperiences ?? 0}</span>
                            <span className="text-xs text-emerald-400 font-medium">timeline items</span>
                        </div>
                        <Link href="/admin/experiences" className="mt-3 text-xs text-slate-400 hover:text-emerald-400 flex items-center space-x-1">
                            <span>Lihat riwayat</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-purple-500/40 transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pesan Rekruter</span>
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center relative">
                                <Mail className="w-5 h-5" />
                                {(stats?.unreadMessagesCount ?? 0) > 0 && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full animate-ping"></span>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline space-x-2">
                            <span className="text-3xl font-extrabold text-white">{stats?.unreadMessagesCount ?? 0}</span>
                            <span className="text-xs text-rose-400 font-medium">belum dibaca</span>
                        </div>
                        <Link href="/admin/messages" className="mt-3 text-xs text-slate-400 hover:text-purple-400 flex items-center space-x-1">
                            <span>Buka inbox pesan</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                </div>

                {/* Two Column Layout: Recent Messages & Featured Projects */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Inquiries */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <div>
                                <h2 className="text-base font-bold text-white">Inquiries & Kontak Rekruter</h2>
                                <p className="text-xs text-slate-400">Pesan terbaru dari formulir kontak website</p>
                            </div>
                            <Link href="/admin/messages" className="text-xs text-cyan-400 hover:underline">
                                Lihat Semua
                            </Link>
                        </div>

                        <div className="mt-4 divide-y divide-slate-800/60">
                            {recentMessages.length === 0 ? (
                                <p className="text-sm text-slate-500 py-6 text-center">Belum ada pesan masuk.</p>
                            ) : (
                                recentMessages.map((msg) => (
                                    <div key={msg.id} className="py-4 flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="text-sm font-semibold text-white">{msg.name}</h3>
                                                {!msg.is_read && (
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                                                        Baru
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-400">{msg.email}</p>
                                            <p className="text-xs text-slate-300 line-clamp-2 mt-1">{msg.message}</p>
                                        </div>
                                        <a
                                            href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Portfolio Inquiry'}`}
                                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium flex items-center space-x-1 flex-shrink-0"
                                        >
                                            <Send className="w-3 h-3" />
                                            <span>Balas</span>
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Quick Projects Overview */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                            <div>
                                <h2 className="text-base font-bold text-white">Daftar Proyek Unggulan</h2>
                                <p className="text-xs text-slate-400">Piping, CAD, dan analisis simulasi yang aktif</p>
                            </div>
                            <Link href="/admin/projects" className="text-xs text-cyan-400 hover:underline">
                                Kelola ({recentProjects.length})
                            </Link>
                        </div>

                        <div className="mt-4 space-y-3">
                            {recentProjects.map((proj) => (
                                <div key={proj.id} className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-xs font-semibold text-cyan-300">{proj.category}</span>
                                            <span className="text-slate-600">•</span>
                                            <span className="text-xs text-slate-400">{proj.year || '2024'}</span>
                                        </div>
                                        <h3 className="text-sm font-bold text-white line-clamp-1">{proj.title}</h3>
                                        <p className="text-xs text-slate-400">{proj.tools}</p>
                                    </div>

                                    <Link
                                        href={`/admin/projects/${proj.id}/edit`}
                                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 text-xs font-medium border border-slate-700 transition"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Profile Snapshot & Quick Bio */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h3 className="text-base font-bold text-white">Profil: {profile?.study_program}</h3>
                        <p className="text-xs text-slate-400">{profile?.university} • {profile?.semester} • {profile?.focus_area}</p>
                        <p className="text-xs text-cyan-400 font-medium">Status: {profile?.internship_seeking}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin/profile-setting"
                            className="px-4 py-2 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold transition"
                        >
                            Perbarui Data Profil
                        </Link>
                        <a
                            href="/"
                            target="_blank"
                            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold inline-flex items-center space-x-1.5 transition"
                        >
                            <span>Buka Web Portfolio</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
