<?php
/**
 * Plugin Name:       LB Thought Bubble
 * Description:       A block that displays a CTA inside the hero cover block
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.2
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       thought-bubble
 *
 * @package           procyon
 */
require_once __DIR__ . '/vendor/autoload.php';

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

/**
 * Don't need to run this on ajax requests
 */
if ( ! is_ajax() && is_admin()) {
	$myUpdateChecker = PucFactory::buildUpdateChecker(
		'https://github.com/nicolasgalvez/thought-bubble/',
		__FILE__, //Full path to the main plugin file or functions.php.
		'thought-bubble'
	);


	$myUpdateChecker->getVcsApi()->enableReleaseAssets( '/thought-bubble\.zip/' );

////Set the branch that contains the stable release.
	$myUpdateChecker->setBranch( 'main' );

//Optional: If you're using a private repository, specify the access token like this:
//$myUpdateChecker->setAuthentication('your-token-here');

	remove_filter( 'upgrader_source_selection', [ $myUpdateChecker, 'fixDirectoryName' ], 10 );
}


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_thought_bubble_block_init() {
	register_block_type( __DIR__ . '/build' );
}

add_action( 'init', 'create_block_thought_bubble_block_init' );
