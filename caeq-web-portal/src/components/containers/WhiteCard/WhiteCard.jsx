import './WhiteCard.styles.scss';

/**
 * WhiteContainer component for rendering content within a white container.
 * @component
 *
 * @param {Object} props - The component's properties.
 * @param {React.ReactNode} props.children - The content to be rendered within the white container.
 * @returns {JSX.Element} JSX element representing the WhiteContainer.
 *
 * @example
 * // Example usage of WhiteContainer:
 * <WhiteContainer>
 *   <p>This content will be displayed within a white container.</p>
 * </WhiteContainer>
 */
const WhiteContainer = ({ children }) => {
    return (
        <div className='container-white' data-testid='white-card'>
            {children}
        </div>
    );
};

export default WhiteContainer;
