import {
  createAsyncThunk,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit';

import Api from '../../hooks/api';

import { FamilyItem, Alert } from '../../interface';

const initialState: FamilyItem = {
  name: '',
  familyId: 1,
  alertFamily: null,
};

export const createFamily = createAsyncThunk(
  'user/createFamily',
  async (json: unknown) => {
    const { data: family } = await Api.axios.post(`family/add`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (family.status >= 400) {
      throw new Error('Erreur lors de la création de la liste');
    }
    return family.data.result; // Renvoie la nouvelle famille créée
  }
);

export const assignUserToFamily = createAsyncThunk(
  'user/assignUserToFamily',
  async ({ userId, familyId }: any) => {
    const { data } = await Api.axios.patch(
      `user/${userId}/assignto/${familyId}`
    );
    return data;
  }
);

export const updateFamily = createAsyncThunk(
  'user/update',
  async ({ name, familyId }: any) => {
    const updateData = {
      name,
    };
    const { data } = await Api.axios.patch(
      `family/${familyId}/update`,
      updateData
    );
    return data;
  }
);

export const deleteFamily = createAsyncThunk(
  'user.../deleteFamily',
  async (userId: unknown) => {
    const dataToSend = {
      family_id: 1,
    };

    const { data } = await Api.axios.patch(
      `user/${userId}/assignto/1`,
      dataToSend
    );

    return data;
  }
);
const familyReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(
      createFamily.fulfilled,
      (state, action: PayloadAction<{ id: number; name: string }>) => {
        state.name = action.payload.name;
        state.familyId = action.payload.id;
      }
    )
    .addCase(assignUserToFamily.fulfilled, () => {})

    .addCase(deleteFamily.fulfilled, () => {})

    .addCase(updateFamily.fulfilled, (state) => {
      state.alertFamily = {
        type: 'success',
        message: 'Famille mis à jour',
      } as Alert;
    })

    .addCase(updateFamily.rejected, (state) => {
      state.alertFamily = {
        type: 'error',
        message: 'Problème pendant la modification de la famille',
      } as Alert;
    });
});

export default familyReducer;
