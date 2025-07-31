import React from "react";
import { Dialog } from "@mui/material";
import {
    StyledDialogTitle,
    StyledDialogContent,
    ExhibitionButtonWrapper,
    StyledExhibitionButton,
    StyledDialogActions, 
    StyledCancelButton,
} from "./ExhibitionsDialog.styles";

const exhibitions = [
    "Exhibition 1",
    "Exhibition 2",
    "Exhibition 3",
    "Exhibition 4",
    "Exhibition 5",
    "Exhibition 6",
    "Exhibition 7",
    "Exhibition 8",
    "Exhibition 9",
    "Exhibition 10",
];

const ExhibitionDialog = ({ open, onClose, onSelectExhibition }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <StyledDialogTitle>Add Painting to Exhibition</StyledDialogTitle>
            <StyledDialogContent>
                <ExhibitionButtonWrapper>
                    {exhibitions.map((exhibition) => (
                        <StyledExhibitionButton
                            key={exhibition}
                            variant="outlined"
                            fullWidth
                            onClick={() => onSelectExhibition(exhibition)}
                        >
                            {exhibition}
                        </StyledExhibitionButton>
                    ))}
                </ExhibitionButtonWrapper>
            </StyledDialogContent>
            <StyledDialogActions>
                <StyledCancelButton onClick={onClose}>
                    Cancel
                </StyledCancelButton>
            </StyledDialogActions>
        </Dialog>
    );
};

export default ExhibitionDialog;
