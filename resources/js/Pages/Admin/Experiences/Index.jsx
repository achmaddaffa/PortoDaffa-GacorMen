import React, { useEffect, useRef, useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, GraduationCap, Building2, Award, Users, X, GripVertical, ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';

export default function ExperiencesIndex({ experiences = [] }) {
    const [editingExp, setEditingExp] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [items, setItems] = useState(experiences);
    const [overIndex, setOverIndex] = useState(null);
    // Ref, bukan state: dragstart -> drop bisa terjadi dalam satu tick React.
    const dragIndex = useRef(null);

    useEffect(() => {
        setItems(experiences);
    }, [experiences]);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        title: '',
        organization: '',
        type: 'education',
        period: '',
        location: 'Yogyakarta, Indonesia',
        description: '',
        sort_order: 0,
    });

    const saveOrder = (ordered) => {
        setItems(ordered);
        router.post('/admin/experiences/reorder', { ids: ordered.map((item) => item.id) }, { preserveScroll: true });
    };

    const handleDrop = (targetIndex) => {
        const from = dragIndex.current;
        dragIndex.current = null;
        setOverIndex(null);

        if (from === null || from === targetIndex) {
            return;
        }

        const ordered = [...items];
        const [moved] = ordered.splice(from, 1);
        ordered.splice(targetIndex, 0, moved);

        saveOrder(ordered);
    };

    const sortByPeriod = (direction) => {
        router.post('/admin/experiences/sort-by-period', { direction }, { preserveScroll: true });
    };

    const openAddModal = () => {
        reset();
        setData('sort_order', items.length + 1);
        setEditingExp(null);
        setIsModalOpen(true);
    };

    const openEditModal = (exp) => {
        setEditingExp(exp);
        setData({
            title: exp.title,
            organization: exp.organization,
            type: exp.type || 'education',
            period: exp.period || '',
            location: exp.location || '',
            description: exp.description || '',
            sort_order: exp.sort_order || 0,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingExp(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingExp) {
            put(`/admin/experiences/${editingExp.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/experiences', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id, title) => {
        if (confirm(`Hapus entri "${title}"?`)) {
            router.delete(`/admin/experiences/${id}`);
        }
    };

    const typeIcons = {
        education: GraduationCap,
        experience: Building2,
        organization: Users,
        award: Award,
    };

    return (
        <AdminLayout title="Riwayat Pendidikan, Organisasi & Pengalaman">
            <Head title="Pendidikan & Pengalaman - Daffa Admin" />

            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Timeline & Riwayat Perjalanan</h1>
                        <p className="text-xs text-slate-400">Kelola riwayat studi UGM, kepanitiaan teknik mesin, dan pencapaian kompetisi.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => sortByPeriod('asc')}
                            className="inline-flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
                            title="Urutkan dari periode paling lama"
                        >
                            <ArrowUpWideNarrow className="w-4 h-4" />
                            <span>Paling Lama</span>
                        </button>
                        <button
                            onClick={() => sortByPeriod('desc')}
                            className="inline-flex items-center space-x-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition"
                            title="Urutkan dari periode paling baru"
                        >
                            <ArrowDownWideNarrow className="w-4 h-4" />
                            <span>Paling Baru</span>
                        </button>
                        <button
                            onClick={openAddModal}
                            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Tambah Riwayat</span>
                        </button>
                    </div>
                </div>

                <p className="text-[11px] text-slate-500">
                    Tarik ikon <GripVertical className="inline w-3 h-3 align-text-bottom" /> untuk mengubah urutan. Perubahan langsung tersimpan.
                </p>

                {/* Timeline List */}
                <div className="space-y-4">
                    {items.length === 0 ? (
                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-sm">
                            Belum ada riwayat pendidikan atau pengalaman.
                        </div>
                    ) : (
                        items.map((exp, index) => {
                            const IconComponent = typeIcons[exp.type] || GraduationCap;
                            return (
                                <div
                                    key={exp.id}
                                    draggable
                                    onDragStart={() => { dragIndex.current = index; }}
                                    onDragOver={(e) => { e.preventDefault(); setOverIndex(index); }}
                                    onDragLeave={() => setOverIndex((current) => (current === index ? null : current))}
                                    onDrop={(e) => { e.preventDefault(); handleDrop(index); }}
                                    onDragEnd={() => { dragIndex.current = null; setOverIndex(null); }}
                                    className={`bg-slate-900/80 border rounded-2xl p-5 transition flex items-start justify-between gap-4 ${
                                        overIndex === index ? 'border-cyan-400/70 bg-cyan-500/5' : 'border-slate-800 hover:border-slate-700'
                                    }`}
                                >
                                    <div className="flex items-start space-x-3">
                                        <span className="mt-2 cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-300" title="Tarik untuk mengubah urutan">
                                            <GripVertical className="w-4 h-4" />
                                        </span>
                                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
                                            <IconComponent className="w-5 h-5" />
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex flex-wrap items-center gap-2">
                                                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-cyan-300">
                                                    {exp.type}
                                                </span>
                                                <span className="text-xs text-slate-400">{exp.period}</span>
                                                {exp.location && (
                                                    <span className="text-xs text-slate-500">• {exp.location}</span>
                                                )}
                                            </div>

                                            <h3 className="text-base font-bold text-white">{exp.title}</h3>
                                            <p className="text-xs font-medium text-slate-300">{exp.organization}</p>
                                            
                                            {exp.description && (
                                                <p className="text-xs text-slate-400 pt-1 leading-relaxed">{exp.description}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-1.5 flex-shrink-0">
                                        <button
                                            onClick={() => openEditModal(exp)}
                                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 transition"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(exp.id, exp.title)}
                                            className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition"
                                            title="Hapus"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Modal Add / Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <h3 className="text-base font-bold text-white">
                                {editingExp ? 'Edit Riwayat' : 'Tambah Riwayat Baru'}
                            </h3>
                            <button onClick={closeModal} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Judul / Program / Posisi *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="D4 Mechanical Engineering Technology..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-1">Institusi / Organisasi *</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.organization}
                                        onChange={(e) => setData('organization', e.target.value)}
                                        placeholder="Universitas Gadjah Mada (UGM)..."
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-1">Tipe</label>
                                    <select
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                    >
                                        <option value="education">Pendidikan (Education)</option>
                                        <option value="experience">Pengalaman / Laboratorium</option>
                                        <option value="organization">Organisasi / Kepanitiaan</option>
                                        <option value="award">Penghargaan / Lomba</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-1">Periode / Semester</label>
                                    <input
                                        type="text"
                                        value={data.period}
                                        onChange={(e) => setData('period', e.target.value)}
                                        placeholder="2022 - Sekarang (Semester 5)"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-1">Lokasi</label>
                                    <input
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        placeholder="Yogyakarta, Indonesia"
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Deskripsi & Poin Fokus</label>
                                <textarea
                                    rows={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Fokus pada perpipaan, diagram P&ID, simulasi thermo-fluid..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/20"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
