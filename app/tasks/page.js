import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export const dynamic = 'force-dynamic';

const TasksPage = () => {
  return (
    <div className="max-w-lg">
      <TaskForm />
      <TaskList />
    </div>
  );
};
export default TasksPage;
