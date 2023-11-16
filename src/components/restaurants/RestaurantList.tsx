import React, { useEffect, useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    ListItem,
    ListItemButton,
    ListItemText,
    MenuItem,
    Paper,
    Select,
} from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import restaurantList from '../../constants/restaurants.json';
import style from './RestaurantList.module.scss';

export type Restaurant = {
    name: string;
    venueType: string;
    cuisineType: string;
    link: string;
};

function renderRow(props: ListChildComponentProps) {
    const { index, style, data } = props;

    return (
        <>
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton href={data[index].link} target="_blank">
                    <ListItemText primary={data[index].name} secondary={data[index].venueType} />
                </ListItemButton>
            </ListItem>
        </>
    );
}

const RestaurantList = () => {
    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurantList.restaurants);
    const [venue, setVenue] = useState('');
    const [cuisine, setCuisine] = useState('');

    const handleVenueChange = (e: any) => {
        setVenue(e.target.value);
    };

    const handleCuisineChange = (e: any) => {
        setCuisine(e.target.value);
    };

    useEffect(() => {
        let filtered = restaurantList.restaurants;
        if (venue) {
            filtered = filtered.filter((obj) => {
                return obj.venueType === venue || obj.venueType === 'Fast Casual / Sit Down';
            });
        }
        if (cuisine) {
            filtered = filtered.filter((obj) => {
                return obj.cuisineType === cuisine;
            });
        }
        setFilteredRestaurants(filtered);
    }, [venue, cuisine]);

    return (
        <div className={style.diningSection}>
            <h4>Casual Dining Options</h4>

            <div className={style.filters}>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="venue-type">Venue Type</InputLabel>
                    <Select value={venue} onChange={handleVenueChange}>
                        <MenuItem value="">
                            <em>Reset</em>
                        </MenuItem>
                        <MenuItem value="Fast Casual">Fast Casual</MenuItem>
                        <MenuItem value="Sit Down">Sit Down</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="cuisine-type">Cuisine Type</InputLabel>
                    <Select value={cuisine} onChange={handleCuisineChange}>
                        <MenuItem value="">
                            <em>Reset</em>
                        </MenuItem>
                        <MenuItem value="Mexican">Mexican</MenuItem>
                        <MenuItem value="Desert">Desert</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                        <MenuItem value="Coffee Shop">Coffee Shop</MenuItem>
                        <MenuItem value="American">American</MenuItem>
                        <MenuItem value="Mediterranean">Mediterranean</MenuItem>
                        <MenuItem value="Japenese">Japenese</MenuItem>
                        <MenuItem value="Seafood">Seafood</MenuItem>
                        <MenuItem value="Southern Cuisine">Southern Cuisine</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <Box sx={{ width: '100%', height: 400, maxWidth: 500, bgcolor: 'background.paper' }}>
                    <Paper elevation={6}>
                        <FixedSizeList
                            height={450}
                            width="100%"
                            itemSize={55}
                            itemCount={filteredRestaurants.length}
                            itemData={filteredRestaurants}
                            overscanCount={5}
                        >
                            {renderRow}
                        </FixedSizeList>
                    </Paper>
                </Box>
            </div>
        </div>
    );
};

export default RestaurantList;
