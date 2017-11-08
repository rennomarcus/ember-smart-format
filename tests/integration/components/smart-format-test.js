import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('smart-format', 'Integration | Component | smart format', {
  integration: true
});

test('trim spaces', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.set('spacedText', 'This       is    my      text');
  let formattedText = 'This is my text';
  this.render(hbs`{{smart-format text=spacedText}}`);
  assert.equal(this.$('div').html(), formattedText);
});

test('bold tag', function(assert) {
  this.set('boldText', 'This is **bold** text');
  let boldHtml = 'This is <b>bold</b> text';
  this.render(hbs`{{smart-format text=boldText}}`);
  assert.equal(this.$('div').html(), boldHtml);
});

test('breakline', function(assert) {
  this.set('brText', 'This is my text\n');
  let brHtml = 'This is my text<br>';
  this.render(hbs`{{smart-format text=brText}}`);
  assert.equal(this.$('div').html(), brHtml);
});

test('header tags', function(assert) {
  this.set('headerText', '#Header text');
  let headerHtml = '<h3>Header text</h3>';
  this.render(hbs`{{smart-format text=headerText}}`);
  assert.equal(this.$('div').html(), headerHtml);
});

test('table structure', function(assert) {
  this.set('table', '[table]|h1| |h2| |h3|\n' +
                    '|col11| |col12| |col13|\n' +
                    '|col21| |col22| |col23|[/table]'
  );
  let tableHtml = '<table class="table">' +
                  '<thead><tr><th>h1</th> <th>h2</th> <th>h3</th></tr></thead>' +
                  '<tbody><tr><td>col11</td> <td>col12</td> <td>col13</td></tr>' +
                  '<tr><td>col21</td> <td>col22</td> <td>col23</td></tr>' +
                  '</tbody></table>';
  this.render(hbs`{{smart-format text=table}}`);
  assert.equal(this.$('div').html(), tableHtml);
});

test('unordered tags', function(assert) {
  this.set('ulText', '[ul]*Item1\n*Item2\n[/ul]');
  let ulHtml = '<ul><li>Item1</li><li>Item2</li></ul>';
  this.render(hbs`{{smart-format text=ulText}}`);
  assert.equal(this.$('div').html(), ulHtml);
});

test('code with highlightjs', function(assert) {
  this.set('codeText', '[code python][/code]');
  let codeHtml = '<pre><code class="python hljs"></code></pre>';
  this.render(hbs`{{smart-format text=codeText}}`);
  assert.equal(this.$('div').html(), codeHtml);
});

test('inline code tags', function(assert) {
  this.set('codeText', '`print("Hello World")`');
  let codeHtml = '<code>print("Hello World")</code>';
  this.render(hbs`{{smart-format text=codeText}}`);
  assert.equal(this.$('div').html(), codeHtml);
});
