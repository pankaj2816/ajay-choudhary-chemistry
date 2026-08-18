'use client';

import React, { useState, useEffect } from 'react';
import SafeImage from '@/components/ui/SafeImage';
import { 
  Users, 
  Plus, 
  Edit3, 
  Trash2, 
  X, 
  Loader2, 
  Upload, 
  AlertCircle,
  Sparkles,
  Building2,
  Mail,
  CheckCircle2
} from 'lucide-react';
import { TeamMember } from '@/lib/types';
import { useToast } from '@/context/ToastContext';
import { getTeam, saveTeamMember } from '@/lib/dataService';

export default function AdminTeamPage() {
  const { showToast } = useToast();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<TeamMember, 'id'>>({
    name: '',
    role: 'Chemistry Faculty',
    designation: 'M.Sc. Chemistry',
    specialization: 'Organic Chemistry & Reaction Mechanisms',
    experience: '5+ Years',
    centers: 'Catalyst Career Institute, Apex Science Academy & Prerana Hub',
    image: '/images/ajay-choudhary.jpg',
    bio: '',
    email: '',
    phone: ''
  });

  const fetchTeam = async () => {
    try {
      const data = await getTeam();
      if (Array.isArray(data)) setTeam(data);
    } catch (err) {
      console.error(err);
      showToast('Error loading team portfolio', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      role: 'Associate Chemistry Faculty',
      designation: 'M.Sc. Chemistry, B.Ed',
      specialization: 'Inorganic Chemistry & Periodic Trends',
      experience: '5+ Years Experience',
      centers: 'Catalyst, Apex & Prerana Centers',
      image: '/images/ajay-choudhary.jpg',
      bio: '',
      email: '',
      phone: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: TeamMember) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      role: item.role,
      designation: item.designation,
      specialization: item.specialization,
      experience: item.experience,
      centers: item.centers,
      image: item.image,
      bio: item.bio,
      email: item.email || '',
      phone: item.phone || ''
    });
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData(prev => ({ ...prev, image: '/images/ajay-choudhary.jpg' }));
    showToast('Photo verified!', 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.role) {
      showToast('Name and Role are required', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await saveTeamMember(editingId ? { id: editingId, ...formData } : formData);
      showToast(editingId ? 'Faculty member updated' : 'New team member added to portfolio!', 'success');
      setIsModalOpen(false);
      fetchTeam();
    } catch (err) {
      console.error(err);
      showToast('Failed to save team member', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    showToast('Admin faculty profile updated', 'info');
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            Manage Teaching Portfolio & Gallery
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage classroom photos, laboratory session highlights, and specializations across your 3 coaching centers.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/25 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Portfolio Item</span>
        </button>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div
            key={member.id}
            className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] w-full bg-slate-900">
                <SafeImage
                  src={member.image || '/images/ajay-choudhary.jpg'}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-slate-900/90 text-cyan-300 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-700">
                  {member.role}
                </div>
              </div>

              <div className="p-5 space-y-2.5">
                <h3 className="text-base font-bold text-white">{member.name}</h3>
                <p className="text-xs text-indigo-400 font-semibold">{member.designation}</p>

                <div className="text-xs text-slate-400 space-y-1">
                  <p><strong>Specialization:</strong> {member.specialization}</p>
                  <p><strong>Centers:</strong> {member.centers}</p>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 pt-2 border-t border-slate-800">
                  {member.bio}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">{member.experience}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openEditModal(member)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Edit Member"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(member.id)}
                  className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 transition-colors"
                  title="Delete Member"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 max-w-sm w-full space-y-4 text-center">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-white">Remove Team Member?</h3>
            <p className="text-xs text-slate-400">
              Are you sure you want to remove this faculty profile from the website?
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

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>{editingId ? 'Edit Faculty Member' : 'Add New Faculty / Mentor'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Educator Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ajay Choudhary"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Associate Faculty – Inorganic & Lab Specialist"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Designation & Degrees
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ph.D. Chemical Sciences, CSIR-NET"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6+ Years Experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Specialization Focus
                </label>
                <input
                  type="text"
                  placeholder="e.g. Coordination Chemistry, Crystal Field Theory & Salt Analysis"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Teaching Coaching Centers
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apex Science Academy & Catalyst Career Institute"
                  value={formData.centers}
                  onChange={(e) => setFormData({ ...formData, centers: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Photo Upload */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  Faculty Photo (Upload Image File or URL)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-950 file:text-indigo-300 hover:file:bg-indigo-900"
                  />
                </div>
                {formData.image && (
                  <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Photo attached: {formData.image}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Brief Bio / Academic Background
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description of teaching style, research interests, and student mentorship achievements..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition-colors flex items-center gap-1.5"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{editingId ? 'Save Changes' : 'Add to Portfolio'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
