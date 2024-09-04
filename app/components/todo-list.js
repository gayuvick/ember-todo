import Component from '@glimmer/component';
import { action } from '@ember/object';
import {service } from '@ember/service';

export default class TodoListComponent extends Component {
  @service store;

  get todos() {
    let {todos} = this.args;
    console.log(todos,"todos coming")
    if(todos){
        todos = todos
        .map((task) => {
            console.log(task.com)
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            const formattedDueDate = new Date(task.dueDate).toLocaleDateString('en-US', options);
            return {
                id: task.id,
                description: task.description,
                completed: task.completed,
                dueDate: formattedDueDate,
              };
          });
     
    }
    return todos;
  }

  @action
  async completeTask(todo) {
    console.log("some error in findRecord from store" , todo.id)

 let storeData  = await this.store.request(query,{'task':todo.id}) 
 console.log(storeData.constructor.name , "some model name");
    storeData.completed = true;
    storeData.save();
  }

  @action
  async deleteTask(todo) {
    if (confirm('Are you sure you want to delete this task?')) {
        let storeData  = await this.store.findRecord('task', todo.id) 
      storeData.destroyRecord();
    }
  }
}

