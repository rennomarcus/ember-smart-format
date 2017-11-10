# ember-smart-format
[![Build Status](https://travis-ci.org/rennomarcus/ember-smart-format.svg?branch=master)](https://travis-ci.org/rennomarcus/ember-smart-format)

Ember addon to convert parts of your text that are using smart tags to valid
html blocks.

## Installation

`ember install ember-smart-format`

## Usage

`{{smart-format text='The quick fox **jumps** over the lazy dog'}}`

Output: The quick fox **jumps** over the lazy dog

Simple tags:

| Syntax  | Output |
| ------------- | ------------- |
| \*\*text\*\*  | &lt;b&gt;text&lt;/b&gt;  |
| \#text  | &lt;h3&gt;text&lt;/h3&gt;  |
| [code language]my code[/code]  | &lt;pre&gt;&lt;code class="language"&gt;my code&lt;/code&gt;&lt;/pre&gt;  |
| [img myimg]  | &lt;img src="${media}myimg" class="img"&gt;  |
| [outimg myimg]  | &lt;img src="myimg" class="img"&gt;  |
| [caption mycaption]  | &lt;figcaption class="figure-caption"&gt;mycaption&lt;/figcaption&gt;  |
| [link text\|url]  | &lt;a href="url"&gt;text&lt;/a&gt;  |

More complex tags:

Example 1 (you can also use `ol` instead of `ul`):
```
[ul]*item1
*item2
*item3[/ul]
```

Output 1:
* item1
* item2
* item3

Example 2:
```
[table] |header1| |header2|
|col1| |col2| [/table]
```

Output 2:

| header1  | header2 |
| ------------- | ------------- |
| col1 | col2  |

## Configuration
This addon uses [ember-highlightjs-shim](https://github.com/rennomarcus/ember-highlightjs-shim)
to format code blocks. Read more on how
to pick a theme in their [documentation](https://github.com/rennomarcus/ember-highlightjs-shim).

Right now the only configuration you can have besides for the &lt;code&gt; tags,
is for your &lt;img&gt; tags. By default it appends the path/name you use in
[img path/name] to your root url, but if you want to use a different source for
your images, or have a namespace for your path you can add the following in your
`config/environment.js`

```
  let ENV = {
    ...
    'smartFormat': {
      'media': '/my-image-repository/';
    }
    ...
  }
```
So when using [img 01-01-2018/fireworks.png] will show
&lt;img src="/my-image-repository/01-01-2018/fireworks.png"&gt;

## Issues/Suggestions
If you have any question or suggestion, please open an issue.

## Development
* `git clone https://github.com/rennomarcus/ember-smart-format.git`
* `ember s`

## Tests
* `ember test` or `ember s` and go to /tests
