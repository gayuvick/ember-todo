// app/serializers/task.js
import JSONSerializer from '@ember-data/serializer/json';

export default class TaskSerializer extends JSONSerializer {

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    console.log('normalizeArrayResponse - payload:', payload);
    // Ensure the payload has tasks in the expected format
    if (Array.isArray(payload.tasks)) {
      payload = {
        tasks: payload.tasks.map(task => this._normalizeTask(task))
      };
    } else {
      throw new Error('Expected payload to contain an array of tasks');
    }
    return super.normalizeArrayResponse(store, primaryModelClass, payload, id, requestType);
  }

  _normalizeTask(task) {
    // Ensure ID is at the top level of the task object and not nested
    const normalizedTask = {
      id: task.id,
      type: 'task',
      attributes: {
        description: task.description,
        dueDate: task.dueDate,
        completed: task.completed
      }
    };
    console.log('_normalizeTask - normalized task:', normalizedTask);
    return normalizedTask;
  }

}
