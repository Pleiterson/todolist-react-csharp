import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { ToggleButton } from "primereact/togglebutton";
import type { EditTaskProps, FormValuesUpdate, UpdateTaskDTO } from "../../types/tasks";
import { updateTaskResolver } from "../../utils/validationTask";
import { taskService } from "../../services/taskService";
import { categories } from "../../lib/constants";
import styles from "../../styles/Tasks.module.scss";

export const EditTask = ({ task, onUpdated }: EditTaskProps) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValuesUpdate>({
    resolver: updateTaskResolver,
    defaultValues: {
      title: task.title,
      category: task.category,
      description: task.description,
      isCompleted: task.isCompleted,
    },
  });

  const onSubmit = async (data: FormValuesUpdate) => {
    setLoading(true);
    try {
      const payload: UpdateTaskDTO = {
        title: data.title,
        category: data.category,
        description: data.description,
        isCompleted: data.isCompleted,
      };
      const updated = await taskService.updateTask(task.id, payload);
      onUpdated(updated);
      setVisible(false);
      reset(updated);
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <div className={ styles.footerDialog }>
      <Button label="Cancelar" className="button" onClick={ () => setVisible(false) } />
      <Button label="Salvar" className="button-purple" onClick={ handleSubmit(onSubmit) } loading={ loading } />
    </div>
  );

  return (
    <>
      <Button rounded text icon="pi pi-pencil" aria-label="Editar" onClick={ () => setVisible(true) } />

      <Dialog
        header="Editar Tarefa"
        visible={ visible }
        onHide={ () => setVisible(false) }
        footer={ footer }
        style={{ width: 520 }}
      >
        <div className="form-grid">
          <div className="field">
            <label htmlFor="title">Título</label>
            <Controller
              control={ control }
              name="title"
              render={ ({ field }) =>
                <InputText
                  id="title"
                  { ...field }
                  className={ errors.title ? "p-invalid w-full" : "w-full" }
                />
              }
            />
            { errors.title && <small className="p-error">{ errors.title.message }</small> }
          </div>

          <div className="field">
            <label htmlFor="category">Categoria</label>
            <Controller
              control={ control }
              name="category"
              render={ ({ field }) =>
                <Dropdown
                  id="category"
                  options={ categories }
                  { ...field }
                  className={ errors.category ? "p-invalid w-full" : "w-full" }
                />
              }
            />
            { errors.category && <small className="p-error">{ errors.category.message }</small> }
          </div>

          <div className="field">
            <label htmlFor="description">Descrição</label>
            <Controller
              control={ control }
              name="description"
              render={ ({ field }) =>
                <InputTextarea
                  id="description"
                  rows={ 3 }
                  { ...field }
                  className="w-full"
                />
              }
            />
          </div>

          <div className="field">
            <label>Concluída</label>
            <Controller
              control={ control }
              name="isCompleted"
              render={ ({ field }) =>
                <ToggleButton
                  checked={ field.value }
                  onChange={ (e) => field.onChange(e.value) }
                  onLabel="Sim"
                  offLabel="Não"
                />
              }
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
