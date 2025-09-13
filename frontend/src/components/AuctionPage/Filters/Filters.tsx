import {useState} from "react";
import {Stack, Box, Paper} from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import {AuctionFilters} from "../../../services/fetchAuctions";
import {useEffect} from "react";
import {useViewMode} from "../../../contexts/ViewModeContext";
import {useAuctionDates} from "../../../contexts/AuctionDatesContext";
import React from "react";

import {
    FiltersPaperStyle,
    FiltersScrollContainerStyle,
} from './Filters.styles';
import {useAuth} from "../../../hooks/AuthProvider";
import FiltersHeader from "./FiltersHeader";
import FilterSection from "./FilterSection";
import SortSection from "./SortSection";

interface FiltersProps {
    aucfilters: AuctionFilters;
    setAucFilters: React.Dispatch<React.SetStateAction<AuctionFilters>>;
    auctionsAmount: number;
    initialSelectedDate?: string;
}

const statusOptions = ["Niekompletne", "Bez moderatora", "Bez daty", "Bez oferty", "Kompletne"];
const selectedOptions = ["Moje aukcje", "Ulubione"];
const sortOptions = ["Domyślne", "Cena: od najniższej", "Cena: od najwyższej"];

const statusValueMap: Record<string, string> = {
    "Niekompletne": "INCOMPLETE",
    "Bez moderatora": "NO_MODERATOR",
    "Bez daty": "NO_DATE",
    "Bez oferty": "NO_BID",
    "Kompletne": "COMPLETE",
};

const sortValueMap: Record<string, string | null> = {
    "Domyślne": null,
    "Cena: od najniższej": "priceAsc",
    "Cena: od najwyższej": "priceDesc",
};

const Filters = ({setAucFilters, auctionsAmount, initialSelectedDate}: FiltersProps) => {
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [sort, setSort] = useState<string>("Domyślne");
    const {dates, loading} = useAuctionDates();
    const {role} = useAuth();
    const {adminViewMode} = useViewMode();
    const hasMoreFilters = role === "ADMIN" && adminViewMode

    const dateFormatter = new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'long',
    });

    const dateOptions = dates.map(date => dateFormatter.format(date));

    const dateValueMap = Object.fromEntries(
        dates.map(date => [
            dateFormatter.format(date),
            date.toISOString().split('T')[0]
        ])
    );

    useEffect(() => {
        if (initialSelectedDate) {
            const formatted = dateFormatter.format(new Date(initialSelectedDate));
            setSelectedDates([formatted]);
        }
    }, [initialSelectedDate]);

    useEffect(() => {
        setAucFilters(prev => ({
            ...prev,
            statuses: selectedStatuses.map(element => statusValueMap[element]),
        }));
    }, [selectedStatuses]);

    useEffect(() => {
        setAucFilters(prev => ({
            ...prev,
            myAuctions: selectedTypes.includes("Moje aukcje"),
            followed: selectedTypes.includes("Ulubione"),
        }));
    }, [selectedTypes]);

    useEffect(() => {
        setAucFilters(prev => ({
            ...prev,
            dates: selectedDates.map(element => dateValueMap[element]),
        }));
    }, [selectedDates]);

    useEffect(() => {
        setAucFilters(prev => ({
            ...prev,
            sortBy: sortValueMap[sort] || undefined,
        }));
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [sort]);

    const isAnySelected =
        selectedStatuses.length > 0 ||
        selectedTypes.length > 0 ||
        selectedDates.length > 0;

    const handleClearAll = () => {
        setSelectedStatuses([]);
        setSelectedTypes([]);
        setSelectedDates([]);
        setSort("Domyślne");
    };

    if (loading) return null;

    return (
        <Paper elevation={0} variant={"outlined"} sx={FiltersPaperStyle}>
            <Box sx={FiltersScrollContainerStyle}>
                <Stack spacing={1}>
                    <FiltersHeader showClear={isAnySelected} onClearAll={handleClearAll}
                                   auctionsAmount={auctionsAmount}/>

                    {hasMoreFilters && (
                        <FilterSection
                            title="Status aukcji"
                            icon={<ShieldIcon fontSize="small" sx={{color: '#fbc02d'}}/>}
                            options={statusOptions}
                            selectedOptions={selectedStatuses}
                            setSelectedOptions={setSelectedStatuses}
                        />
                    )}

                    <FilterSection
                        title="Wybrane aukcje"
                        options={selectedOptions}
                        selectedOptions={selectedTypes}
                        setSelectedOptions={setSelectedTypes}
                    />

                    <FilterSection
                        title="Dzień"
                        options={dateOptions}
                        selectedOptions={selectedDates}
                        setSelectedOptions={setSelectedDates}
                    />

                    <SortSection sort={sort} setSort={setSort} options={sortOptions}/>
                </Stack>
            </Box>
        </Paper>
    );
};

export default Filters;