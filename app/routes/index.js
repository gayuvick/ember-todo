import Route from '@ember/routing/route';
import { query } from '@ember-data/json-api/request';
import { service } from '@ember/service';

export default class AllTasksRoute extends Route {
  @service store;
  async model() {
    const {content} =  await this.store.request(query('task'));
    console.log("data ", content.data);
    return content.data;
  }
}