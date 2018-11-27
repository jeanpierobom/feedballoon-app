/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-envelope': '&#xe902;',
		'icon-close': '&#xe903;',
		'icon-add': '&#xe904;',
		'icon-plus': '&#xe904;',
		'icon-reply': '&#xe900;',
		'icon-home': '&#xe901;',
		'icon-users': '&#xe972;',
		'icon-user-plus': '&#xe973;',
		'icon-search': '&#xe986;',
		'icon-cog': '&#xe994;',
		'icon-bookmarks': '&#xe9d3;',
		'icon-circle-down': '&#xea43;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
