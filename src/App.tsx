import { QueryClientProvider, QueryClient, } from '@tanstack/react-query'
import Layout from './components/Layout';
import Kanban from './components/Kanban';


const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Kanban />
            </Layout>
        </QueryClientProvider>
    )
}

export default App
