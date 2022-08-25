import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import FetchRequest from "../components/jsFunctions/fetchRequest";
import {getData} from "../components/jsFunctions/tableFunction";
import {AppThunk} from "./store";

interface newSliceState {
    data: any[]
}

const initialState: newSliceState = {
    data: []
}

export const newSlice = createSlice({
    name: 'slice',
    initialState: initialState,
    reducers: {
        update: (state: newSliceState, action: PayloadAction<any[]>) => {
            state.data = action.payload
        }
    }
})

export const deleteRecord =
    (entity: string, id: number): AppThunk =>
        (dispatch) => {
            FetchRequest(
                JSON.stringify (
                    {
                        'entityType': entity,
                        'id': id
                    }),
                "POST",
                '/userApiDelete')
                .then(response => response.json())
                .then((data) => {
                    if (data['status']) {
                        getData(entity)
                            .then(
                                (response : any) => {
                                    dispatch(update(response as any[]))
                                }
                            );
                    }
                });
        };


export const { update } = newSlice.actions

export default newSlice.reducer