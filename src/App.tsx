import { useGSAP } from '@gsap/react';
import React from 'react';

const images = [
	{
		backgroundImage: `url('https://assets.codepen.io/106114/iphone-1.webp')`,
	},
	{
		backgroundImage: `url('https://assets.codepen.io/106114/iphone-2.webp')`,
	},
	{
		backgroundImage: `url('https://assets.codepen.io/106114/iphone-3.webp')`,
	},
	{
		backgroundImage: `url('https://assets.codepen.io/106114/iphone-4.webp')`,
	},
];
import { Flip } from 'gsap/Flip';
import { gsap } from 'gsap';
gsap.registerPlugin(Flip);
const App = () => {
	const imagesRef = React.useRef<React.ElementRef<'div'> | null>(null);
	const activeRef = React.useRef<React.ElementRef<'div'> | null>(null);
	const eventsRef = React.useRef<(React.ElementRef<'div'> | null)[]>([]);
	const { contextSafe } = useGSAP(() => {
		eventsRef.current = gsap.utils.toArray('.event');
		activeRef.current = eventsRef.current[0];
	});
	const clickHandler = contextSafe(
		(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const target = event.target as HTMLDivElement;
			const state = Flip.getState(eventsRef.current);
			activeRef.current!.dataset.grid = target.dataset.grid;
			target.dataset.grid = 'img-1';
			activeRef.current = target;
			console.log({ event, target, state });
			Flip.from(state, {
				duration: 0.5,
				absolute: true,
				ease: 'power1.inOut',
			});
		},
	);
	return (
		<div>
			<div className="app">
				<div className="image-content">
					<div className="image-container">
						<div ref={imagesRef} className="images">
							{images.map(({ backgroundImage }, index) => (
								<div
									key={index}
									style={{
										backgroundImage,
									}}
									onClick={clickHandler}
									className="event"
									data-grid={`img-${index + 1}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
