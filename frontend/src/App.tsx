import './styles/App.css'
import {Route, Routes} from "react-router-dom";
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

function App() {

    return (
        <Routes>
            <Route index element={<AuthPage/>}/>
            <Route path={routes.main} element={<MainPage/>}/>
            <Route path={routes.object_workers_list} element={<ObjectWorkersList/>}/>
            <Route path={routes.journal_lists} element={<JournalListsPage/>}/>
            <Route path={routes.building_objects} element={<BuildingObjectsPage/>}/>
            <Route path={routes.markings_short_names} element={<MarkingsShortNamesPage/>}/>
            <Route path={routes.discipline_short_names} element={<DisciplineShortNamesPage/>}/>
            <Route path={routes.srd_by_block} element={<SRDByBlockPage/>}/>
            <Route path={routes.srd_marking} element={<SRDMarkingPage/>}/>
            <Route path={routes.doc_types} element={<DocTypesPage/>}/>
            <Route path={routes.work_types} element={<WorkTypesPage/>}/>
            <Route path={routes.retreats_importance} element={<RetreatsImportancePage/>}/>
            <Route path={routes.supervision_journal} element={<SupervisionJournalPage/>}/>
            <Route path={routes.itd_registry} element={<ITDRegistryPage/>}/>
            <Route path={routes.solutions_registry} element={<SolutionsRegistryPage/>}/>
            <Route path={routes.author_review_specs} element={<AuthorReviewSpecsPage/>}/>
            <Route path={routes.reg_visit_list} element={<RegVisitListPage/>}/>
            <Route path={routes.organisations} element={<OrganisationsPage/>}/>
            <Route path={routes.consultations} element={<ConsultationsPage/>}/>
        </Routes>
    )
}

export default App
