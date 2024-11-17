// app/adapters/application.js
import JSONAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAdapter {
  host = 'http://localhost:3000';
}