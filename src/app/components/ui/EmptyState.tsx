import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#90e0ef" }}>
        <Icon className="w-8 h-8" style={{ color: "#03045e" }} />
      </div>
      <h3 className="text-lg font-semibold mb-2" style={{ color: "#03045e" }}>{title}</h3>
      {description && <p className="text-gray-500 text-sm max-w-sm mb-6">{description}</p>}
      {action && (
        <button
          onClick={action.onClick}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#0077b6" }}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
