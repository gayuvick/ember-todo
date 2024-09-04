import Model, { attr } from '@ember-data/model';

export default class TaskModel extends Model {
  @attr('string') description;
  @attr('string') dueDate;
  @attr('boolean', { defaultValue: false }) completed;
}
