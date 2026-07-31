'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { TaskStatus, CreateTaskInput, UpdateTaskInput } from '@/lib/types';
import { createTask, updateTask } from '@/lib/api';

interface TaskFormProps {
  initialValues?: UpdateTaskInput & { id?: string };
  mode?: 'create' | 'edit';
}

export default function TaskForm({
  initialValues,
  mode = 'create',
}: TaskFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: initialValues?.title || '',
    description: initialValues?.description || '',
    status: initialValues?.status || TaskStatus.TO_DO,
    dueDate: initialValues?.dueDate
      ? new Date(initialValues.dueDate).toISOString().split('T')[0]
      : '',
  });

  const [errors, setErrors] = useState({
    title: '',
  });

  const validateForm = (): boolean => {
    const newErrors = {
      title: '',
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 1) {
      newErrors.title = 'Title must not be empty';
    }

    setErrors(newErrors);
    return !newErrors.title;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const taskData: CreateTaskInput | UpdateTaskInput = {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        status: formData.status,
        dueDate: formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : undefined,
      };

      if (mode === 'edit' && initialValues?.id) {
        await updateTask(initialValues.id, taskData as UpdateTaskInput);
        router.push(`/tasks/${initialValues.id}`);
      } else {
        await createTask(taskData as CreateTaskInput);
        router.push('/tasks');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save task');
      console.error('Error saving task:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (mode === 'edit' && initialValues?.id) {
      router.push(`/tasks/${initialValues.id}`);
    } else {
      router.push('/tasks');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter task title"
          disabled={loading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={5}
          className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
          placeholder="Add a more detailed description (optional)"
          disabled={loading}
        />
      </div>

      {/* Status */}
      <div>
        <label
          htmlFor="status"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) =>
            setFormData({ ...formData, status: e.target.value as TaskStatus })
          }
          className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          disabled={loading}
        >
          <option value={TaskStatus.TO_DO}>To Do</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.DONE}>Done</option>
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-semibold text-gray-900 mb-2"
        >
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={formData.dueDate}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          disabled={loading}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : mode === 'edit' ? 'Update Task' : 'Create Task'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
