import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, RefreshCw, Plus, Loader2 } from 'lucide-react';

const RescheduleModal = ({ project, onClose, onReschedule }) => {
  const [formData, setFormData] = useState({
    title: project.title,
    description: project.description,
    tech_stack: [...project.tech_stack],
    deadline: project.deadline?.split('T')[0] || '',
  });
  const [newTech, setNewTech] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTech = () => {
    const trimmed = newTech.trim();
    if (trimmed && !formData.tech_stack.includes(trimmed)) {
      setFormData({ ...formData, tech_stack: [...formData.tech_stack, trimmed] });
      setNewTech('');
    }
  };

  const removeTech = (tech) => {
    setFormData({ ...formData, tech_stack: formData.tech_stack.filter(t => t !== tech) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onReschedule(formData);
    } catch (err) {
      setError('Failed to reschedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-brand-surface-dark rounded-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-brand-muted/20 dark:border-brand-muted/10 shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-brand-dark dark:text-brand-light">Edit & Reschedule</h2>
              <p className="text-sm text-brand-muted mt-1">Modify your project details and AI will regenerate the roadmap</p>
            </div>
            <button 
              onClick={onClose} 
              disabled={loading}
              className="text-brand-muted hover:text-brand-dark dark:hover:text-brand-light transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-1.5">
                Project Title
              </label>
              <input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-muted/30 dark:border-brand-muted/15 bg-brand-light/50 dark:bg-brand-card-dark focus:ring-2 focus:ring-brand-accent outline-none text-brand-dark dark:text-brand-light transition-all disabled:opacity-50"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-1.5">
                Description
              </label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                disabled={loading}
                placeholder="Describe your project features, goals, and scope..."
                className="w-full px-4 py-2.5 rounded-xl border border-brand-muted/30 dark:border-brand-muted/15 bg-brand-light/50 dark:bg-brand-card-dark focus:ring-2 focus:ring-brand-accent outline-none text-brand-dark dark:text-brand-light transition-all resize-none disabled:opacity-50"
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-1.5">
                Tech Stack
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tech_stack.map(tech => (
                  <span 
                    key={tech} 
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-accent/15 text-brand-accent text-sm font-medium"
                  >
                    {tech}
                    {!loading && (
                      <button 
                        type="button" 
                        onClick={() => removeTech(tech)} 
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
                  placeholder="Add technology..."
                  disabled={loading}
                  className="flex-1 px-4 py-2 rounded-xl border border-brand-muted/30 dark:border-brand-muted/15 bg-brand-light/50 dark:bg-brand-card-dark focus:ring-2 focus:ring-brand-accent outline-none text-brand-dark dark:text-brand-light text-sm transition-all disabled:opacity-50"
                />
                <button 
                  type="button" 
                  onClick={addTech} 
                  disabled={loading}
                  className="px-3 py-2 rounded-xl bg-brand-accent/15 text-brand-accent hover:bg-brand-accent/25 transition-colors disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-1.5">
                New Deadline
              </label>
              <input 
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-muted/30 dark:border-brand-muted/15 bg-brand-light/50 dark:bg-brand-card-dark focus:ring-2 focus:ring-brand-accent outline-none text-brand-dark dark:text-brand-light transition-all disabled:opacity-50"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm font-medium bg-red-50 dark:bg-red-500/10 px-4 py-2 rounded-xl">
                {error}
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl border border-brand-muted/30 dark:border-brand-muted/15 text-brand-dark dark:text-brand-light font-medium hover:bg-brand-light/50 dark:hover:bg-brand-card-dark transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-brand-accent text-white font-semibold hover:bg-brand-accent/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AI Rescheduling...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    Reschedule
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Loading hint */}
          {loading && (
            <p className="text-center text-sm text-brand-muted mt-4 animate-pulse">
              AI is regenerating your roadmap. This may take a moment...
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default RescheduleModal;
