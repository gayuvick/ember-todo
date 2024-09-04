import Component from '@glimmer/component';
import { action } from '@ember/object';
import {service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import ENV from 'todo-app/config/environment';
import { findRecord , updateRecord , deleteRecord  } from '@ember-data/json-api/request';

export default class TodoListComponent extends Component {
  // @service store;
@tracked todos = this.fetchTodos(this.args.todos);

@action
  fetchTodos(todos) {
  //  this.todos = this.args;

//  let {todos} = this.args;
   
    if(todos){
        // console.log("all todos created till now" , todos.length , todos)
        todos = todos
        .map((task) => {
          
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            // const formattedDueDate = new Date(task.attributes.dueDate).toLocaleDateString('en-US', options);
            return {
                id: task.id,
                description: task.attributes.description,
                completed: task.attributes.completed,
                dueDate: task.attributes.dueDate,
              };
          });
     
    }
    return todos;
  }
  

  @action
  async completeTask(todo) {

    // this.store.findRecord('tasks' , todo.id)

    // const { content } = await this.store.request(
    //     findRecord('tasks', "1"),
    //   );
    //   console.log(content , )
    // // content.data.completed = true;
    // // content.data.save();

    try {
      const updatedTask = {
        id:todo.id,
        type:'task',
        attributes: {
          ...todo,
          completed: true, // Mark the task as completed
        }
      };

      const response = await fetch(`${ENV.apiHost}/api/tasks/${todo.id}`, {
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
      this.todos = this.fetchTodos(result.data);

      // console.log(this.todos,"todod after setting valur")

    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  @action
  async deleteTask(todo) {
    // if (confirm('Are you sure you want to delete this task?')) {
    //    await this.store.deleteRecord('task' , todo.id);
    // }

    if (confirm('Are you sure you want to delete this task?')) {
      try {
        const response = await fetch(`${ENV.apiHost}/api/tasks/${todo.id}`, {
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
        this.todos = this.todos.filter(task => task.id !== todo.id);

      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  
  }
}

