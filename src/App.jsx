import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./core/routes/AppRoutes.jsx";
import {ToastProvider} from './core/contexts/ToastContext.jsx';
import AuthChecker from "./core/components/AuthChecker.jsx";

function App() {
    return (
        <>
            <ToastProvider>
                <Router>
                    <AuthChecker>
                        <AppRoutes />
                    </AuthChecker>
                </Router>
            </ToastProvider>
        </>
    );
}

export default App;
