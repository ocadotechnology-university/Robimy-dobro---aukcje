import React from "react";

export type StatsCardProps = {
    icon: React.ReactNode;
    title?: string;
    value?: number;
    suffix?: string;
    description: string;
    animate?: boolean;
    useCounter?: boolean;
    iconColor?: 'primary' | 'secondary';
    link?: string;
    animationVariant?: 'fade' | 'left' | 'right' | 'zoom';
};