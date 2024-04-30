import { configureStore } from '@reduxjs/toolkit';
import evaluationReducer from './slices/propertySlice';

export default configureStore({
  reducer: {
    evaluation: evaluationReducer,
    // Autres reducers de votre application 
  },
});
