import ViewportChecker from 'viewport-checker';
export default function viewAnimation() {
	// Components loading animations
    const vpc = new ViewportChecker('.view-animation', {
        classToAdd: 'animated',
        offset: 80
    })
	vpc.attach();
}
