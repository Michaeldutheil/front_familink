/* eslint-disable @typescript-eslint/naming-convention */

// Importations nécessaires pour le code
import jwtDecode from 'jwt-decode';
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';
import Api from '../../hooks/api';
import { UserState, Alert, UserRefresh } from '../../interface';

// Fonctions d'aide pour le stockage local
const setLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const getLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

// État initial de l'utilisateur
export const initialState: UserState = {
  logged: false,
  pseudo: null,
  role: null,
  email: null,
  family: null,
  familyId: 1,
  firstName: null,
  lastName: null,
  userId: null,
  alert: null,
  loading: false,
  refreshToken: null,
  accessToken: null,
};

// Action asynchrone pour se connecter
export const login = createAsyncThunk(
  'user/login',
  async (formData: FormData) => {
    // Conversion des données du formulaire en objet
    const objData = Object.fromEntries(formData);
    const { data: user } = await Api.axios.post(`user/login`, objData);
    const { refreshToken, accessToken }: any = user.data;

    // Définition du token d'autorisation pour l'API
    Api.setauthorizationToken(user.data.accessToken);

    // Décodage du token d'accès
    let decodedToken: any = jwtDecode(user.data.accessToken);

    const {
      first_name: firstName,
      last_name: lastName,
      email,
      pseudo,
      role,
      familyId: family_id,
      userId: user_id,
    } = decodedToken.data;
    decodedToken = {
      data: {
        firstName,
        lastName,
        email,
        pseudo,
        role,
        familyId: family_id,
        userId: user_id,
      },
    };

    // Définition des valeurs par défaut pour la famille
    let family = 'Demo';
    let familyId = 1;

    // Si l'utilisateur a une famille, obtenir les détails de la famille
    if (decodedToken.data.familyId !== null) {
      const { data: familink } = await Api.axios.get(
        `family/${decodedToken.data.familyId}`
      );
      family = familink.data.results[0].name;
      familyId = familink.data.results[0].id;
    }

    // Stockage des informations de l'utilisateur dans le stockage local
    setLocalStorage('accessToken', accessToken);
    setLocalStorage('refreshToken', refreshToken);
    setLocalStorage('logged', 'true');
    setLocalStorage('firstName', decodedToken.data.firstName);
    setLocalStorage('lastName', decodedToken.data.lastName);
    setLocalStorage('email', decodedToken.data.email);
    setLocalStorage('pseudo', decodedToken.data.pseudo);
    setLocalStorage('role', decodedToken.data.role);
    setLocalStorage('family', family);
    setLocalStorage('familyId', familyId.toString());
    setLocalStorage('userId', decodedToken.data.userId.toString());

    // Renvoie les informations de l'utilisateur
    return {
      user: decodedToken.data as {
        email: string;
        pseudo: string;
        firstName: string;
        lastName: string;
        role: number;
        familyId: number;
        userId: number;
      },
      refreshToken,
      accessToken,
      family,
      familyId,
    };
  }
);

// Action asynchrone pour créer un utilisateur
export const createUser = createAsyncThunk(
  'api/user/signup',
  async (json: any) => {
    try {
      const response = await Api.axios.post(`user/signup`, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message;

        throw new Error(errorMessage);
      }
      throw new Error(
        "Une erreur s'est produite lors de l'ajout de l'utilisateur."
      );
    }
  }
);

// Action asynchrone pour rafraîchir l'utilisateur
export const refreshUser = createAsyncThunk(
  'user/refreshUser',
  async (userId: any) => {
    try {
      const { data: user } = await Api.axios.get(`user/${userId}`);

      const freshUser = user.data.result;
      let family = 'Demo';

      if (freshUser.family_id !== null) {
        const { data: familink } = await Api.axios.get(
          `family/${freshUser.family_id}`
        );
        family = familink.data.results[0].name;
      }
      return {
        user: {
          email: freshUser.email,
          pseudo: freshUser.pseudo,
          firstName: freshUser.first_name,
          lastName: freshUser.last_name,
          role: freshUser.role,
          familyId: freshUser.family_id,
          userId: freshUser.id,
        },
        family,
      };
    } catch (error: any) {
      return error.response.data;
    }
  }
);

// Action asynchrone pour mettre à jour un utilisateur
export const updateUser = createAsyncThunk(
  'user/update',
  async ({ pseudo, first_name, last_name, userId }: any) => {
    try {
      const updateData = {
        pseudo,
        first_name,
        last_name,
      };
      const { data } = await Api.axios.patch(
        `user/${userId}/update`,
        updateData
      );
      return data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetpassword',
  async (jsonData: any) => {
    // Conversion des données du formulaire en objet
    const { data: user } = await Api.axios.post(
      'user/sendresetpassword',
      jsonData
    );
    return user;
  }
);
export const confirmResetPassword = createAsyncThunk(
  'user/confirmresetpassword',
  async (jsonData: any) => {
    const { data: user } = await Api.axios.patch(
      'user/resetpassword',
      jsonData
    );
    return user;
  }
);
// Action pour réinitialiser l'alerte
export const resetAlert = createAction('user/resetAlert');
// Action pour se déconnecter
export const logout = createAction('user/logout');

// Reducer pour gérer l'état de l'utilisateur
const userReducer = createReducer(initialState, (builder) => {
  const persistedRefreshToken = getLocalStorage('refreshToken');
  const persistedAccessToken = getLocalStorage('accessToken');
  const persistedLogged = getLocalStorage('logged');
  const persistedPseudo = getLocalStorage('pseudo');
  const persistedFirstName = getLocalStorage('firstName');
  const persistedLastName = getLocalStorage('lastName');
  const persistedEmail = getLocalStorage('email');
  const persistedFamily = getLocalStorage('family');
  const persistedRole = getLocalStorage('role');
  const persistedFamilyId = getLocalStorage('familyId');
  const persistedUserId = getLocalStorage('userId');

  const isLogged = persistedLogged === 'true';

  initialState.refreshToken = persistedRefreshToken;
  initialState.accessToken = persistedAccessToken;
  initialState.logged = isLogged;
  initialState.pseudo = persistedPseudo;
  initialState.firstName = persistedFirstName;
  initialState.lastName = persistedLastName;
  initialState.email = persistedEmail;
  initialState.family = persistedFamily;
  initialState.role = persistedRole ? Number(persistedRole) : null;
  initialState.familyId = persistedFamilyId ? Number(persistedFamilyId) : null;
  initialState.userId = persistedUserId ? Number(persistedUserId) : null;

  builder

    // Login
    // Si Success
    .addCase(login.fulfilled, (state, action) => {
      const { pseudo, email, role, userId, firstName, lastName } =
        action.payload.user;
      const { family, familyId, refreshToken, accessToken } = action.payload;

      setLocalStorage('accessToken', accessToken);
      setLocalStorage('refreshToken', refreshToken);
      setLocalStorage('logged', 'true');
      setLocalStorage('pseudo', pseudo);
      setLocalStorage('email', email);
      setLocalStorage('firstName', firstName);
      setLocalStorage('lastName', lastName);
      setLocalStorage('role', role.toString());
      setLocalStorage('family', family);
      setLocalStorage('familyId', familyId.toString());
      setLocalStorage('userId', userId.toString());

      state.refreshToken = refreshToken;
      state.accessToken = accessToken;
      state.logged = true;
      state.pseudo = pseudo;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.role = role;
      state.family = family;
      state.familyId = familyId;
      state.userId = userId;

      state.alert = { type: 'success', message: 'Connexion réussie' } as Alert;
    })

    .addCase(resetAlert, (state) => {
      state.alert = null;
    })

    // Si Loading
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.alert = null;
    })

    // Si Error
    .addCase(login.rejected, (state) => {
      state.loading = false;
      state.alert = {
        type: 'error',
        message:
          'Email ou Mot de passe incorrect, Pensez à valider votre email',
      } as Alert;
    })

    // Refresh user
    .addCase(refreshUser.fulfilled, (state, action) => {
      const { pseudo, email, role, userId, familyId, firstName, lastName } =
        action.payload.user as UserRefresh;

      const { family } = action.payload;

      setLocalStorage('pseudo', pseudo);
      setLocalStorage('email', email);
      setLocalStorage('firstName', firstName);
      setLocalStorage('lastName', lastName);
      setLocalStorage('family', family);
      setLocalStorage('familyId', familyId.toString());
      setLocalStorage('userId', userId.toString());

      state.pseudo = pseudo;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.role = role;
      state.family = family;
      state.familyId = familyId;
      state.userId = userId;
    })

    // Update user
    .addCase(updateUser.fulfilled, (state) => {
      state.alert = { type: 'success', message: 'Profil mis à jour' } as Alert;
    })

    .addCase(updateUser.rejected, (state) => {
      state.alert = {
        type: 'error',
        message: 'Problème pendant la modification du profil',
      } as Alert;
    })

    .addCase(resetPassword.fulfilled, (state) => {
      state.alert = { type: 'success', message: 'Email envoyé' } as Alert;
    })
    .addCase(resetPassword.rejected, (state) => {
      state.alert = {
        type: 'error',
        message: 'Email envoyé',
      } as Alert;
    })
    // Logout
    .addCase(logout, (state) => {
      setLocalStorage('logged', 'false');
      removeLocalStorage('accessToken');
      removeLocalStorage('refreshToken');
      removeLocalStorage('pseudo');
      removeLocalStorage('firstName');
      removeLocalStorage('lastName');
      removeLocalStorage('role');
      removeLocalStorage('family');
      removeLocalStorage('familyId');
      removeLocalStorage('userId');

      state.loading = false;
      state.logged = false;
      state.pseudo = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      state.role = null;
      state.family = null;
      state.familyId = 1;
      state.userId = null;
      state.alert = null;
      state.refreshToken = null;
      state.accessToken = null;
    });
});

export default userReducer;
