import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import PrimaryActionButton from "../components/common/PrimaryActionButton";
import {ThemeProvider, createTheme} from '@mui/material/styles';

const renderWithTheme = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('PrimaryActionButton', () => {
    it('renders with the correct label', () => {
        renderWithTheme(<PrimaryActionButton label="Zapisz" onClick={() => {
        }}/>);
        const button = screen.getByRole('button', {name: 'Zapisz'});
        expect(button).toBeInTheDocument();
    });

    it('calls onClick when button is clicked', () => {
        const handleClick = vi.fn();
        renderWithTheme(<PrimaryActionButton label="Kliknij" onClick={handleClick}/>);
        const button = screen.getByRole('button', {name: 'Kliknij'});
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
