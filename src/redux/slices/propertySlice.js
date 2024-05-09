import { createSlice } from '@reduxjs/toolkit';

const initialEvaluationState = {
  evaluations: [],
};

const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState: initialEvaluationState,
  reducers: {
    addEvaluation(state, action) {
     
      state.evaluations = [...state.evaluations, action.payload]; 
    
    },
  },
});

export const { addEvaluation } = evaluationSlice.actions;
export default evaluationSlice.reducer;
