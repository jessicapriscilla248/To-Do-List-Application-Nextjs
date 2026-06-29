'use client';
import useSWR from 'swr';
import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Task } from '@prisma/client';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { data: tasks, mutate } = useSWR('/api/tasks', fetcher);

    // sorting pakai urutan pending, complete, delete
    // delete paling bawah, complete tengah, pending paling atas
    const sortedTasks = tasks?.sort((a: any, b: any) => {
        const getPriority = (task: any) => {
            if (task.deletedAt){
                return 3; //deleted
            }
            if (task.isCompleted){
                return 2; //completed
            }

            return 1; //pending
        };

        return getPriority(a) - getPriority(b);
    }) || [];

    // create handle
    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        
        setTitle('');
        setDescription('');
        mutate();
    };

    // update handle
    const handleUpdate = async (id: number, currentStatus: boolean) => {
        await fetch(`/api/tasks/?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isCompleted: !currentStatus })
        });
        mutate();
    };

    // delete handle
    const handleDelete = async (id: number) => {
        if (!confirm('Delete this task?')) return;
        await fetch(`/api/tasks/?id=${id}`, { method: 'DELETE' });
        mutate();
    };

    if (!tasks) return <div className="p-10">Loading...</div>;

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center">To-Do List Application</h1>
                
                {/* create task, masukkan title dan description */}
                <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {/* textblock title */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Task Title..."
                                required
                            />
                        </div>

                        {/* textblock description */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="Task Description..."
                            />
                        </div>

                        {/* button add task */}
                        <div>
                            <label className="block text-sm font-bold mb-2">Add Task</label>
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                                Add 
                            </button>
                        </div>
                    </div>
                </form>

                {/* Tabel untuk tampilkan semua data task */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="w-full text-sm text-center">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-center">ID</th>
                                <th className="py-3 px-6 text-center">Title</th>
                                <th className="py-3 px-6 text-center">Description</th>
                                <th className="py-3 px-6 text-center">Status</th>
                                <th className="py-3 px-6 text-center">Created At</th>
                                <th className="py-3 px-6 text-center">Deleted At</th>
                                <th className="py-3 px-6 text-center">Updated At</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* pakai task yang udah diurutkan */}
                            {sortedTasks.map((task: Task, index: number) => (
                                // background baris berubah warna kalau:
                                // 1. Delete, merah
                                // 2. Complete, hijau
                                <tr key={task.id} className={`border-b ${task.deletedAt ? 'bg-red-50' : ''} ${task.isCompleted ? 'bg-green-50' : ''}`}>
                                    {/* isi ID task */}
                                    <td className="py-3 px-6">
                                        <span className={task.deletedAt ? 'text-red-600' : ''}>
                                            {/* kalau di delete merah */}
                                           {index+1}
                                        </span>
                                    </td>
                                    {/* isi Title task */}
                                    <td className="py-3 px-6 text-left">
                                        <span className={`font-medium ${task.isCompleted ? 'line-through' : ''} ${task.deletedAt ? 'text-red-600' : ''}`}>
                                            {/* kalau complete dicoret */}
                                            {task.title}
                                        </span>
                                    </td>
                                    {/* isi Description task */}
                                    <td className="py-3 px-6 text-justify">
                                        <span className={task.deletedAt ? 'text-red-600' : ''}>
                                            {/* kalau gada description isi strip */}
                                            {task.description || '-'}
                                        </span>
                                    </td>
                                    {/* isi isCompleted task */}
                                    <td className="py-3 px-2">
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                            task.deletedAt 
                                                ? 'bg-red-100 text-red-800' 
                                                : task.isCompleted 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {task.deletedAt ? 'Deleted' : task.isCompleted ? 'Completed' : 'Pending'}
                                        </span>
                                    </td>
                                    {/* isi createdAt task*/}
                                    <td className="py-3 px-6">
                                        {formatDate(task.createdAt)}
                                    </td>
                                    {/* isi deletedAt task */}
                                    <td className="py-3 px-6">
                                        {task.deletedAt ? formatDate(task.deletedAt) : '-'}
                                    </td>
                                    {/* isi updatedAt task */}
                                    <td className="py-3 px-6">
                                        {task.updatedAt ? formatDate(task.updatedAt) : '-'}
                                    </td>
                                    {/* pilih action mau update/delete */}
                                    <td className="text-center">
                                        <div className="text-center">
                                            {/* kalo belum di delete */}
                                            {!task.deletedAt ? (
                                                <>
                                                    <div className='px-3 grid grid-cols-2 gap-4'>
                                                        {/* button status */}
                                                        <button
                                                            onClick={() => handleUpdate(task.id, task.isCompleted)}
                                                            className={`w-full px-3 py-1 mb-4 text-sm rounded ${
                                                            task.isCompleted 
                                                                // kalau undo, kuning
                                                                ? 'bg-yellow-400 text-white hover:bg-yellow-500' 
                                                                // kalau complete, hijau
                                                                : 'bg-green-400 text-white hover:bg-green-500'
                                                            }`}>
                                                            {task.isCompleted ? 'Undo':'Complete'}
                                                        </button>

                                                        {/* button delete*/}
                                                        <button
                                                            onClick={() => handleDelete(task.id)}
                                                            className="w-full px-3 py-1 mb-4 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                                                            Delete
                                                    </button>
                                                    </div>
                                                </>
                                            ) : (
                                                // kalau udah di delete gausah tampilin button lagi
                                                <div className='text-center'>
                                                    <span className="text-red-500 text-sm text-center">Deleted</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}