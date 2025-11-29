import './styles/App.css'
import {Route, Routes, Navigate} from "react-router-dom";
import AuthPage from "./pages/AuthPage/AuthPage.tsx";
import routes from "./router/routes.ts";
import MainPage from "./pages/MainPage/MainPage.tsx";
import ObjectWorkersList from "./pages/ObjectWorkersList/ObjectWorkersList.tsx";
import JournalListsPage from "./pages/JournalListsPage/JournalListsPage.tsx";
import BuildingObjectsPage from "./pages/BuildingObjectsPage/BuildingObjectsPage.tsx";
import MarkingsShortNamesPage from "./pages/MarkingShortNamesPage/MarkingsShortNamesPage.tsx";
import DisciplineShortNamesPage from "./pages/DisciplineShortNamesPage/DisciplineShortNamesPage.tsx";
import SRDByBlockPage from "./pages/SRDByBlockPage/SRDByBlockPage.tsx";
import SRDMarkingPage from "./pages/SRDMarkingPage/SRDMarkingPage.tsx";
import WorkTypesPage from "./pages/WorkTypesPage/WorkTypesPage.tsx";
import DocTypesPage from "./pages/DocTypesPage/DocTypesPage.tsx";
import RetreatsImportancePage from "./pages/RetreatsImportancePage/RetreatsImportancePage.tsx";
import SupervisionJournalPage from "./pages/SupervisionJournalPage/SupervisionJournalPage.tsx";
import ITDRegistryPage from "@pages/ITDRegustryPage/ITDRegistryPage.tsx";
import SolutionsRegistryPage from "@pages/SolutionsRegistryPage/SolutionsRegistryPage.tsx";
import AuthorReviewSpecsPage from "@pages/AuthorReviewSpecsPage/AuthorReviewSpecsPage.tsx";
import RegVisitListPage from "@pages/RegVisitListPage/RegVisitListPage.tsx";
import OrganisationsPage from "@pages/OrganisationsPage/OrganisationsPage.tsx";
import ConsultationsPage from "@pages/ConsultationsPage/ConsultationsPage.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error) => {
                // Не повторяем запросы при 401 ошибке
                if (error && typeof error === 'object' && 'status' in error && error.status === 401) {
                    return false;
                }
                return failureCount < 1;
            },
            staleTime: 5 * 60 * 1000, // 5 минут
            refetchOnWindowFocus: false,
        },
        mutations: {
            retry: false,
        },
    },
});

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route index element={<AuthPage/>}/>
                <Route path={routes.main} element={
                    <ProtectedRoute>
                        <MainPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.object_workers_list} element={
                    <ProtectedRoute>
                        <ObjectWorkersList/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.journal_lists} element={
                    <ProtectedRoute>
                        <JournalListsPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.building_objects} element={
                    <ProtectedRoute>
                        <BuildingObjectsPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.markings_short_names} element={
                    <ProtectedRoute>
                        <MarkingsShortNamesPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.discipline_short_names} element={
                    <ProtectedRoute>
                        <DisciplineShortNamesPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.srd_by_block} element={
                    <ProtectedRoute>
                        <SRDByBlockPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.srd_marking} element={
                    <ProtectedRoute>
                        <SRDMarkingPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.doc_types} element={
                    <ProtectedRoute>
                        <DocTypesPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.work_types} element={
                    <ProtectedRoute>
                        <WorkTypesPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.retreats_importance} element={
                    <ProtectedRoute>
                        <RetreatsImportancePage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.supervision_journal} element={
                    <ProtectedRoute>
                        <SupervisionJournalPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.itd_registry} element={
                    <ProtectedRoute>
                        <ITDRegistryPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.solutions_registry} element={
                    <ProtectedRoute>
                        <SolutionsRegistryPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.author_review_specs} element={
                    <ProtectedRoute>
                        <AuthorReviewSpecsPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.reg_visit_list} element={
                    <ProtectedRoute>
                        <RegVisitListPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.organisations} element={
                    <ProtectedRoute>
                        <OrganisationsPage/>
                    </ProtectedRoute>
                }/>
                <Route path={routes.consultations} element={
                    <ProtectedRoute>
                        <ConsultationsPage/>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<Navigate to={routes.auth} replace/>}/>
            </Routes>
        </QueryClientProvider>
    )
}

export default App
