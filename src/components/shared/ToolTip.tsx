import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

type Props = {
    title: string
    children: any,
    placement?: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined
}
const CustomeTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#092445",
        color: 'rgba(255, 255, 255,)',
        fontSize: 12,
    },
}));
export default function ToolTip({ title, children, placement = "top" }: Props) {
    return (
        <CustomeTooltip slotProps={{
            popper: {
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 0],
                        },
                    },
                ],
            },
        }} title={title} placement={placement}>
            {children}
        </CustomeTooltip>
    )
}