import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, Wrench, X, Check, Activity, Cpu, Layers } from 'lucide-react';

export default function SkillsIndex({ skills = [] }) {
    const [editingSkill, setEditingSkill] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        name: '',
        category: 'Design & CAD',
        proficiency: 85,
        icon: 'Wrench',
        description: '',
        sort_order: 0,
    });

    const openAddModal = () => {
        reset();
        setEditingSkill(null);
        setIsAddModalOpen(true);
    };

    const openEditModal = (skill) => {
        setEditingSkill(skill);
        setData({
            name: skill.name,
            category: skill.category,
            proficiency: skill.proficiency,
            icon: skill.icon || 'Wrench',
            description: skill.description || '',
            sort_order: skill.sort_order || 0,
        });
        setIsAddModalOpen(true);
    };

    const closeModal = () => {
        setIsAddModalOpen(false);
        setEditingSkill(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSkill) {
            put(`/admin/skills/${editingSkill.id}`, {
                onSuccess: () => closeModal(),
            });
        } else {
            post('/admin/skills', {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id, name) => {
        if (confirm(`Hapus keahlian "${name}"?`)) {
            router.delete(`/admin/skills/${id}`);
        }
    };

    const categories = ['Design & CAD', 'Analysis & Simulation', 'Engineering Focus', 'Soft Skills'];

    return (
        <AdminLayout title="Manajemen Matriks Keahlian & Software">
            <Head title="Skills Matrix - Daffa Admin" />

            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Technical & Soft Skills Matrix</h1>
                        <p className="text-xs text-slate-400">Atur parameter keahlian CAD, FEA simulasi, perpipaan, dan soft skills yang tampil di portfolio.</p>
                    </div>

                    <button
                        onClick={openAddModal}
                        className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Keahlian</span>
                    </button>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((cat) => {
                        const catSkills = skills.filter((s) => s.category === cat);
                        return (
                            <div key={cat} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
                                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
                                        <h2 className="text-sm font-bold text-white uppercase tracking-wider">{cat}</h2>
                                    </div>
                                    <span className="text-xs text-slate-500 font-mono">{catSkills.length} item</span>
                                </div>

                                <div className="space-y-3">
                                    {catSkills.length === 0 ? (
                                        <p className="text-xs text-slate-500 italic py-2">Belum ada skill di kategori ini.</p>
                                    ) : (
                                        catSkills.map((skill) => (
                                            <div
                                                key={skill.id}
                                                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition space-y-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-bold text-slate-200">{skill.name}</span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-xs font-mono font-bold text-cyan-400">{skill.proficiency}%</span>
                                                        <button
                                                            onClick={() => openEditModal(skill)}
                                                            className="p-1 rounded text-slate-400 hover:text-cyan-400 transition"
                                                            title="Edit"
                                                        >
                                                            <Edit2 className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(skill.id, skill.name)}
                                                            className="p-1 rounded text-slate-400 hover:text-rose-400 transition"
                                                            title="Hapus"
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                                                        style={{ width: `${skill.proficiency}%` }}
                                                    ></div>
                                                </div>

                                                {skill.description && (
                                                    <p className="text-[11px] text-slate-400">{skill.description}</p>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal Add / Edit */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <h3 className="text-base font-bold text-white">
                                {editingSkill ? 'Edit Keahlian' : 'Tambah Keahlian Baru'}
                            </h3>
                            <button onClick={closeModal} className="p-1.5 rounded-lg text-slate-400 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Skill / Software *</label>
                                <input
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="SolidWorks, ANSYS Mechanical, Piping Engineering..."
                                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-1">Kategori</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none"
                                    >
                                        {categories.map((c) => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-300 mb-1">
                                        Tingkat Penguasaan: <span className="text-cyan-400 font-mono">{data.proficiency}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        value={data.proficiency}
                                        onChange={(e) => setData('proficiency', parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 mt-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-300 mb-1">Deskripsi Ringkas Penggunaan</label>
                                <input
                                    type="text"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="3D parametric modeling, pipe routing & assembly..."
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
