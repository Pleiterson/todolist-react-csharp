import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import type { CreateTaskProps, CreateTaskDTO, FormValuesCreate } from "../../types/tasks";
import { createTaskResolver, defaultValuesCreate } from "../../utils/validationTask";
import { taskService } from "../../services/taskService";
import { categories } from "../../lib/constants";
import styles from "../../styles/Tasks.module.scss";
import { useAuth } from "../../contexts/useAuth";

export const CreateTask = ({ onCreated }: CreateTaskProps) => {
  const { userId } = useAuth();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValuesCreate>({
    resolver: createTaskResolver,
    defaultValues: defaultValuesCreate,
    mode: "onChange",
  });

  const onSubmit = async (data: FormValuesCreate) => {
    setLoading(true);

    try {
      const payload: CreateTaskDTO = {
        title: data.title,
        category: data.category,
        description: data.description || "",
        isCompleted: false,
        userId: Number(userId),
      };

      const created = await taskService.createTask(payload);
      onCreated(created);
      reset();
      setVisible(false);
    } finally {
      setLoading(false);
    }
  };

  const footer = (
    <div className={ styles.footerDialog }>
      <Button label="Cancelar" className="button" onClick={ () => setVisible(false) } />
      <Button label="Criar" className="button-purple" onClick={ handleSubmit(onSubmit) } loading={ loading } />
    </div>
  );

  return (
    <>
      <Button
        label="Nova Tarefa"
        icon="pi pi-plus"
        className={ `button-yellow ${ styles.createTask }` }
        onClick={ () => setVisible(true) }
      />

      <Dialog
        header="Criar Tarefa"
        visible={ visible }
        onHide={ () => setVisible(false) }
        footer={ footer }
        style={{ width: 520 }}
      >
        <section className="form-grid">
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
                  placeholder="Selecione"
                  className={ errors.category ? "p-invalid w-full" : "w-full" }
                />
              }
            />
            { errors.category && <small className="p-error">{ errors.category.message }</small>  }
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
        </section>
      </Dialog>
    </>
  );
};
