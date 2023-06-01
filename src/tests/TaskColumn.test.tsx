import React from 'react';
import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import TaskColumn from '../components/TaskColumn';

// Create a new query client for testing
const queryClient = new QueryClient();

// Decorator to wrap components with QueryClientProvider
const withQueryClientProvider = (component: React.ReactNode) => (
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
);

describe('TaskColumn', () => {
    const mockColumnData = [
        {
            id: 1,
            task: 'Clean Car',
            status: 2,
            description: 'My car is dirty. Oh no! Clean the car.',
        },
        {
            id: 2,
            task: 'Buy Groceries',
            status: 2,
            description: 'I need to buy some groceries for the week.',
        },
    ];

    test('renders title and cards with correct text', () => {
        const { getByText } = render(
            withQueryClientProvider(
                <TaskColumn
                    statusText="In Progress"
                    statusNum={2}
                    columnData={mockColumnData}
                />
            )
        );
        expect(getByText('In Progress')).toBeInTheDocument();

        expect(getByText('Clean Car')).toBeInTheDocument();
        expect(getByText('Buy Groceries')).toBeInTheDocument();
        expect(
            getByText('My car is dirty. Oh no! Clean the car.')
        ).toBeInTheDocument();
        expect(
            getByText('I need to buy some groceries for the week.')
        ).toBeInTheDocument();
    });

    test('renders task card with the correct column title', () => {
        const { getByText } = render(
            withQueryClientProvider(
                <TaskColumn statusText="Deleted" statusNum={3} />
            )
        );
        expect(getByText('Deleted')).toBeInTheDocument();
    });
});
