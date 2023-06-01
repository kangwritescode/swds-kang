import { render, fireEvent } from '@testing-library/react';
import CardButton from '../components/CardButton';

describe('CardButton', () => {
    test('renders the button with children', () => {
        const { getByTestId, getByText } = render(
            <CardButton onClick={() => undefined} testId="card-button">
                Click Me
            </CardButton>
        );

        const buttonElement = getByTestId('card-button');
        expect(buttonElement).toBeInTheDocument();

        const buttonTextElement = getByText('Click Me');
        expect(buttonTextElement).toBeInTheDocument();
    });

    test('calls the onClick handler when clicked', () => {
        const onClickMock = jest.fn();
        const { getByTestId } = render(
            <CardButton onClick={onClickMock} testId="card-button">
                Click Me
            </CardButton>
        );

        const buttonElement = getByTestId('card-button');

        fireEvent.click(buttonElement);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
});
