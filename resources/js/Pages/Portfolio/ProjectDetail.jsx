import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Calendar, 
    User, 
    Wrench, 
    ExternalLink, 
    CheckCircle2, 
    AlertCircle, 
    Lightbulb, 
    TrendingUp, 
    Layers, 
    Share2 
} from 'lucide-react';

export default function ProjectDetail({ project, relatedProjects = [] }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
            <Head title={`${project.title} - Case Study | Achmad Daffa`} />

            {/* Navigation */}
            <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center space-x-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Portfolio</span>
                    </Link>

                    <div className="flex items-center space-x-3">
                        <span className="text-xs text-slate-400 font-mono">Daffa Engineering Archive</span>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
                {/* Hero Title */}
                <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                            {project.category}
                        </span>
                        {project.year && (
                            <span className="flex items-center space-x-1 text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{project.year}</span>
                            </span>
                        )}
                        {project.role && (
                            <span className="flex items-center space-x-1 text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                                <User className="w-3.5 h-3.5" />
                                <span>{project.role}</span>
                            </span>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                        {project.title}
                    </h1>

                    <p className="text-base text-slate-300 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Tools & standards */}
                    {project.tools && (
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                            <span className="text-xs text-slate-500 font-mono">Applied Tools:</span>
                            {project.tools.split(',').map((t, idx) => (
                                <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-cyan-300 border border-slate-700/60 font-mono">
                                    {t.trim()}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Hero Image */}
                {project.image_url && (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900">
                        <img 
                            src={project.image_url} 
                            alt={project.title}
                            className="w-full max-h-[480px] object-cover object-center" 
                        />
                    </div>
                )}

                {/* Deep Technical Case Study: Problem, Solution, Result */}
                <div className="space-y-8">
                    <h2 className="text-xl font-bold text-white flex items-center space-x-2 border-b border-slate-800 pb-3">
                        <Layers className="w-5 h-5 text-cyan-400" />
                        <span>Engineering Breakdown & Methodology</span>
                    </h2>

                    <div className="grid grid-cols-1 gap-6">
                        {project.problem && (
                            <div className="p-6 rounded-2xl bg-slate-900/60 border border-rose-500/20 space-y-3">
                                <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>Tantangan Rekayasa & Problem Formulation</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {project.problem}
                                </p>
                            </div>
                        )}

                        {project.solution && (
                            <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 space-y-3">
                                <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
                                    <Lightbulb className="w-4 h-4" />
                                    <span>Langkah Implementasi & CAD/FEA Approach</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {project.solution}
                                </p>
                            </div>
                        )}

                        {project.result && (
                            <div className="p-6 rounded-2xl bg-slate-900/60 border border-emerald-500/20 space-y-3">
                                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Hasil Validasi, Safety Factor & Output</span>
                                </div>
                                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                                    {project.result}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* External Links */}
                {(project.drive_url || project.demo_url) && (
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-base font-bold text-white">Ingin Meninjau Model CAD / Dokumen Proyek?</h3>
                            <p className="text-xs text-slate-400">Arsip drawing 2D, 3D parametric part, atau simulasi laporan teknik.</p>
                        </div>

                        <div className="flex items-center gap-3">
                            {project.drive_url && (
                                <a
                                    href={project.drive_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20 inline-flex items-center space-x-2"
                                >
                                    <span>Buka File Drive</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
