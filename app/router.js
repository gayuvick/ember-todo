import EmberRouter from '@ember/routing/router';
import config from 'todo-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('add-task');
  this.route('pending-tasks');
});
