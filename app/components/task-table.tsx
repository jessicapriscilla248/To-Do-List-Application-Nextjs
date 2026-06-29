// components/TaskTable.tsx
import { formatDate } from "@/lib/utils";
import { UpdateButton } from "./buttons";
import { DeleteButton } from "./buttons";

async function getTasks() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tasks`, {
      cache: 'no-store', // untuk data real-time
    });
    
    if (!res.ok) throw new Error("Failed to fetch tasks");
    
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
}

export default async function TaskTable() {
  const tasks = await getTasks();

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-6">#</th>
            <th className="py-3 px-6">Title</th>
            <th className="py-3 px-6">Description</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Created At</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any, index: number) => (
            <tr key={task.id} className="bg-white border-b">
              <td className="py-3 px-6">{index + 1}</td>
              <td className="py-3 px-6 font-medium text-gray-900">
                {task.title}
              </td>
              <td className="py-3 px-6">{task.description || "-"}</td>
              <td className="py-3 px-6">
                <span className={`px-2 py-1 rounded text-xs ${
                  task.is_done 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {task.is_done ? "Done" : "Pending"}
                </span>
              </td>
              <td className="py-3 px-6">
                {formatDate(task.created_at)}
              </td>
              <td className="flex justify-center gap-1 py-3">
                <UpdateButton task={task.id} />
                <DeleteButton id={task.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}