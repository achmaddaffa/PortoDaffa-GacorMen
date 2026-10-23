import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit, Trash2, ExternalLink, Star, Search, FolderKanban } from 'lucide-react';

export default function ProjectsIndex({ projects = [] }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleDelete = (id, title) => {
        if (confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"?`)) {
            router.delete(`/admin/projects/${id}`);
        }
    };

    const filteredProjects = projects.filter(p => 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.tools && p.tools.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <AdminLayout title="Kelola Engineering Projects">
            <Head title="Manajemen Proyek - Daffa Admin" />

            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Daftar Proyek & Studi Kasus Rekayasa</h1>
                        <p className="text-xs text-slate-400">Total {projects.length} proyek terdaftar untuk ditampilkan di portfolio.</p>
                    </div>

                    <Link
                        href="/admin/projects/create"
                        className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Proyek Baru</span>
                    </Link>
                </div>

                {/* Filter and Search */}
                <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari berdasarkan judul, kategori, atau tools (SolidWorks, ANSYS, P&ID)..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                    />
                </div>

                {/* Projects List */}
                <div className="grid grid-cols-1 gap-4">
                    {filteredProjects.length === 0 ? (
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                            <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
                            <p className="text-slate-400 text-sm">Tidak ada proyek yang sesuai dengan kueri pencarian.</p>
                        </div>
                    ) : (
                        filteredProjects.map((project) => (
                            <div 
                                key={project.id} 
                                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-5"
                            >
                                <div className="flex items-start space-x-4">
                                    {project.image_src ? (
                                        <img 
                                            src={project.image_src} 
                                            alt={project.title}
                                            className="w-20 h-20 rounded-xl object-cover border border-slate-700/60 flex-shrink-0" 
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-cyan-400 font-bold text-xs">
                                            CAD/FEA
                                        </div>
                                    )}

                                    <div className="space-y-1.5">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                                {project.category}
                                            </span>
                                            {project.is_featured && (
                                                <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                                    <Star className="w-3 h-3 fill-amber-300" />
                                                    <span>Featured</span>
                                                </span>
                                            )}
                                            <span className="text-xs text-slate-400">{project.year || '2024'}</span>
                                        </div>

                                        <h2 className="text-base font-bold text-white tracking-wide">{project.title}</h2>
                                        
                                        <p className="text-xs text-slate-400 line-clamp-1">{project.description}</p>
                                        
                                        <div className="text-xs text-cyan-300 font-mono flex items-center space-x-2">
                                            <span className="text-slate-500">Tools:</span>
                                            <span>{project.tools || '-'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 self-end md:self-center">
                                    <Link
                                        href={`/projects/${project.slug}`}
                                        target="_blank"
                                        className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                                        title="Preview di Publik"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href={`/admin/projects/${project.id}/edit`}
                                        className="p-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition flex items-center space-x-1 text-xs font-semibold px-3"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                        <span>Edit</span>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(project.id, project.title)}
                                        className="p-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition"
                                        title="Hapus Proyek"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
