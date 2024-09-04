import Route from '@ember/routing/route';
import { query } from '@ember-data/json-api/request';
import { service } from '@ember/service';
import ENV from 'todo-app/config/environment';

export default class AllTasksRoute extends Route {
  @service store;
  async model() {
    // const {content} =  await this.store.request(query('task'));
    // const content = await this.store.findAll('task');
    // return content.data;
// console.log("evn variable" , ENV.apiHost)
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
  
      let tasks = await response.json();
      // console.log('Fetched tasks successfully:', tasks.data);
      return tasks.data;
     
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
}