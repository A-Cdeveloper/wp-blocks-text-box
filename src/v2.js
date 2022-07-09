import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';
import metadata from './block.json';

import { omit } from 'loadsh';

const v2 = {
	supports: {
		html: false,
		color: {
			text: true,
			background: true,
			gradients: true,
		},
		spacing: {
			padding: true,
		},
		attributes: {
			...omit( metadata.attributes, [ 'textAligment' ] ),
			aligment: {
				type: 'string',
				default: 'left',
			},
		},
	},

	migrate: ( attributes ) => {
		return {
			...omit( attributes, [ 'alignment' ] ),
			textAlignment: attributes.aligment,
		};
	},

	save: ( { attributes } ) => {
		const { text, textAlignment, shadow, shadowOpacity } = attributes;

		const classes = classnames( `text-box-align-${ textAlignment }`, {
			'has-shadow': shadow,
			[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
		} );

		return (
			<RichText.Content
				{ ...useBlockProps.save( {
					className: classes,
				} ) }
				tagName="p"
				value={ text }
			/>
		);
	},
};

export default v2;
