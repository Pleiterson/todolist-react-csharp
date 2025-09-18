import { useState } from "react";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import type { DeleteTaskProps } from "../../types/tasks";
import { taskService } from "../../services/taskService";

export const DeleteTask = ({ task, onDeleted }: DeleteTaskProps) => {
  const [loading, setLoading] = useState(false);

  const confirm = () => {
    confirmDialog({
      message: `Excluir a tarefa "${ task.title }"?`,
      header: "Confirmação",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Excluir",
      rejectLabel: "Cancelar",
      acceptClassName: "p-button-danger",
      accept: async () => {
        setLoading(true);
        try {
          await taskService.deleteTask(task.id);
          onDeleted(task.id);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Button
      rounded
      text
      icon="pi pi-trash"
      severity="danger"
      aria-label="Excluir"
      onClick={ confirm }
      loading={ loading }
    />
  );
};
