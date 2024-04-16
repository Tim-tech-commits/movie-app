import React, { useState } from 'react';
import { Container, Grid, TextField, Select, MenuItem, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from '@mui/material';

const BASE_URL = 'https://localhost:44320';  // Change this to your API's actual URL

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genreFilter, setGenreFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async () => {
    try {
      let url = `${BASE_URL}/api/movies`;

      if (genreFilter || searchTerm) {
          url += `?genre=${genreFilter}&title=${searchTerm}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
          throw new Error('Failed to fetch movies');
      }
      
      const data = await response.json();
      setMovies(data);
    } 
    catch (error) {
        console.error('Error fetching movies:', error);
    }
  };

  // here fetching movies based on criteria
  const handleSearch = () => {
    fetchMovies();
  };

  // Trigger search when Enter key is pressed
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();  
    }
  };

  return (
    <Container style={{ marginTop: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField fullWidth label="Search by title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyPress={handleKeyPress} />
        </Grid>
        <Grid item xs={6}>
          <Select fullWidth value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)} displayEmpty inputProps={{ 'aria-label': 'Select genre' }}>
            <MenuItem value="">All Genres</MenuItem>
            <MenuItem value="Crime">Crime</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Action">Action</MenuItem>
          </Select>
        </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSearch}>Search</Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>Title</Typography></TableCell>
                    <TableCell><Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>Year</Typography></TableCell>
                    <TableCell><Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>Director</Typography></TableCell>
                    <TableCell><Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>Genre</Typography></TableCell>
                    <TableCell><Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>Actors</Typography></TableCell>
                    <TableCell><Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>Rating</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {movies.map(movie => (
                    <TableRow key={movie.title}>
                      <TableCell>{movie.title}</TableCell>
                      <TableCell>{movie.year}</TableCell>
                      <TableCell>{movie.director}</TableCell>
                      <TableCell>{movie.genre.join(', ')}</TableCell>
                      <TableCell>{movie.actors.join(', ')}</TableCell>
                      <TableCell>{movie.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
      </Grid>
    </Container>
  );
};

export default App;
