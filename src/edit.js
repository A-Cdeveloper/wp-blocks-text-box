import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';

import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { text, alignment } = attributes;

	const onChangeText = ( txt ) => {
		setAttributes( { text: txt } );
	};

	const onChangeAlignment = ( val ) => {
		setAttributes( { alignment: val } );
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					onChange={ onChangeAlignment }
					value={ alignment }
				/>
			</BlockControls>

			<RichText
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
				} ) }
				onChange={ onChangeText }
				value={ text }
				placeholder={ __( 'Your Text', 'text-box' ) }
				tagName="h4"
				allowedFormats={ [] }
			/>
		</>
	);
}
