import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import ControlledCheckbox from "../components/common/ControlledCheckbox";
import {ThemeProvider, createTheme} from '@mui/material/styles';

const renderWithTheme = (ui: React.ReactElement) => {
    const theme = createTheme();
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe('ControlledCheckbox', () => {
    it('renders with correct label', () => {
        renderWithTheme(<ControlledCheckbox checked={false} onChange={() => {
        }} label="Chcę być moderatorem"/>);
        expect(screen.getByLabelText('Chcę być moderatorem')).toBeInTheDocument();
    });

    it('shows checkbox as checked when prop is true', () => {
        renderWithTheme(<ControlledCheckbox checked={true} onChange={() => {
        }} label="Zgoda"/>);
        const checkbox = screen.getByLabelText('Zgoda') as HTMLInputElement;
        expect(checkbox.checked).toBe(true);
    });

    it('calls onChange with correct value when toggled', () => {
        const mockOnChange = vi.fn();
        renderWithTheme(<ControlledCheckbox checked={false} onChange={mockOnChange} label="Zgoda"/>);
        const checkbox = screen.getByLabelText('Zgoda');
        fireEvent.click(checkbox);
        expect(mockOnChange).toHaveBeenCalledWith(true);
    });
});
