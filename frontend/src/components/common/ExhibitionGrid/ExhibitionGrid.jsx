import React from "react";
import { Typography } from "@mui/material";
import {
  ListContainer,
  CardLink,
  NoResultsMessage,
  GridContainer,
  GridItem,
  ListLayout,
} from "./ExhibitionGrid.styles";
import {
  handleItemClick,
  getGridTemplateColumns,
} from "./exhibitionGridHelper";

const ExhibitionGrid = ({
  items,
  layout = "grid",
  renderItem,
  linkPath = "/exhibitions/",
  noResultsMessage = "No items found matching your criteria.",
  gridProps = { xs: 12, sm: 6, md: 4 },
}) => {
  const gridTemplateColumns = getGridTemplateColumns(gridProps);

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
            <GridItem key={item.id}>
              <CardLink
                to={`${linkPath}${item.id}`}
                onClick={(e) => handleItemClick(e, item.id)}
              >
                {renderItem(item)}
              </CardLink>
            </GridItem>
          ))}
        </GridContainer>
      ) : (
        <ListLayout>
          {items.map((item) => (
            <CardLink
              to={`${linkPath}${item.id}`}
              key={item.id}
              onClick={(e) => handleItemClick(e, item.id)}
            >
              {renderItem(item)}
            </CardLink>
          ))}
        </ListLayout>
      )}
    </ListContainer>
  );
};

export default ExhibitionGrid;
