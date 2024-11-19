import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Superhero {
  id: string;
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string[];
  catchPhrases: string[];
  images: string[];
}

interface SuperheroesState {
  heroes: Superhero[];
  loading: boolean;
  error: string | null;
}

const initialState: SuperheroesState = {
  heroes: [],
  loading: false,
  error: null
}

export const deleteSuperheroAsync = createAsyncThunk(
  'superheroes/deleteSuperhero',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`http://localhost:3000/superheros/${id}`);
      return id; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete superhero');
    }
  }
);


export const addSuperheroAsync = createAsyncThunk(
  'superheroes/addSuperhero',
  async (superheroData: { 
    nickname: string; 
    realName: string; 
    originDescription: string; 
    superpowers: string; 
    catchphrases: string; 
    images: File[]; 
  }) => {
    const formData = new FormData();
    formData.append('nickname', superheroData.nickname);
    formData.append('realName', superheroData.realName);
    formData.append('originDescription', superheroData.originDescription);
    
    const superpowersArray = superheroData.superpowers.split(',').map(item => item.trim());
    const catchphrasesArray = superheroData.catchphrases.split(',').map(item => item.trim());
    
    formData.append('superpowers', JSON.stringify(superpowersArray)); 
    formData.append('catchphrases', JSON.stringify(catchphrasesArray)); 

    superheroData.images.forEach((file) => {
      formData.append('images', file);
    });

    const response = await axios.post('http://localhost:3000/superheros', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
);



export const fetchSuperheroes = createAsyncThunk(
  'superheroes/fetchSuperheroes', 
  async () => {
    const response = await axios.get('http://localhost:3000/superheros');
    return response.data; 
  }
);

const superheroesSlice = createSlice({
  name: 'superheroes',
  initialState,
  reducers: {
    addSuperhero(state, action: PayloadAction<Superhero>) {
      state.heroes.push(action.payload);
    },
    updateSuperhero(state, action: PayloadAction<Superhero>) {
      const index = state.heroes.findIndex(hero => hero.id === action.payload.id);
      if (index !== -1) {
        state.heroes[index] = action.payload;
      }
    },
    deleteSuperhero(state, action: PayloadAction<string>) {
      state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuperheroes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSuperheroes.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes = action.payload;
      })
      .addCase(fetchSuperheroes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch superheroes';
      })
      .addCase(addSuperheroAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSuperheroAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.heroes.push(action.payload);
      })
      .addCase(addSuperheroAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add superhero';
      })
      .addCase(deleteSuperheroAsync.fulfilled, (state, action) => {
        state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
      })
      .addCase(deleteSuperheroAsync.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  }
});

export const { addSuperhero, updateSuperhero, deleteSuperhero } = superheroesSlice.actions;
export default superheroesSlice.reducer;
