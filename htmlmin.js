function htmlmin() {
	var that = {};

	var reNameChar = /^[\-.:\w]+$/;
	var reSTag = /<([_:A-Z][\-.:\w]*)\s*[^>]*>/gi;
	var reETag = /<\/([_:A-Z][\-.:\w]+)\s*>/gi;
	var reAttr = /\s+([_:A-Z][\-.:\w]+)\s*=\s*(?:[\"]([^\"]*)([\"])|[\']([^\']*)([\']))/gi;
	var reEnd = /\s*\/?>/;

	var reEqAttr = / ([_:A-Z][\-.:\w]*)=\1/gi;
	var reShape = / shape=rect/gi;
	var reSpan = / span=1/gi;
	var reEnctypeMethod = / (?:enctype=[\"\']application\/x-www-form-urlencoded[\"\']|method=get)/gi;
	var reFrameborderScrolling = / (?:frameborder=1|scrolling=auto)/gi;
	var reAlign = / align=center/gi;
	var reType = / type=text/gi;
	var reTypeStyle = / type=[\"\']text\/css[\"\']/gi;
	var reValuetype = / valuetype=data/gi;
	var reWidth = / width=left/gi;
	var reTypeScript = / type=[\"\']text\/javascript[\"\']/gi;
	var reColspanRowspan = / (?:col|row)span=1/gi;

	that.sTag = [
		'body',
		'head',
		'html'
		];
	that.eTag = [
		'body',
		'colgroup',
		'dd',
		'dt',
		'head',
		'html',
		'li',
		'option',
		'p',
		'plaintext',
		'tbody',
		'td',
		'tfoot',
		'th',
		'thead',
		'tr'
		];

	that.minify = function(text) {
		var reSDel = that.sTag.length > 0 ? new RegExp('\\b(?:' + that.sTag.join('|') + ')\\b', 'i') : null;
		var reEDel = that.eTag.length > 0 ? new RegExp('\\b(?:' + that.eTag.join('|') + ')\\b', 'i') : null;

		return text.
		  replace(reSTag, function($_, $1) {
			  if (reSDel && reSDel.test($1)) {
				  return '';
			  } else {
				  var tagStr = $_.
					replace(reAttr, function($_, $1, $2, $3, $4, $5) {
						var attrVal = $2 || $4;
						return [' ' + $1 + '=', attrVal, ''].join(reNameChar.test(attrVal) ? '' : $3 || $5);
					}).
					  replace(reEnd, '>').
						replace(reEqAttr, '');
				  switch ($1.toLowerCase()) {
					case 'area':
					  tagStr = tagStr.replace(reShape, '');
					  break;
					case 'col':
					case 'colgroup':
					  tagStr = tagStr.replace(reSpan, '');
					  break;
					case 'form':
					  tagStr = tagStr.replace(reEnctypeMethod, '');
					  break;
					case 'frame':
					case 'iframe':
					  tagStr = tagStr.replace(reFrameborderScrolling, '');
					  break;
					case 'hr':
					  tagStr = tagStr.replace(reAlign, '');
					  break;
					case 'input':
					  tagStr = tagStr.replace(reType, '');
					  break;
					case 'link':
					case 'style':
					  tagStr = tagStr.replace(reTypeStyle, '');
					  break;
					case 'param':
					  tagStr = tagStr.replace(reValuetype, '');
					  break;
					case 'pre':
					  tagStr = tagStr.replace(reWidth, '');
					  break;
					case 'script':
					  tagStr = tagStr.replace(reTypeScript, '');
					  break;
					case 'td':
					case 'th':
					  tagStr = tagStr.replace(reColspanRowspan, '');
					  break;
				  }
				  return tagStr;
			  }
		  }).
			replace(reETag, function($_, $1) {
				return reEDel && reEDel.test($1) ? '' : $_;
			});
	};

	return that;
}
