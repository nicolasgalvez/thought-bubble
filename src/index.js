import {registerBlockType} from '@wordpress/blocks';
import {
	MediaUpload,
	RichText,
	InnerBlocks,
	InspectorControls
} from '@wordpress/block-editor';
import {Button, CheckboxControl, PanelBody, ColorPicker} from '@wordpress/components';
import {useBlockProps} from '@wordpress/block-editor';
import './style.scss';
import './editor.scss';

registerBlockType('procyon/thought-bubble', {
	apiVersion: 2,
	attributes: {
		imgURL: {
			type: 'string',
			default: null,
		},
		richTextContent: {
			type: 'string',
			default: '',
		},
		showBlock: {
			type: 'boolean',
			default: true,
		},
	},
	edit: function (props) {
		const {attributes: {imgURL, richTextContent, showBlock, textColor}, setAttributes} = props;
		const blockProps = useBlockProps();
		return (
			<div {...blockProps}>
				<InspectorControls>
					<PanelBody title="Text Color" initialOpen={false}>
						<ColorPicker
							color={textColor}
							onChangeComplete={(value) => setAttributes({textColor: value.hex})}
						/>
					</PanelBody>
				</InspectorControls>
				<InspectorControls>
					<PanelBody title="Block Control" initialOpen={true}>
						<CheckboxControl
							label="Display Block"
							checked={showBlock}
							onChange={(value) => setAttributes({showBlock: value})}
							help="Show or hide this block on the frontend."
						/>
						<MediaUpload
							onSelect={(media) => setAttributes({imgURL: media.url})}
							render={({open}) => (
								<Button onClick={open}>
									Choose Image
								</Button>
							)}
						/>
					</PanelBody>
				</InspectorControls>
				{showBlock && (
					<>
						{imgURL &&
							<img className={`thought-bubble-content ${showBlock ? '' : 'is-hidden'}`} src={imgURL}
								 alt="Thought Bubble Image"/>}
						<div className={`thought-bubble-content ${showBlock ? '' : 'is-hidden'}`}>
							<RichText
								tagName="p"
								value={richTextContent}
								onChange={(value) => setAttributes({richTextContent: value})}
							/>
							<InnerBlocks
								allowedBlocks={['core/button']}
								templateLock="all"
								template={[['core/button', {}]]}
							/>
						</div>
					</>
				)}
			</div>
		);
	},
	save: function (props) {
		const {attributes: {imgURL, richTextContent, showBlock, textColor}, className} = props;
		const blockProps = useBlockProps.save({className});
		return showBlock && (
			<div {...blockProps}>
				<button style={{color: textColor}} className="thought-bubble-close">X</button>
				{imgURL && <img src={imgURL} alt="Thought Bubble Image"/>}
				<div className="thought-bubble-content">
					<RichText.Content tagName="p" value={richTextContent}/>
					<InnerBlocks.Content/>
				</div>
			</div>
		);
	},
});
