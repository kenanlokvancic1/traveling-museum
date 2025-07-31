import React from "react";
import { Typography } from "@mui/material";
import {
  ListContainer,
  CardLink,
  NoResultsMessage,
  GridContainer,
  GridItem,
  ListLayout,
} from "./GalleryGrid.styles";
import { handleItemClick, getGridTemplateColumns } from "./galleryGridHelper";

const GalleryGrid = ({
  items,
  layout = "grid",
  renderItem,
  linkPath = "/gallery/",
  noResultsMessage = "No items found matching your criteria.",
  gridProps = { xs: 12, sm: 6, md: 4, lg: 3 },
}) => {
  const gridTemplateColumns = getGridTemplateColumns(gridProps);

  const getItemId = (item) => item.painting_id || item.id;

  if (items.length === 0) {
    return (
      <NoResultsMessage>
        <Typography variant="h6">{noResultsMessage}</Typography>
      </NoResultsMessage>
    );
  }

  return (
    <ListContainer>
      {layout === "grid" ? (
        <GridContainer gridTemplateColumns={gridTemplateColumns}>
          {items.map((item) => (
            <GridItem key={getItemId(item)}>
              {renderItem(item, (card) => (
                <CardLink
                  to={`${linkPath}${getItemId(item)}`}
                  onClick={(e) => handleItemClick(e, getItemId(item))}
                >
                  {card}
                </CardLink>
              ))}
            </GridItem>
          ))}
        </GridContainer>
      ) : (
        <ListLayout>
          {items.map((item) => (
            <CardLink
              to={`${linkPath}${getItemId(item)}`}
              key={getItemId(item)}
              onClick={(e) => handleItemClick(e, getItemId(item))}
            >
              {renderItem(item)}
            </CardLink>
          ))}
        </ListLayout>
      )}
    </ListContainer>
  );
};

export default GalleryGrid;
