// Importe les outils nécessaires depuis Redux Toolkit
import {
  createAsyncThunk,
  createAction,
  createReducer,
  PayloadAction,
} from '@reduxjs/toolkit';

// Importe notre instance Api axios personnalisée
import Api from '../../hooks/api';

// Importe les interfaces pour les états de la liste et des éléments de la liste
import { ListState, ListItem } from '../../interface';

// Initialise l'état de la liste
export const initialState: ListState = {
  list: [],
  alert: null,
  task: [],
  category: [],
};

// Crée une thunk asynchrone pour récupérer les listes d'une famille en particulier
export const fetchLists = createAsyncThunk(
  'lists/fetch-lists',
  async (familyId: number | null) => {
    const { data: lists } = await Api.axios.get(`list/family/${familyId}`);
    return lists.data.results;
  }
);

// Crée une thunk asynchrone pour ajouter une nouvelle liste
export const postLists = createAsyncThunk(
  'lists/post-lists',
  async (json: unknown) => {
    const { data: lists } = await Api.axios.post(`list/add`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const newList = lists.data.result;

    return newList;
  }
);

// Crée une thunk asynchrone pour supprimer une liste
export const deleteList = createAsyncThunk(
  'lists/delete',
  async (listId: any) => {
    await Api.axios.delete(`list/${listId}/delete`);
    return listId;
  }
);

// Crée une thunk asynchrone pour supprimer une tâche
export const deleteTask = createAsyncThunk(
  'task/delete',
  async ({ taskId, listId }: any) => {
    await Api.axios.delete(`task/${taskId}/delete`);
    return { taskId, listId };
  }
);

// Crée une thunk asynchrone pour ajouter une nouvelle tâche à une liste
export const addTask = createAsyncThunk(
  'lists/add-task',
  async (json: unknown) => {
    const { data: tasks } = await Api.axios.post(`task/add `, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newTask = tasks.data.result;

    return newTask;
  }
);

// Crée une thunk asynchrone pour modifier l'état d'une tâche
export const updateTask = createAsyncThunk(
  'task/update',
  async ({ taskId, value, listId }: any) => {
    const updateData = {
      state: value,
    };
    await Api.axios.patch(`task/${taskId}/update`, updateData);
    return { taskId, value, listId };
  }
);

// Crée une thunk asynchrone pour récupérer toutes les catégories
export const allCategory = createAsyncThunk('category/all', async () => {
  const { data: category } = await Api.axios.get('category/all');
  return category.data.results;
});

// Crée une action pour réinitialiser l'état lors de la déconnexion de l'utilisateur
export const logoutList = createAction('user/logout');

// Crée un réducteur pour gérer les différentes actions et mettre à jour l'état en conséquence
const listReducer = createReducer(initialState, (builder) => {
  builder
    // Met à jour l'état de la liste lorsque fetchLists est résolu avec succès
    .addCase(
      fetchLists.fulfilled,
      (state: ListState, action: PayloadAction<ListItem[]>) => {
        state.list = action.payload;
      }
    )
    // Ajoute une nouvelle liste à l'état lorsque postLists est résolu avec succès
    .addCase(
      postLists.fulfilled,
      (state: ListState, action: PayloadAction<ListItem>) => {
        state.list.push({
          list_id: action.payload.list_id,
          list_title: action.payload.list_title,
          list_user_id: action.payload.user_id,
          category_id: action.payload.category_id,
          user_id: action.payload.user_id,
          task: [],
        });
      }
    )
    // Met à jour l'état de la catégorie lorsque allCategory est résolu avec succès
    .addCase(allCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    })

    // Met à jour l'état de l'alerte lorsque allCategory échoue
    .addCase(allCategory.rejected, (state) => {
      state.alert = {
        type: 'error',
        message: 'Problème lors de la récupération des catégories',
      };
    })

    // Ajoute une nouvelle tâche à la liste correspondante lorsque addTask est résolu avec succès
    .addCase(addTask.fulfilled, (state, action) => {
      const listIndex = state.list.findIndex(
        (list) => list.list_id === action.payload.list_id
      );

      if (listIndex !== -1) {
        state.list[listIndex].task.push({
          task_id: action.payload.task_id,
          task_content: action.payload.task_content,
          task_state: action.payload.state === 'false',
          task_user_id: action.payload.user_id,
        });
      }
    })

    // Supprime une liste de l'état lorsque deleteList est résolu avec succès
    .addCase(deleteList.fulfilled, (state, action) => {
      const listIndex = state.list.findIndex(
        (list) => list.list_id === action.payload
      );
      if (listIndex !== -1) {
        state.list.splice(listIndex, 1);
      }
      state.alert = { type: 'success', message: 'Liste supprimée avec succès' };
    })

    // Met à jour l'état de l'alerte lorsque deleteList échoue
    .addCase(deleteList.rejected, (state) => {
      state.alert = {
        type: 'error',
        message: "Problème suppression d'une liste",
      };
    })

    // Supprime une tâche d'une liste de l'état lorsque deleteTask est résolu avec succès
    .addCase(deleteTask.fulfilled, (state, action) => {
      const { taskId, listId } = action.payload;

      const listIndex = state.list.findIndex((list) => list.list_id === listId);
      if (listIndex !== -1) {
        const taskIndex = state.list[listIndex].task.findIndex(
          (task) => task.task_id === taskId
        );
        if (taskIndex !== -1) {
          state.list[listIndex].task.splice(taskIndex, 1);
        }
      }
      state.alert = { type: 'success', message: 'Tâche supprimée avec succès' };
    })

    // Met à jour l'état de l'alerte lorsque deleteTask échoue
    .addCase(deleteTask.rejected, (state) => {
      state.alert = {
        type: 'error',
        message: "Problème suppression d'une tâche",
      };
    })

    // Met à jour l'état d'une tâche lorsque updateTask est résolu avec succès
    .addCase(updateTask.fulfilled, (state, action) => {
      const { taskId, value } = action.payload;

      const listIndex = state.list.findIndex(
        (list) => list.task.findIndex((task) => task.task_id === taskId) !== -1
      );

      if (listIndex !== -1) {
        const taskIndex = state.list[listIndex].task.findIndex(
          (task) => task.task_id === taskId
        );
        if (taskIndex !== -1) {
          state.list[listIndex].task[taskIndex].task_state = value;
        }
      }
      state.alert = {
        type: 'success',
        message: 'Modification de la tâche réussie',
      };
    })
    // Met à jour l'état de l'alerte lorsque updateTask échoue
    .addCase(updateTask.rejected, (state) => {
      state.alert = {
        type: 'error',
        message: "Problème modification d'une tache",
      };
    })
    // Réinitialise l'état de la liste et des tâches lorsque l'utilisateur se déconnecte
    .addCase(logoutList, (state) => {
      state.list = [];
      state.list.forEach((item) => {
        item.task = [];
      });
    });
});

// Exporte le réducteur par défaut
export default listReducer;
