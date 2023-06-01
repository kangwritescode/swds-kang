import React from 'react';
import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import TaskForm from '../components/TaskForm';

// Mock the API functions
jest.mock('../api/task', () => ({
    postTask: jest.fn(),
    putTask: jest.fn(),
    deleteTask: jest.fn(),
}));

// Create a new query client for testing
const queryClient = new QueryClient();

// Decorator to wrap components with QueryClientProvider
const withQueryClientProvider = (component: React.ReactNode) => (
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
);

const initialValues = {
    id: 1,
    task: 'Clean Car',
    status: 2,
    description: 'My car is dirty. Oh no! Clean the car.',
};

describe('TaskForm', () => {
    test('renders create task form', () => {
        const { getByTestId, queryByText, getByPlaceholderText } = render(
            withQueryClientProvider(
                <TaskForm
                    type="create"
                    initialValues={initialValues}
                    onClose={jest.fn()}
                />
            )
        );
        expect(getByTestId('create-title')).toBeInTheDocument();
        expect(getByPlaceholderText('Title')).toBeInTheDocument();
        expect(getByPlaceholderText('Description')).toBeInTheDocument();
        expect(getByTestId('status-select')).toBeInTheDocument();
        expect(queryByText('Delete Task')).not.toBeInTheDocument();
    });

    test('renders edit task form', () => {
        const { getByTestId, getByText } = render(
            withQueryClientProvider(
                <TaskForm
                    type="edit"
                    onClose={jest.fn()}
                    initialValues={initialValues}
                />
            )
        );
        expect(getByTestId('edit-title')).toBeInTheDocument();
        expect(getByText('Delete Task')).toBeInTheDocument();
    });
});
