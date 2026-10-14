import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Mail, Trash2, CheckCircle2, Send, Clock, User, X } from 'lucide-react';

export default function MessagesIndex({ messages = [] }) {
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [filter, setFilter] = useState('all'); // 'all', 'unread'

    const handleMarkAsRead = (id) => {
        router.patch(`/admin/messages/${id}/read`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                if (selectedMessage && selectedMessage.id === id) {
                    setSelectedMessage(prev => ({ ...prev, is_read: true }));
                }
            }
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Hapus pesan dari "${name}"?`)) {
            router.delete(`/admin/messages/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    if (selectedMessage && selectedMessage.id === id) {
                        setSelectedMessage(null);
                    }
                }
            });
        }
    };

    const filteredMessages = messages.filter(m => {
        if (filter === 'unread') return !m.is_read;
        return true;
    });

    const unreadCount = messages.filter(m => !m.is_read).length;

    return (
        <AdminLayout title="Inbox Pesan & Kontak Rekruter">
            <Head title="Inbox Pesan - Daffa Admin" />

            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">Kotak Masuk Pesan Rekruter & Klien</h1>
                        <p className="text-xs text-slate-400">
                            Total {messages.length} pesan ({unreadCount} belum dibaca).
                        </p>
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                                filter === 'all' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Semua ({messages.length})
                        </button>
                        <button
                            onClick={() => setFilter('unread')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                                filter === 'unread' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                            }`}
                        >
                            Belum Dibaca ({unreadCount})
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Message List */}
                    <div className="lg:col-span-5 space-y-3">
                        {filteredMessages.length === 0 ? (
                            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 text-xs">
                                Tidak ada pesan dalam kategori ini.
                            </div>
                        ) : (
                            filteredMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    onClick={() => {
                                        setSelectedMessage(msg);
                                        if (!msg.is_read) handleMarkAsRead(msg.id);
                                    }}
                                    className={`p-4 rounded-2xl border cursor-pointer transition text-left space-y-2 ${
                                        selectedMessage?.id === msg.id
                                            ? 'bg-slate-900 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                                            : msg.is_read
                                            ? 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700'
                                            : 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-500/50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-bold text-white">{msg.name}</span>
                                            {!msg.is_read && (
                                                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-slate-400">
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <p className="text-xs font-semibold text-cyan-300 line-clamp-1">
                                        {msg.subject || '(Tanpa Subjek)'}
                                    </p>

                                    <p className="text-xs text-slate-400 line-clamp-2">
                                        {msg.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Message Detail Card */}
                    <div className="lg:col-span-7">
                        {selectedMessage ? (
                            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-6">
                                <div className="flex items-start justify-between pb-4 border-b border-slate-800">
                                    <div className="space-y-1">
                                        <h2 className="text-lg font-bold text-white">{selectedMessage.subject || 'Inquiry Portfolio'}</h2>
                                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                                            <span className="font-semibold text-slate-200">{selectedMessage.name}</span>
                                            <span>&lt;{selectedMessage.email}&gt;</span>
                                        </div>
                                        <p className="text-[11px] text-slate-500">
                                            Dikirim: {new Date(selectedMessage.created_at).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleDelete(selectedMessage.id, selectedMessage.name)}
                                            className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition"
                                            title="Hapus Pesan"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed min-h-[160px]">
                                    {selectedMessage.message}
                                </div>

                                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xs text-slate-400">Status:</span>
                                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                            <span>Sudah dibaca</span>
                                        </span>
                                    </div>

                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent('\n\n---\nPesan Asli:\n' + selectedMessage.message)}`}
                                        className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-cyan-500/20"
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                        <span>Balas via Email</span>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm space-y-3">
                                <Mail className="w-10 h-10 text-slate-600 mx-auto" />
                                <p>Pilih salah satu pesan di sebelah kiri untuk membaca isinya secara detail.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
