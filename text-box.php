<?php
/**
 * Plugin Name:       Text Box
 * Description:       A box of text.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Aleksandar Cvetkovic
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       textbox
 *
 * @package           blocks-course
 */

function blocks_course_text_box_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'blocks_course_text_box_init' );
