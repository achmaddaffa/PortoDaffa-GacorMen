import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, FolderKanban, CheckSquare, Sparkles } from 'lucide-react';

export default function ProjectForm({ project, isEdit = false }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: project?.title || '',
        category: project?.category || 'Piping Engineering',
        role: project?.role || '',
        tools: project?.tools || '',
        year: project?.year || new Date().getFullYear().toString(),
        description: project?.description || '',
        problem: project?.problem || '',
        solution: project?.solution || '',
        result: project?.result || '',
        image_url: project?.image_url || '',
        demo_url: project?.demo_url || '',
        drive_url: project?.drive_url || '',
        is_featured: project ? Boolean(project.is_featured) : true,
        sort_order: project?.sort_order ?? 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/projects/${project.id}`);
        } else {
            post('/admin/projects');
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Proyek' : 'Tambah Proyek Baru'}>
            <Head title={`${isEdit ? 'Edit' : 'Tambah'} Proyek - Daffa Admin`} />

            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <Link
                        href="/admin/projects"
                        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Daftar Proyek</span>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm pb-2 border-b border-slate-800">
                            <FolderKanban className="w-4 h-4" />
                            <span>Informasi Utama Proyek</span>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">Judul Proyek *</label>
                            <input
                                type="text"
                                required
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Contoh: Piping & Instrumentation Diagram (P&ID) for Crude Distillation System"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                            {errors.title && <p className="text-xs text-rose-400 mt-1">{errors.title}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Kategori *</label>
                                <select
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                >
                                    <option value="Piping Engineering">Piping Engineering</option>
                                    <option value="Design & CAD">Design & CAD</option>
                                    <option value="Analysis & Simulation">Analysis & Simulation</option>
                                    <option value="Manufacturing Design">Manufacturing Design</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Peran / Role</label>
                                <input
                                    type="text"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    placeholder="Contoh: Lead Piping Drafter"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">Tahun</label>
                                <input
                                    type="text"
                                    value={data.year}
                                    onChange={(e) => setData('year', e.target.value)}
                                    placeholder="2024"
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">Tools & Standar yang Digunakan</label>
                            <input
                                type="text"
                                value={data.tools}
                                onChange={(e) => setData('tools', e.target.value)}
                                placeholder="SolidWorks, ANSYS Mechanical, AutoCAD Plant 3D, ASME B31.3"
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">Ringkasan Singkat (Short Description) *</label>
                            <textarea
                                rows={2}
                                required
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Jelaskan gambaran umum proyek dalam 1-2 kalimat..."
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Problem, Solution, Result (Engineering Structure from CV) */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm pb-2 border-b border-slate-800">
                            <Sparkles className="w-4 h-4" />
                            <span>Studi Kasus Teknik (Problem, Solution & Result)</span>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">1. Tantangan / Masalah (Problem)</label>
                            <textarea
                                rows={3}
                                value={data.problem}
                                onChange={(e) => setData('problem', e.target.value)}
                                placeholder="Tantangan teknis, kendala ruang perpipaan, thermal expansion, atau stress spike..."
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">2. Solusi Rekayasa (What I Did / Solution)</label>
                            <textarea
                                rows={3}
                                value={data.solution}
                                onChange={(e) => setData('solution', e.target.value)}
                                placeholder="Langkah pemodelan CAD, analisis FEA di ANSYS, konfigurasi valve dan bypass..."
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5">3. Hasil & Dampak (Result)</label>
                            <textarea
                                rows={3}
                                value={data.result}
                                onChange={(e) => setData('result', e.target.value)}
                                placeholder="Penurunan tegangan von Mises sebesar 28%, penghematan footprint 15%, safety factor > 2.0..."
                                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Media & Links */}
                    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">URL Gambar / Render 3D</label>
                                <input
                                    type="text"
                                    value={data.image_url}
                                    onChange={(e) => setData('image_url', e.target.value)}
                                    placeholder="https://..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1.5">URL File Google Drive / CAD Drawing</label>
                                <input
                                    type="url"
                                    value={data.drive_url}
                                    onChange={(e) => setData('drive_url', e.target.value)}
                                    placeholder="https://drive.google.com/..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 pt-2">
                            <label className="flex items-center space-x-2.5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 border-slate-700 bg-slate-950"
                                />
                                <span className="text-xs font-medium text-slate-300">Tampilkan sebagai Proyek Unggulan (Featured)</span>
                            </label>

                            <div className="flex items-center space-x-2">
                                <label className="text-xs text-slate-400">Urutan (Sort Order):</label>
                                <input
                                    type="number"
                                    value={data.sort_order}
                                    onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                    className="w-20 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-xs text-slate-100"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Link
                            href="/admin/projects"
                            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center space-x-2"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Menyimpan...' : 'Simpan Proyek'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
