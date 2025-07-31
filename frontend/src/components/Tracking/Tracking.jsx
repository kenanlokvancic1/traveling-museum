import React, { useState, useEffect } from "react";
import {
  PageContainer,
  ContentContainer,
  FilterWrapper,
  FilterButton,
  Table,
  TableRow,
  TableCell,
  StatusBadge,
  ViewButton
} from "./Tracking.styles";
import TrackingDialog from "./TrackingDialog/TrackingDialog";
import { getAllExhibitions } from "../../api/ExhibitionApi"; 

const Tracking = () => {
  const [filter, setFilter] = useState("all");
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const data = await getAllExhibitions();
        setExhibitions(data);
      } catch (error) {
        console.error("Error fetching exhibitions:", error);
      }
    };

    fetchExhibitions();
  }, []);

  const filtered = filter === "all" ? exhibitions : exhibitions.filter(item => item.status === filter);

  const handleOpenDialog = (exhibition) => {
    setSelectedExhibition(exhibition);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedExhibition(null);
  };

  return (
    <PageContainer>
      <ContentContainer>
        <FilterWrapper>
          <FilterButton onClick={() => setFilter("all")} active={filter === "all"}>All</FilterButton>
          <FilterButton onClick={() => setFilter("in transport")} active={filter === "in transport"}>In Transport</FilterButton>
          <FilterButton onClick={() => setFilter("in warehouse")} active={filter === "in warehouse"}>In Warehouse</FilterButton>
          <FilterButton onClick={() => setFilter("delivered")} active={filter === "delivered"}>Delivered</FilterButton>
        </FilterWrapper>

        <Table>
          {filtered.map(item => (
            <TableRow key={item.exhibition_id}>
            <TableCell>{item.name}</TableCell>
              <TableCell>
                <StatusBadge status={item.status}>{item.status}</StatusBadge>
              </TableCell>
              <TableCell>
                <ViewButton onClick={() => handleOpenDialog(item)}>View Details</ViewButton>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </ContentContainer>

      <TrackingDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        exhibition={selectedExhibition}
      />
    </PageContainer>
  );
};

export default Tracking;
