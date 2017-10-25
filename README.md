# ember-smart-format

 Ember addon to wrap strings with smart tags in html blocks 

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
| [code]my code[/code]  | &lt;pre&gt;&lt;code&gt;my code&lt;/code&gt;&lt;/pre&gt;  |
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
