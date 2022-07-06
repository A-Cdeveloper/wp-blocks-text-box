import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
	PanelColorSettings,
	ContrastChecker,
	withColors,
} from '@wordpress/block-editor';

import './editor.scss';

function Edit( props ) {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;

	const { text, alignment } = attributes;

	const onChangeText = ( txt ) => {
		setAttributes( { text: txt } );
	};

	const onChangeAlignment = ( val ) => {
		setAttributes( { alignment: val } );
	};

	return (
		<>
			{ /* sidebar start */ }
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color settings', 'text-box' ) }
					icon="admin-appearance"
					initialOpen
					disableCustomColors={ false }
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background color', 'text-box' ),
						},

						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text color', 'text-box' ),
						},
					] }
				>
					<ContrastChecker
						textColor={ textColor.color }
						backgroundColor={ backgroundColor.color }
					/>
				</PanelColorSettings>
			</InspectorControls>
			{ /* sidebar end */ }

			<BlockControls>
				<AlignmentToolbar
					onChange={ onChangeAlignment }
					value={ alignment }
				/>
			</BlockControls>

			<RichText
				{ ...useBlockProps( {
					className: `text-box-align-${ alignment }`,
					style: {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					},
				} ) }
				onChange={ onChangeText }
				value={ text }
				placeholder={ __( 'Your Text', 'text-box' ) }
				tagName="h4"
				allowedFormats={ [] }
				/*style={{textAlign:alignment }}*/
			/>
		</>
	);
}

export default withColors( {
	backgroundColor: 'backgroundColor',
	textColor: 'color',
} )( Edit );
