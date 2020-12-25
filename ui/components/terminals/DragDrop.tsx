import React, { Component, RefObject } from 'react';

interface Props {

	handleDrop: (files: FileList) => void;
}

interface State {

	drag: boolean;
}

export default class DragDrop extends Component<Props, State> {

	private dropRef: RefObject<HTMLDivElement> = React.createRef();
	private dragCounter = 0;

	constructor(props: Props) {

		super(props);

		this.state = {

			drag: false,
		};
	}

	componentDidMount() {

		const div = this.dropRef.current;

		if(!div)
			return;

		div.addEventListener('dragenter', this.handleDragIn)
		div.addEventListener('dragleave', this.handleDragOut)
		div.addEventListener('dragover', this.handleDrag)
		div.addEventListener('drop', this.handleDrop)
	}

	componentWillUnmount() {

		const div = this.dropRef.current;

		if(!div)
			return;

		div.removeEventListener('dragenter', this.handleDragIn)
		div.removeEventListener('dragleave', this.handleDragOut)
		div.removeEventListener('dragover', this.handleDrag)
		div.removeEventListener('drop', this.handleDrop)
	}

	render() {

		return (
			<div style={{ display: 'inline-block', position: 'relative' }} ref={this.dropRef} >
				{
					this.state.drag &&
					<div className="drop">
					</div>
				}
				{this.props.children}
			</div>
		)
	}

	private handleDrag = (event: DragEvent) => {

		event.preventDefault();
		event.stopPropagation();
	}

	private handleDragIn = (event: DragEvent) => {

		event.preventDefault();
		event.stopPropagation();
		this.dragCounter++;

		if(event.dataTransfer?.items && event.dataTransfer.items.length > 0)
			this.setState({ drag: true });
	}

	private handleDragOut = (event: DragEvent) => {

		event.preventDefault();
		event.stopPropagation();
		this.dragCounter--;

		if(this.dragCounter === 0)
			this.setState({ drag: false })
	}

	private handleDrop = (event: DragEvent) => {

		event.preventDefault();
		event.stopPropagation();

		this.setState({ drag: false });

		if(event.dataTransfer?.files && event.dataTransfer.files.length > 0) {

			this.props.handleDrop(event.dataTransfer.files);

			event.dataTransfer.clearData();
			this.dragCounter = 0;
		}
	}
}
