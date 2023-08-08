import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import Api from '../../hooks/api';

const initialState = {
  agendas: [] as Array<{
    id: number;
    name: string;
    date: Date;
    starting_time: number;
  }>,
};

export const fetchAgenda = createAsyncThunk(
  'agenda/fetch-agenda',
  async (familyId: number | null) => {
    const { data: agenda } = await Api.axios.get(`event/family/${familyId}`);
    return agenda.data.results;
  }
);

export const postAgenda = createAsyncThunk(
  'agenda/post-agenda',
  async (json: unknown) => {
    const { data: agenda } = await Api.axios.post(`event/add`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newAgenda = agenda.data.result;
    const rename = {
      id: newAgenda.event_id,
      name: newAgenda.event_name,
      date: newAgenda.event_date,
      starting_time: newAgenda.event_starting_time,
    };
    return rename;
  }
);

export const deleteAgenda = createAsyncThunk(
  'agenda/delete-agenda',
  async (agendaId: unknown) => {
    await Api.axios.delete(`event/${agendaId}/delete`);
    return agendaId;
  }
);

export const clearErrorAgenda = createAction('agenda/clear-error');

const agendaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAgenda.fulfilled, (state, action) => {
      state.agendas = action.payload;
    })
    .addCase(postAgenda.fulfilled, (state, action) => {
      const newAgenda = action.payload;

      const rename = {
        id: newAgenda.id,
        name: newAgenda.name,
        date: newAgenda.date,
        starting_time: newAgenda.starting_time,
      };

      const newState = {
        ...state,
        agendas: [...state.agendas, rename],
      };
      return newState;
    })
    .addCase(postAgenda.rejected, (state, action) => {
      state.error = "Nous n'avons pas pu organiser votre rendez-vous";
      console.log(state.error);
    })
    .addCase(deleteAgenda.fulfilled, (state, action) => {
      const deletedAgendaId = action.payload;
      const filteredAgendas = state.agendas.filter(
        (agenda) => agenda.id !== deletedAgendaId
      );
      return {
        ...state,
        agendas: filteredAgendas,
      };
    })
    .addCase(deleteAgenda.rejected, (state, action) => {
      state.error = "Nous n'avons pas pu supprimer votre rendez-vous";
      console.log(state.error);
    })
    .addCase(clearErrorAgenda, (state) => {
      state.error = null;
    });
});

export default agendaReducer;
