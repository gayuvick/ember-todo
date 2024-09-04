import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import {service } from '@ember/service';

export default class TodoInputComponent extends Component {
  @service store;
  @tracked title = '';
  @tracked dueDate = '';
  @tracked isCompleted = false;
 
  @action
   async submitForm(event) {
    event.preventDefault();

    let newTask = this.store.createRecord('task', {
        description: this.title,
        dueDate: this.dueDate,
        completed: false,
      });
  
      // Save the new task
      await newTask.save();

      this.taskTitle = '';
      this.dueDate = '';
  }

}

