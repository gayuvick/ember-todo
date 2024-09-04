import Route from '@ember/routing/route';
import { query } from '@ember-data/json-api/request';
import { service } from '@ember/service';
import ENV from 'todo-app/config/environment';

export default class TasksRoute extends Route {
  @service store;
  async model() {
    // const {content} =  await this.store.request(query('task'));
    // console.log("coming into model for request" , content.data)
    // return content.data;

    try {
      const response = await fetch(`${ENV.apiHost}/api/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
  
      const tasks = await response.json();
      // console.log('Fetched tasks successfully:', tasks.length);
      return tasks.data;
     
  
    } catch (error) {
      console.error('Error:', error);
    }
  
  }
}
