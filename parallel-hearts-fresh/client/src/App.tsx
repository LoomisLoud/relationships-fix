import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Landing from "./pages/Landing";
import Welcome from "./pages/Welcome";
import AssessmentQuestionnaire from "./pages/AssessmentQuestionnaire";
import PasteConversation from "./pages/PasteConversation";
import Import from "./pages/Import";
import LoadingRealities from "./pages/LoadingRealities";
import ResultsAhaMoment from "./pages/ResultsAhaMoment";
import CoupleDetail from "./pages/CoupleDetail";
import Person1Detail from "./pages/Person1Detail";
import Person2Detail from "./pages/Person2Detail";
import RealitiesGallery from "./pages/RealitiesGallery";
import ExplorationPrompts from "./pages/ExplorationPrompts";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Landing} />
      <Route path={"/exploration-prompts"} component={ExplorationPrompts} />
      <Route path={"/welcome"} component={Welcome} />
      <Route path={"/assessment"} component={AssessmentQuestionnaire} />
      <Route path={"/paste-conversation"} component={PasteConversation} />
      <Route path={"/import"} component={Import} />
      <Route path={"/loading-realities"} component={LoadingRealities} />
      <Route path={"/results"} component={ResultsAhaMoment} />
      <Route path={"/multiverse/couple"} component={CoupleDetail} />
      <Route path={"/multiverse/person1"} component={Person1Detail} />
      <Route path={"/multiverse/person2"} component={Person2Detail} />
      <Route path={"/multiverse/realities"} component={RealitiesGallery} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
