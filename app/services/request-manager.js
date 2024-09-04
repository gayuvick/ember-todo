// app/services/request-manager.js
import BaseRequestManager from '@ember-data/request';
import Fetch from '@ember-data/request/fetch';
import { BaseUrlHandler } from 'todo-app/utils/handlers'; // Adjust the import path as needed

export default class RequestManager extends BaseRequestManager {
  constructor(...args) {
    super(...args);
    this.use([BaseUrlHandler, Fetch]);
  }
}
