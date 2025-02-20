import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
    DialogTrigger,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {
    name: string; // Label for the button that triggers the dialog
    title?: string; // Optional title for the dialog header
    children: (closeDialog: () => void) => React.ReactNode; // Function to render children with a closeDialog function
    triggerClassName?: string; // Custom class for the trigger button
    overlayClassName?: string; // Custom class for the overlay
    contentClassName?: string; // Custom class for the content
    headerClassName?: string; // Custom class for the header
    size?: string; // Width of the dialog content
    buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>; // Additional button props
    dialogProps?: React.ComponentProps<typeof Dialog>; // Additional dialog props
};

export default function ReusableDialog({
    name,
    title,
    children,
    triggerClassName = "",
    overlayClassName = "bg-black/10",
    contentClassName = "",
    headerClassName = "",
    size = "w-[360px]",
    buttonProps,
    dialogProps,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const closeDialog = () => setIsOpen(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} {...dialogProps}>
            <DialogTrigger asChild>
                <Button
                    className={`bg-primary-500 flex rounded-lg hover:bg-primary-600 transition-all duration-200 text-white h-9 px-5 items-center ${triggerClassName}`}
                    {...buttonProps}
                >
                    {name}
                </Button>
            </DialogTrigger>
            <DialogOverlay className={overlayClassName} />
            <DialogContent className={`rounded-xl p-0 gap-0 ${size} ${contentClassName}`}>
                <DialogHeader>
                    <DialogTitle>
                        <div className={`py-5 px-6 border-b text-xl text-[#3a3a3a] border-primary-50 ${headerClassName}`}>
                            {title}
                        </div>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {children(closeDialog)}
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
