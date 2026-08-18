'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Trash2, 
  CheckCircle, 
  Clock, 
  Phone, 
  Calendar, 
  AlertCircle, 
  Reply, 
  Search,
  Users,
  CheckCircle2
} from 'lucide-react';
import { ContactMessage } from '@/lib/types';
import { useToast } from '@/context/ToastContext';
import { getMessages, markMessageRead, deleteMessage as deleteMessageData } from '@/lib/dataService';

export default function AdminMessagesPage() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      if (Array.isArray(data)) setMessages(data);
    } catch (err) {
      console.error(err);
      showToast('Error loading inquiries', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (msg: ContactMessage) => {
    try {
      await markMessageRead(msg.id);
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const markAsReplied = async (msg: ContactMessage) => {
    try {
      await markMessageRead(msg.id);
      showToast('Inquiry marked as Read', 'success');
      fetchMessages();
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage(prev => prev ? { ...prev, isRead: true } : null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessageData(id);
      showToast('Message deleted', 'info');
      setDeleteConfirmId(null);
      if (selectedMessage?.id === id) setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      console.error(err);
      showToast('Failed to delete message', 'error');
    }
  };

  const filteredMessages = messages.filter(m => {
    if (filterUnreadOnly) return !m.isRead;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Mail className="w-6 h-6 text-purple-400" />
            Student Inquiries & Contact Inbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Read messages submitted by students and parents through the public website contact form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterUnreadOnly(!filterUnreadOnly)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
              filterUnreadOnly 
                ? 'bg-purple-600 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {filterUnreadOnly ? 'Showing Unread Only' : 'Show All Messages'}
          </button>
        </div>
      </div>

      {/* Inbox Split View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Message List (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 rounded-3xl border border-slate-800 p-4 space-y-3 max-h-[750px] overflow-y-auto">
          {filteredMessages.length === 0 && !loading && (
            <div className="py-12 text-center text-slate-500 text-xs">
              No inquiries found in this view.
            </div>
          )}

          {filteredMessages.map((msg) => {
            const isSelected = selectedMessage?.id === msg.id;
            return (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.isRead) markAsRead(msg);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-slate-900 border-purple-500/50 shadow-md'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-sm text-white truncate">{msg.name}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!msg.isRead && (
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                    )}
                    <span className="text-[10px] text-slate-500">
                      {msg.date ? new Date(msg.date).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-purple-300 truncate">
                  {msg.subject || 'Course / Admission Inquiry'}
                </div>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {msg.message}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                  <span className="bg-slate-950 px-2 py-0.5 rounded text-slate-400">
                    {msg.studentClass}
                  </span>
                  <span className={`font-semibold ${msg.replyStatus === 'Replied' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {msg.replyStatus || 'Pending'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Message Details (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 min-h-[450px] shadow-xl">
          {selectedMessage ? (
            <div className="space-y-6">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {selectedMessage.subject || 'Student Inquiry'}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                    <span><strong>From:</strong> {selectedMessage.name}</span>
                    <span>•</span>
                    <span><strong>Level:</strong> {selectedMessage.studentClass}</span>
                    <span>•</span>
                    <span>{new Date(selectedMessage.date).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => setDeleteConfirmId(selectedMessage.id)}
                  className="p-2 rounded-xl bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 transition-colors"
                  title="Delete Inquiry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Student Contact Credentials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Email Address</span>
                  <a href={`mailto:${selectedMessage.email}`} className="text-cyan-400 hover:underline font-semibold mt-0.5 block">
                    {selectedMessage.email}
                  </a>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Phone Number</span>
                  <a href={`tel:${selectedMessage.phone}`} className="text-teal-400 hover:underline font-semibold mt-0.5 block">
                    {selectedMessage.phone || 'Not Provided'}
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Inquiry Message:</span>
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => markAsReplied(selectedMessage)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark as Replied</span>
                  </button>

                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject || 'Chemistry Batch Inquiry')}`}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Reply className="w-4 h-4" />
                    <span>Reply via Email</span>
                  </a>
                </div>

                {selectedMessage.phone && (
                  <a
                    href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    Open WhatsApp Chat →
                  </a>
                )}
              </div>

            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center text-slate-500 space-y-2">
              <Mail className="w-12 h-12 text-slate-700 mx-auto" />
              <h4 className="text-sm font-bold text-slate-400">Select an inquiry to view details</h4>
              <p className="text-xs text-slate-600 max-w-xs">
                Click on any student message on the left to review their inquiry and respond.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-sm w-full space-y-4 text-center">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-white">Delete Inquiry Message?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to permanently delete this student inquiry?
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
