import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from '@react-oauth/google'
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles'
import theme from "./theme/theme";
import {AuthProvider} from "./hooks/AuthProvider";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ViewModeProvider} from "./contexts/ViewModeContext";
import {AuctionDatesProvider} from "./contexts/AuctionDatesContext";
import {CityProvider} from "./contexts/CitiesContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={"536919436480-2k0ca1hu29hc7hdj9lqekmj31r1hl299.apps.googleusercontent.com"}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <AuthProvider>
                        <ViewModeProvider>
                            <CityProvider>
                                <AuctionDatesProvider>
                                    <QueryClientProvider client={queryClient}>
                                        <App/>
                                    </QueryClientProvider>
                                </AuctionDatesProvider>
                            </CityProvider>
                        </ViewModeProvider>
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    </React.StrictMode>
)
;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
