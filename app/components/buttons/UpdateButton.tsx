// components/buttons/UpdateButton.tsx
"use client";

import { useRouter } from "next/navigation";

export function UpdateButton({ task }: { task: any }) {
  const router = useRouter();

  const handleToggle = async () => {
    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          is_done: !task.is_done 
        }),
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
    >
      {task.is_done ? "Undo" : "Done"}
    </button>
  );
}