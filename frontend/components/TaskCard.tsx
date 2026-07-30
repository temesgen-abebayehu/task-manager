'use client';

import Link from 'next/link';
import { Task, TaskStatus } from '@/lib/types';
import { deleteTask, toggleTaskComplete, updateTask } from '@/lib/api';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  onTaskChange: () => void;
}

export default function TaskCard({ task, onTaskChange }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const getStatusConfig = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TO_DO:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          dot: 'bg-gray-400',
          label: 'To Do',
          border: 'border-l-gray-400'
        };
      case TaskStatus.IN_PROGRESS:
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          dot: 'bg-blue-500',
          label: 'In Progress',
          border: 'border-l-blue-500'
        };
      case TaskStatus.DONE:
        return {
          bg: 'bg-green-50',
          text: 'text-green-700',
          dot: 'bg-green-500',
          label: 'Done',
          border: 'border-l-green-500'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          dot: 'bg-gray-400',
          label: status,
          border: 'border-l-gray-400'
        };
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${task.title}"?`)) return;

    setIsDeleting(true);
    try {
      await deleteTask(task.id);
      onTaskChange();
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  const getNextStatus = (currentStatus: TaskStatus): TaskStatus => {
    switch (currentStatus) {
      case TaskStatus.TO_DO:
        return TaskStatus.IN_PROGRESS;
      case TaskStatus.IN_PROGRESS:
        return TaskStatus.DONE;
      case TaskStatus.DONE:
        return TaskStatus.TO_DO;
      default:
        return TaskStatus.TO_DO;
    }
  };

  const handleStatusClick = async () => {
    setIsUpdating(true);
    try {
      const nextStatus = getNextStatus(task.status);
      await updateTask(task.id, { status: nextStatus });
      onTaskChange();
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task');
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE;
  const statusConfig = getStatusConfig(task.status);

  const getCheckboxIcon = () => {
    if (task.status === TaskStatus.DONE) {
      // Checkmark for Done
      return (
        <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M5 13l4 4L19 7"></path>
        </svg>
      );
    } else if (task.status === TaskStatus.IN_PROGRESS) {
      // Horizontal line/dash for In Progress
      return (
        <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M5 12h14"></path>
        </svg>
      );
    }
    // Empty for To Do
    return null;
  };

  const getCheckboxStyle = () => {
    if (task.status === TaskStatus.DONE) {
      return 'bg-green-500 border-green-500';
    } else if (task.status === TaskStatus.IN_PROGRESS) {
      return 'bg-blue-500 border-blue-500';
    }
    return 'border-gray-300 hover:border-blue-500';
  };

  return (
    <div className={`group bg-white rounded-xl border-l-4 ${statusConfig.border} shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden`}>
      <div className="p-5">
        {/* Header with Checkbox and Title */}
        <div className="flex items-start gap-3 mb-3">
          <button
            onClick={handleStatusClick}
            disabled={isUpdating}
            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border-2 transition-all ${getCheckboxStyle()} disabled:opacity-50 flex items-center justify-center`}
            title={`Click to change to ${getNextStatus(task.status).replace('_', ' ')}`}
          >
            {getCheckboxIcon()}
          </button>

          <div className="flex-1 min-w-0">
            <Link href={`/tasks/${task.id}`}>
              <h3 className={`text-base font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors line-clamp-2 ${
                task.status === TaskStatus.DONE ? 'line-through text-gray-500' : ''
              }`}>
                {task.title}
              </h3>
            </Link>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 ml-8">
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between ml-8">
          <div className="flex items-center gap-4">
            {/* Status Badge */}
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`}></span>
              {statusConfig.label}
            </div>

            {/* Due Date */}
            {task.dueDate && (
              <div className={`flex items-center gap-1 text-xs font-medium ${
                isOverdue ? 'text-red-600' : 'text-gray-500'
              }`}>
                <svg className="w-3.5 h-3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {formatDate(task.dueDate)}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={`/tasks/${task.id}`}>
              <button
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="View details"
              >
                <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </Link>
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
              title="Delete task"
            >
              <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
