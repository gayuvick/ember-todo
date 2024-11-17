import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import ENV from 'todo-app/config/environment';
import { createRecord } from '@ember-data/json-api/request';

export default class TodoInputComponent extends Component {
  @service store;

  @tracked description = '';
  @tracked dueDate = '';
  @tracked completed = false;

  async loadTasks() {
    this.tasks = await this.store.findAll('task');
  }

  @action
  updateDescription(event) {
    this.description = event.target.value;
  }

  @action
  updateDueDate(event) {
    this.dueDate = event.target.value;
  }
  @action
  submitForm(event) {
    event.preventDefault();
    this.addTask(this.description, this.dueDate, this.completed);
  }
  @action
  async addTask(description, dueDate, completed) {
    // const id = Date.now().toString();
    let newTask = this.store.createRecord('task', {
      description,
      dueDate,
      completed,
    });
    await newTask.save();
    this.description = '';
    this.dueDate = '';
    this.completed = false;
    this.loadTasks();
  }

  // @tracked description = '';
  // @tracked dueDate = '';
  // @tracked completed = false;

  // @action
  // async submitForm(event) {
  //   event.preventDefault();
  //   // console.log("checking title and description here first in local" , this.description)

  //   // let newTask = this.store.createRecord('task', {

  //   //     type:'task',
  //   //     attributes:{
  //   //     description: this.description,
  //   //     dueDate: this.dueDate,
  //   //     completed: false}
  //   //   })

  //   //   // Save the new task
  //   //    newTask.save();

  //   //   console.log("new task after  creation" , newTask)

  //   //   this.taskTitle = '';
  //   //   this.dueDate = '';

  //   const taskData = {
  //     type: 'task',
  //     attributes: {
  //       description: this.description,
  //       dueDate: this.dueDate,
  //       completed: this.completed,
  //     },
  //   };
  //   try {
  //     // console.log("url" , apiHost);
  //     const response = await fetch(`${ENV.apiHost}/api/tasks`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(taskData),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to create task');
  //     }

  //     const result = await response.json();
  //     alert('Task created successfully');
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }

  //   this.description = '';
  //   this.dueDate = '';
  // }
}
