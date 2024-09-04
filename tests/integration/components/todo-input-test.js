import { module, test } from 'qunit';
import { setupRenderingTest } from 'todo-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | todo-input', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<TodoInput />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <TodoInput>
        template block text
      </TodoInput>
    `);

    assert.dom().hasText('template block text');
  });
});
