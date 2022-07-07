import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';

// eslint-disable-next-line
import {
	__experimentalBoxControl as BoxControl,
	PanelBody,
	RangeControl,
} from '@wordpress/components';
import classnames from 'classnames';
import './editor.scss';

const { __Visualizer: BoxControlVisualizer } = BoxControl;

export default function Edit( { attributes, setAttributes } ) {
	const { text, alignment, style, shadow, shadowOpacity } = attributes;

	const onChangeText = ( txt ) => {
		setAttributes( { text: txt } );
	};

	const onChangeAlignment = ( val ) => {
		setAttributes( { alignment: val } );
	};

	const onChangeShadowOpacity = ( newOpacity ) => {
		setAttributes( { shadowOpacity: newOpacity } );
	};

	const toggleShadow = () => {
		setAttributes( { shadow: ! shadow } );
	};

	const classes = classnames( `text-box-align-${ alignment }`, {
		'has-shadow': shadow,
		[ `shadow-opacity-${ shadowOpacity }` ]: shadow && shadowOpacity,
	} );

	return (
		<>
			<InspectorControls>
				{ shadow && (
					<PanelBody
						title={ __( 'Shadow Settings', 'text-box' ) }
						initialOpen={ false }
					>
						{ /* <RadioControl
						label="Change shadow opacity"
						//help="Select shadow opacity"
						selected={ `${shadowOpacity}` }
						options={ [
							{ label: '10', value: '10' },
							{ label: '20', value: '20' },
							{ label: '30', value: '30' },
							{ label: '40', value: '40' }
						] }
						onChange={onChangeShadowOpacity}
					/> */ }

						<RangeControl
							label={ __( 'Shadow Opacity', 'text-box' ) }
							value={ shadowOpacity }
							onChange={ onChangeShadowOpacity }
							min={ 10 }
							max={ 40 }
							step={ 10 }
						/>
					</PanelBody>
				) }
			</InspectorControls>

			<BlockControls
				controls={ [
					{
						icon: 'admin-page',
						title: __( 'Shadow', 'text-box' ),
						onClick: toggleShadow,
						isActive: shadow,
					},
				] }
			>
				<AlignmentToolbar
					onChange={ onChangeAlignment }
					value={ alignment }
				/>
			</BlockControls>

			<div
				{ ...useBlockProps( {
					className: classes,
				} ) }
			>
				<RichText
					onChange={ onChangeText }
					value={ text }
					placeholder={ __( 'Your Text', 'text-box' ) }
					tagName="h4"
					allowedFormats={ [] }
					className="text-box-title"
				/>
				<BoxControlVisualizer
					values={ style && style.spacing && style.spacing.padding }
					showValues={
						style && style.visualizers && style.visualizers.padding
					}
				/>
			</div>
		</>
	);
}
