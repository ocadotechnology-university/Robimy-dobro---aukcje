import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import TitleTextField from "../components/common/TitleTextField";

describe('TitleTextField', () => {
    it('renders with label "Tytuł"', () => {
        render(<TitleTextField title="" setTitle={() => {
        }}/>);
        const input = screen.getByLabelText('Tytuł');
        expect(input).toBeInTheDocument();
    });

    it('displays the correct value', () => {
        render(<TitleTextField title="Moja aukcja" setTitle={() => {
        }}/>);
        const input = screen.getByLabelText('Tytuł') as HTMLInputElement;
        expect(input.value).toBe('Moja aukcja');
    });

    it('calls setTitle when user types', () => {
        const mockSetTitle = vi.fn();
        render(<TitleTextField title="" setTitle={mockSetTitle}/>);
        const input = screen.getByLabelText('Tytuł');

        fireEvent.change(input, {target: {value: 'Nowy tytuł'}});

        expect(mockSetTitle).toHaveBeenCalledWith('Nowy tytuł');
        expect(mockSetTitle).toHaveBeenCalledTimes(1);
    });
});
