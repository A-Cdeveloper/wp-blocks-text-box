import { registerBlockType, createBlock } from '@wordpress/blocks';
import './style.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

import v1 from './v1';
import v2 from './v2';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated: [ v2, v1 ],
	variations: [
		{
			name: 'blocks-course/gradient-text-box',
			title: 'Gradient(green-yellow) Text Box',
			icon: 'wordpress',
			attributes: {
				gradient: 'green-yellow',
			},
		},
	],
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( { content, align } ) => {
					return createBlock( 'blocks-course/text-box', {
						text: content,
						textAlignment: align,
					} );
				},
			},
			{
				type: 'enter',
				regExp: /textbox/i,
				transform: () => {
					return createBlock( 'blocks-course/text-box' );
				},
			},
			{
				type: 'prefix',
				prefix: 'textbox',
				transform: () => {
					return createBlock( 'blocks-course/text-box' );
				},
			},
		],

		to: [
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				isMatch: ( { text } ) => {
					return text ? true : false;
				},
				transform: ( { text, textAlignment } ) => {
					return createBlock( 'core/paragraph', {
						content: text,
						align: textAlignment,
						backgroundColor: '#000',
					} );
				},
			},
		],
	},
} );
