import React from "react";
import StatsCard from "./StatsCard";
import AddBoxIcon from '@mui/icons-material/AddBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GavelIcon from '@mui/icons-material/Gavel';
import StatsCardStack from "./StatsCardStack";

const HomePageStats = () => {
    return (
        <StatsCardStack title="Pomaganie jeszcze nigdy nie było tak łatwe!">
            <StatsCard
                icon={<AddBoxIcon fontSize="large"/>}
                title="Wystaw Przedmiot"
                description="Masz coś wartościowego? Podziel się tym! Dodanie aukcji zajmuje tylko chwilę"
            />
            <StatsCard
                icon={<GavelIcon fontSize="large"/>}
                title="Licytuj i Wygrywaj"
                description="Przeglądaj unikalne oferty, podbijaj cenę i zdobądź wymarzone rzeczy"
            />
            <StatsCard
                icon={<FavoriteIcon fontSize="large"/>}
                title="Realnie Pomagaj"
                description="Każda złotówka z wylicytowanych przedmiotów trafia na szczytny cel"
            />
        </StatsCardStack>
    );
};

export default HomePageStats;