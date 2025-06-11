import {useState} from "react";
import {Stack, Box, Typography, Paper, Select, MenuItem, Chip} from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import {AuctionFilters} from "../../services/fetchAuctions";
import {useEffect} from "react";
import {useViewMode} from "../../contexts/ViewModeContext";
import {useAuctionDates} from "../../contexts/AuctionDatesContext";
import * as React from "react";

import {
    FiltersPaperStyle,
    FiltersScrollContainerStyle,
    SectionActionTypographyStyle,
    FilterChipStyle,
    ClearAllTypographyStyle,
    MenuPaperStyle,
    MenuItemStyle,
} from './Filters.styles';
import {useAuth} from "../../hooks/AuthProvider";

interface FiltersProps {
    aucfilters: AuctionFilters;
    setAucFilters: React.Dispatch<React.SetStateAction<AuctionFilters>>;
    auctionsAmount: number;
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

const Filters = ({setAucFilters, auctionsAmount}: FiltersProps) => {
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);
    const [sort, setSort] = useState<string>("Domyślne");
    const {dates, loading} = useAuctionDates();
    const {role} = useAuth();
    const {adminViewMode} = useViewMode();
    const hasMoreFilters = role === "ADMIN" && adminViewMode

    const dateOptions = dates.map(date =>
        `${date.getDate()} ${date.toLocaleString('pl-PL', {month: 'long'})}`
    );

    const dateValueMap = Object.fromEntries(
        dates.map(date => [
            `${date.getDate()} ${date.toLocaleString('pl-PL', {month: 'long'})}`,
            date.toISOString().split('T')[0]
        ])
    );

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

                    <SortSection sort={sort} setSort={setSort}/>
                </Stack>
            </Box>
        </Paper>
    );
};

type FiltersHeaderProps = {
    showClear: boolean;
    onClearAll: () => void;
    auctionsAmount: number;
};

const FiltersHeader = ({showClear, onClearAll, auctionsAmount}: FiltersHeaderProps) => (
    <Stack direction="column" spacing={0.5}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" fontWeight={700}>
                Filtry
            </Typography>
            <Typography color="#a0a0a0">(Aukcje: {auctionsAmount})</Typography>
        </Stack>
        <Typography
            variant="body1"
            sx={(theme) => ({
                ...ClearAllTypographyStyle(theme),
                visibility: showClear ? 'visible' : 'hidden',
            })}
            onClick={onClearAll}
        >
            Odznacz wszystkie
        </Typography>
    </Stack>
);

type FilterSectionProps = {
    title: string;
    icon?: React.ReactNode;
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

const FilterSection: React.FC<FilterSectionProps> = ({
                                                         title,
                                                         icon,
                                                         options,
                                                         selectedOptions,
                                                         setSelectedOptions,
                                                     }) => {
    const toggleOption = (label: string) => {
        setSelectedOptions((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    const hasAnySelected = selectedOptions.length > 0;

    return (
        <Stack spacing={0.5}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1" fontWeight={600}>
                    {title}
                </Typography>
                {icon}
            </Stack>

            <Typography
                onClick={() =>
                    hasAnySelected ? setSelectedOptions([]) : setSelectedOptions(options)
                }
                sx={SectionActionTypographyStyle}
            >
                {hasAnySelected ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}
            </Typography>

            <Stack direction="column" alignItems="flex-start" spacing={1}>
                {options.map((label) => (
                    <Chip
                        key={label}
                        label={label}
                        size="small"
                        variant={selectedOptions.includes(label) ? 'filled' : 'outlined'}
                        onClick={() => toggleOption(label)}
                        clickable
                        sx={FilterChipStyle}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

type SortSectionProps = {
    sort: string;
    setSort: (value: string) => void;
};

const SortSection: React.FC<SortSectionProps> = ({sort, setSort}) => {
    const [open, setOpen] = useState(false);
    return (
        <Stack spacing={0.5}>
            <Typography variant="subtitle1" fontWeight={600}>
                Sortowanie
            </Typography>

            <Select
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                size="small"
                sx={{borderRadius: open ? '8px 8px 0 0' : '8px', fontSize: '0.8rem'}}
                MenuProps={{
                    PaperProps: {sx: MenuPaperStyle},
                    MenuListProps: {sx: {py: 0}},
                    disableScrollLock: true,
                }}
            >
                {sortOptions.map((option) => (
                    <MenuItem key={option} value={option} sx={MenuItemStyle}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </Stack>
    );
};

export default Filters;