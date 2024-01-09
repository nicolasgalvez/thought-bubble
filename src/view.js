/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
import Cookies from 'js-cookie';

document.addEventListener('DOMContentLoaded', (event) => {
	const closeButtons = document.querySelectorAll('.thought-bubble-close');

	closeButtons.forEach((button) => {
		if(Cookies.get('thought-bubble') === 'closed') {
			button.closest('.thought-bubble').style.display = 'none';
			button.closest('.thought-bubble').style.visibility = 'hidden';
			return;
		} else {
			button.closest('.thought-bubble').style.display = 'block';
		}

		button.addEventListener('click', function() {
			this.closest('.thought-bubble').style.display = 'none';
			button.closest('.thought-bubble').style.visibility = 'hidden';
			Cookies.set('thought-bubble', 'closed', { expires: 1 })
		});
	});
});
