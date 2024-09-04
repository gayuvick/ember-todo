import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service} from '@ember/service';

export default class PendingTaskComponent extends Component {
  @service store;

  get tasks() {
    let {tasks} = this.args;
    if(tasks){
        tasks = tasks
        .filter((task)=> task.completed==false)
        .map((task) => {
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const formattedDueDate = new Date(task.dueDate).toLocaleDateString('en-US', options);
            return {
                id: task.id,
                description: task.description,
                isCompleted: task.completed,
                dueDate: formattedDueDate,
              };
          });
     
    }
    return tasks;
  }

  @action
  completeTask(task) {
    task.isCompleted = true;
    task.save();
  }

  @action
  deleteTask(task) {
    if (confirm('Are you sure you want to delete this task?')) {
      task.destroyRecord();
    }
  }
}
