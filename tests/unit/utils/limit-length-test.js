import limitLength from 'dummy/utils/limit-length';
import { module, test } from 'qunit';

module('Unit | Utility | limit length');

let sampleText = 'The quick fox jumps over the lazy dog';

test('dont do anything', function(assert) {
  let result = limitLength(sampleText, {limit: null});
  assert.equal(sampleText, result);

  let result2 = limitLength(sampleText, {limit: undefined});
  assert.equal(sampleText, result2);
});

test('Limit of 13 letters', function(assert) {
  let result = limitLength(sampleText, {limit: 13});
  let partialText = `${sampleText.substr(0,13)}...`;
  assert.equal(partialText, result);
});
