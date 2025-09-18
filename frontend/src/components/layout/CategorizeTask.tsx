import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import type { CategorizeTaskProps } from "../../types/tasks";
import { taskService } from "../../services/taskService";
import { categories } from "../../lib/constants";
import styles from "../../styles/Tasks.module.scss";

export const CategorizeTask = ({ task, onUpdated }: CategorizeTaskProps) => {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState(task.category);
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setLoading(true);
    try {
      const updated = await taskService.updateTask(task.id, { ...task, category });
      onUpdated(updated);
      setVisible(false);
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <div className={ styles.footerDialog }>
      <Button label="Cancelar" className="button" onClick={ () => setVisible(false) } />
      <Button label="Salvar" className="button-purple" onClick={ onSave } loading={ loading } />
    </div>
  );

  return (
    <>
      <Button rounded text icon="pi pi-tags" aria-label="Categorizar"onClick={ () => setVisible(true) } />

      <Dialog
        header="Alterar Categoria"
        visible={ visible }
        onHide={ () => setVisible(false) }
        footer={ footer }
        style={{ width: 420 }}
      >
        <Dropdown
          value={ category }
          options={ categories }
          onChange={ (e) => setCategory(e.value) }
          className="w-full"
          placeholder="Selecione"
        />
      </Dialog>
    </>
  );
};
