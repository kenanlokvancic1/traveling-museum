import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Table,
  TableBody,
TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  Link
} from '@mui/material';
import { 
  StyledTableCell, 
  StyledTableContainer, 
  StyledTableRow 
} from './PaintingsTable.styles';

const PaintingsTable = ({ 
  paintings, 
  onSortFavorites, 
  onSortShares,
  sortOrderFavorites,
  sortOrderShares 
}) => {
  const navigate = useNavigate();

  const handleArtistClick = (artistId) => {
    navigate(`/artists/${artistId}`);
  };

  const handleExhibitionClick = (exhibitionId) => {
    navigate(`/exhibitions/${exhibitionId}`);
  };

  return (
    <StyledTableContainer>
      <Table stickyHeader>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Artist</StyledTableCell>
            <StyledTableCell>Year</StyledTableCell>
            <StyledTableCell>Medium</StyledTableCell>
            <StyledTableCell>Exhibitions</StyledTableCell>
            <StyledTableCell align="right">
              <TableSortLabel
                active={false}  
                direction={sortOrderFavorites}
                onClick={onSortFavorites}
              >
                Favorites
              </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="right">
              <TableSortLabel
                active={false}  
                direction={sortOrderShares}
                onClick={onSortShares}
              >
                Shares
              </TableSortLabel>
            </StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(paintings) && paintings.length > 0 ? (
            paintings.map((painting) => (
              <StyledTableRow key={painting.painting_id}>
                <TableCell>
                  <Link
                    component="button"
                    onClick={() => navigate(`/artworks/${painting.painting_id}`)}
                    sx={{ textDecoration: 'none' }}
                  >
                    {painting.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    component="button"
                    onClick={() => handleArtistClick(painting.artist_id)}
                    sx={{ textDecoration: 'none' }}
                  >
                    {painting.artistName}
                  </Link>
                </TableCell>
                <TableCell>{painting.year}</TableCell>
                <TableCell>{painting.medium}</TableCell>
                <TableCell>
                  {painting.exhibitions && painting.exhibitions.length > 0 
                    ? painting.exhibitions.map((exhibition, index) => (
                        <React.Fragment key={exhibition.exhibition_id}>
                          <Link
                            component="button"
                            onClick={() => handleExhibitionClick(exhibition.exhibition_id)}
                            sx={{ textDecoration: 'none' }}
                          >
                            {exhibition.name}
                          </Link>
                          {index < painting.exhibitions.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))
                    : "Not exhibited"}
                </TableCell>
                <TableCell align="center">{painting.favorites || 0}</TableCell>
                <TableCell align="center">{painting.shares || 0}</TableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={8} align="center">
                No paintings available
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

export default PaintingsTable;
