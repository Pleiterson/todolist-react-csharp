import { useEffect, useMemo, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { taskService } from "../../services/taskService";
import type { Task } from "../../types/tasks";
import { CategorizeTask, CreateTask, DeleteTask, EditTask } from "../../components";
import styles from "../../styles/Home.module.scss";
import { useAuth } from "../../contexts/useAuth";

export const HomePage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { userId } = useAuth();
  
  const categories = useMemo(() => ["Trabalho", "Pessoal", "Estudos", "Saúde", "Outros"], []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks({
        userId: Number(userId),
        category: categoryFilter ?? undefined,
      });
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return tasks;

    return tasks.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  }, [tasks, search]);

  return (
    <main className={ styles.page }>
      <section className={ styles.pageHeader }>
        <h1>Minhas Tarefas</h1>

        <aside className={ styles.actions }>
          <CreateTask
            onCreated={ (t) => { setTasks(prev => [t, ...prev]); }}
          />

          <InputText
            placeholder="Buscar Tarefas..."
            value={ search }
            onChange={ (e) => setSearch(e.target.value) }
          />

          <Dropdown
            value= { categoryFilter }
            onChange={ (e) => setCategoryFilter(e.value) }
            options={ [{ label: "Todas", value: null }, ...categories.map(c => ({ label: c, value: c }))] }
            placeholder="Categoria"
          />

          <Button icon="pi pi-refresh" className={ styles.updateTable } onClick={ fetchTasks } />
        </aside>
      </section>

      <DataTable
        paginator
        removableSort
        scrollable
        value={ filtered }
        loading={ loading }
        rows={ 10 }
        sortOrder={ 1 }
        className={ styles.table }
        sortField="id"
        emptyMessage="Nenhuma tarefa encontrada."
      >
        <Column
          sortable
          field="id"
          header="ID"
          style={{ width: '5rem', textAlign: 'center' }}
          headerStyle={{ textAlign: 'center', color: 'var(--color-three)' }}
        />
        <Column
          sortable
          field="title"
          header="Título"
          headerStyle={{ textAlign: 'center', color: 'var(--color-three)' }}
        />
        <Column
          sortable
          field="description"
          header="Descrição"
          headerStyle={{ textAlign: 'center', color: 'var(--color-three)' }}
        />
        <Column
          sortable
          field="category"
          header="Categoria"
          headerStyle={{ textAlign: 'center', color: 'var(--color-three)' }}
        />
        <Column
          field="isCompleted"
          header="Concluída?"
          headerStyle={{ textAlign: 'center', color: 'var(--color-three)' }}
          body={ (row: Task) => (
            <Tag value={ row.isCompleted ? "Sim" : "Não" } severity={ row.isCompleted ? "success" : "warning" } />
          ) }
        />
        <Column
          header="Ações"
          headerStyle={{ textAlign: 'center', color: 'var(--color-three)' }}
          body={ (row: Task) => (
            <div className={ styles.actionsButtons }>
              <Button
                rounded
                text
                icon={ row.isCompleted ? "pi pi-undo" : "pi pi-check" }
                severity={ row.isCompleted ? "secondary" : "success" }
                onClick={ async () => {
                  const updated = await taskService.updateTask(row.id, {
                    ...row,
                    isCompleted: !row.isCompleted,
                  });
                  setTasks(prev => prev.map(t => (t.id === row.id ? updated : t)));
                }}
                aria-label="Alternar conclusão"
              />

              <EditTask
                task={ row }
                onUpdated={ (u) => setTasks(prev => prev.map(t => (t.id === u.id ? u : t))) }
              />

              <CategorizeTask
                task={ row }
                onUpdated={ (u) => setTasks(prev => prev.map(t => (t.id === u.id ? u : t))) }
              />

              <DeleteTask
                task={ row }
                onDeleted={ (id) => setTasks(prev => prev.filter(t => t.id !== id)) }
              />
            </div>
          ) }
        />
      </DataTable>
    </main>
  );
};
