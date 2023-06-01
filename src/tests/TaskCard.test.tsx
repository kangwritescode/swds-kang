import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import TaskCard from '../components/TaskCard';

// Create a new query client for testing
const queryClient = new QueryClient();

// Decorator to wrap components with QueryClientProvider
const withQueryClientProvider = (component: React.ReactNode) => (
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
);

describe('TaskCard', () => {
    const mockTask = {
        id: 1,
        task: 'Clean Car',
        status: 2,
        description: 'My car is dirty. Oh no! Clean the car.',
    };

    test('renders task details', () => {
        const { getByText } = render(
            withQueryClientProvider(
                <TaskCard task={mockTask} onClick={jest.fn()} />
            )
        );

        expect(getByText('Clean Car')).toBeInTheDocument();
        expect(
            getByText('My car is dirty. Oh no! Clean the car.')
        ).toBeInTheDocument();
    });

    test('calls onClick when edit icon button is clicked', () => {
        const onClick = jest.fn();
        const { getByTestId } = render(
            withQueryClientProvider(
                <TaskCard task={mockTask} onClick={onClick} />
            )
        );

        fireEvent.click(getByTestId('edit-button'));

        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onClick).toHaveBeenCalledWith(mockTask);
    });

    test('left arrow button does not render when status is 1', () => {
        const { queryByTestId } = render(
            withQueryClientProvider(
                <TaskCard
                    task={{ ...mockTask, status: 1 }}
                    onClick={jest.fn()}
                />
            )
        );

        expect(queryByTestId('left-arrow-button')).not.toBeInTheDocument();
    });

    test('right arrow button does not render when status is 4', () => {
        const { queryByTestId } = render(
            withQueryClientProvider(
                <TaskCard
                    task={{ ...mockTask, status: 4 }}
                    onClick={jest.fn()}
                />
            )
        );

        expect(queryByTestId('right-arrow-button')).not.toBeInTheDocument();
    });
});
