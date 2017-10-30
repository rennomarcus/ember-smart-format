import Component from '@ember/component';
import {getOwner} from '@ember/application';
import {htmlSafe} from '@ember/string';
import {computed} from '@ember/object';
import layout from '../templates/components/smart-format';
import limitLength from '../utils/limit-length';
import Ember from 'ember';
import hljs from 'highlight';
// TODO: import Handlebars from "handlebars";

export default Component.extend({
  layout,

  media: '/',

  init() {
    this._super(...arguments);
    const appConfig = getOwner(this).resolveRegistration('config:environment');
    const addonConfig = appConfig.smartFormat || {};
    if ('media' in addonConfig) {
      this.set('media', addonConfig.media);
    }
  },

  makeTable(match,p1) {
    let lines = p1.split('\n');
    let total = lines.length;
    let tableStr = '<table class="table"><thead>';
    for (let i = 0; i < total; i++) {
      if (i === 1) {
        tableStr += '</thead><tbody>';
      }

      tableStr += '<tr>';

      let currentRow;
      if (i > 0) {
        currentRow = lines[i].replace(/\|(.+?)\|/g, '<td>$1</td>');
      } else {
        currentRow = lines[i].replace(/\|(.+?)\|/g, '<th>$1</th>');
      }

      tableStr += `${currentRow}</tr>`;
    }
    tableStr = tableStr.replace(/(?:\r\n|\r|\n)/g,"");

    return `${tableStr}</tbody></table>`;
  },

  formatted: computed('text', function() {
    let rawText = this.get('text');
    rawText = limitLength(rawText, {limit: this.get('limit')});

    // remove unecessary spaces
    let textSpaced = rawText.replace(/[ ]+/g, ' ');
    // remove potential malicious code
    let safeString = Ember.Handlebars.Utils.escapeExpression(textSpaced);
    // make table
    let formattedText = safeString.replace(/\[table\]((.|\s)+?)\[\/table\]/g, this.makeTable);
    // remove \n after [/code]
    formattedText = formattedText.replace(/\[\/code\](\r\n|\r|\n)?/g, '[/code]');

    // add img caption
    // group1 - match label|link inside brackets
    // group2 - match link inside brackets
    formattedText = formattedText.replace(/\[caption (.+?)\](\r\n|\r|\n)/g ,'<figcaption class="figure-caption">$1</figcaption>');

    // replace '#' and wrap the content of the line into a header tag - <h3>
    // group1 - match initial # or \n# which means a line starting with #
    // group2 - any character besides line terminator (\n)
    formattedText = formattedText.replace(/(^|\n)#(.+)/g,"<h3>$2</h3>");

    // replace \n to break lines tags - <br>
    formattedText = formattedText.replace(/(?:\r\n|\r|\n)/g, "<br>");

    // add bold text around **
    formattedText = formattedText.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");

    // add list tags
    formattedText = formattedText.replace(/\[(ul|ol)\]/g,"<$1>");
    formattedText = formattedText.replace(/\[\/(ul|ol)\]/g,"</$1>");
    formattedText = formattedText.replace(/\s?\*(.+?)<br>/g,"<li>$1</li>");

    // add img tags
    // group1 - match label|link inside brackets
    // group2 - match link inside brackets
    let media = this.get('media') || "";
    formattedText = formattedText.replace(/\[img (.+?)\]/g ,`<img src="${media}$1" class="img">`);
    formattedText = formattedText.replace(/\[outimg (.+?)\]/g ,`<img src="$1" class="img">`);

    // add link tags
    // group1 - match label|link inside brackets
    // group2 - match link inside brackets
    formattedText = formattedText.replace(/\[link (.+?)\|(.+?)\]/g ,`<a href="$2">$1</a>`);

    // add code tag and style to use highlight.js
    formattedText = formattedText.replace(/\[code (.+?)\]/g ,`<pre><code class="$1">`);
    formattedText = formattedText.replace(/\[\/code\]/g ,`</code></pre>`);

    // formattedText = formattedText.replace(/`(.+?)`/g ,`<code>$1</code>`);
    if (formattedText.substr(0,4) === "<br>") {
      formattedText = formattedText.substr(4, formattedText.length);
    }

    return htmlSafe(formattedText);
  }),

  didRender() {
    this._super(...arguments);
    hljs.initHighlighting.called = false;
    hljs.initHighlighting();
  }
});
