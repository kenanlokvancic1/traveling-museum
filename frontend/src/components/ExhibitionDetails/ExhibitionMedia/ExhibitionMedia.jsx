import { Box } from "@mui/material";
import { ExhibitionTitle, ExhibitionImage } from "./ExhibitionMedia.styles";

function ExhibitionMedia({ title, imageUrl, imageAlt }) {
  return (
    <Box>
      <ExhibitionTitle variant="h3">{title}</ExhibitionTitle>
      <ExhibitionImage src={imageUrl} alt={imageAlt || title} />
    </Box>
  );
}

export default ExhibitionMedia;
