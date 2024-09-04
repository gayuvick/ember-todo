import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service} from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'todo-app/config/environment';

export default class PendingTaskComponent extends Component {
  // @service store;

  @tracked tasks=this.fetchTasks(this.args.tasks);

  @action
  fetchTasks(tasks) {
    // let {tasks} = this.args;
    // console.log("tasks in pending :" , tasks);
    if(tasks){
        tasks = tasks
        .filter((task)=> task.attributes.completed==false)
        .map((task) => {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const formattedDueDate = new Date(task.attributes.dueDate).toLocaleDateString('en-US', options);
            return {
                id: task.id,
                description: task.attributes.description,
                isCompleted: task.attributes.completed,
                dueDate: formattedDueDate,
              };
          });
     
    }
    // console.log("tasks to be used" , tasks)
    return tasks;
  }

  @action
  async completeTask(task) {
    try {
      const updatedTask = {
        id:task.id,
        type:'task',
        attributes: {
          ...task,
          completed: true, // Mark the task as completed
        }
      };

      const response = await fetch(`${ENV.apiHost}/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const result = await response.json();
      // console.log('Task updated successfully:', result.data);
      // console.log("todos before seting" , this.todos)
      // Optionally update the local state to reflect the change
      this.tasks = this.fetchTasks(result.data);

      // console.log(this.todos,"todod after setting valur")

    } catch (error) {
      console.error('Error updating task:', error);
    }
  }
    
    // task.isCompleted = true;
    // task.save();
  

  @action
  async deleteTask(task) {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`${ENV.apiHost}/api/tasks/${task.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete task');
        }

        // console.log('Task deleted successfully');

        // Optionally update the local state to remove the deleted task
        this.tasks= this.tasks.filter(task => task.id !== task.id);

      } catch (error) {
        console.error('Error deleting task:', error);
      }
    
  
  }
  }
}
