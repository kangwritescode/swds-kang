import React from 'react';
import { render } from '@testing-library/react';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import Kanban from '../components/Kanban';

// Create a new query client for testing
const queryClient = new QueryClient();

// Decorator to wrap components with QueryClientProvider
const withQueryClientProvider = (component: React.ReactNode) => (
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
);

describe('Kanban', () => {
    test('renders the Kanban board with columns', () => {
        const { getByText } = render(withQueryClientProvider(<Kanban />));

        const titleElement = getByText('Kanban');
        expect(titleElement).toBeInTheDocument();

        expect(getByText('Pending')).toBeInTheDocument();
        expect(getByText('In Progress')).toBeInTheDocument();
        expect(getByText('Deleted')).toBeInTheDocument();
        expect(getByText('Closed')).toBeInTheDocument();
    });
});
