// components/buttons/DeleteButton.tsx
"use client";

import { useRouter } from "next/navigation";

export function DeleteButton({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Delete
    </button>
  );
}