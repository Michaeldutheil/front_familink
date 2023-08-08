import {
  createAction,
  createAsyncThunk,
  createReducer,
} from '@reduxjs/toolkit';

import Api from '../../hooks/api';

import { PictureState, CommentState } from '../../interface';

export const initialState: {
  pictures: PictureState[];
  comments: CommentState[];
} = {
  pictures: [],
  comments: [],
};

export const fetchPictures = createAsyncThunk(
  'pictures/fetch-pictures',
  async (familyId: number | null) => {
    const { data: pictures } = await Api.axios.get(
      `picture/family/${familyId}`
    );

    return pictures.data.results;
  }
);

export const postPictures = createAsyncThunk(
  'pictures/post-pictures',
  async (formData: unknown) => {
    const { data: pictures } = await Api.axios.post(`picture/add`, formData, {
      headers: {
        'Content-Type': 'mutlipart/form-data',
      },
    });
    const newPicture = pictures.data.result;
    return newPicture;
  }
);

export const deletePicture = createAsyncThunk(
  'pictures/delete-picture',
  async (pictureId: number) => {
    await Api.axios.delete(`picture/${pictureId}/delete`);
    return { pictureId };
  }
);

export const fetchComments = createAsyncThunk(
  'comments/fetch-comments',
  async (familyId: number | null) => {
    const { data: comments } = await Api.axios.get(
      `comment/family/${familyId}`
    );

    return comments.data.results;
  }
);

export const postComments = createAsyncThunk(
  'comments/post-comments',
  async (json: unknown) => {
    const { data: comments } = await Api.axios.post(`comment/add`, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newComment = comments.data.result;
    return newComment;
  }
);

export const deleteComments = createAsyncThunk(
  'comments/delete-comment',
  async ({
    pictureId,
    commentId,
  }: {
    pictureId: number;
    commentId: string;
  }) => {
    await Api.axios.delete(`comment/${commentId}/delete`);
    return { pictureId, commentId };
  }
);

export const clearErrorPictures = createAction('pictures/clear-error-picture');

export const logoutPicture = createAction('/user/logout');

const pictureReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchPictures.fulfilled, (state, action) => {
      state.pictures = action.payload;
    })
    .addCase(postPictures.fulfilled, (state, action) => {
      const newPicture = action.payload;
      const newState = {
        ...state,
        pictures: [...state.pictures, newPicture],
      };
      return newState;
    })
    .addCase(postPictures.rejected, (state, action) => {
      state.error = "Nous n'avons pas pu envoyer votre photo";
      console.log(state.error);
    })
    .addCase(deletePicture.fulfilled, (state, action) => {
      const pictureIdToDelete = action.payload.pictureId;
      state.pictures = state.pictures.filter(
        (picture) => picture.picture_id !== pictureIdToDelete
      );
    })
    .addCase(deletePicture.rejected, (state, action) => {
      state.error = "Nous n'avons pas pu supprimer votre photo";
      console.log(state.error);
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(postComments.fulfilled, (state, action) => {
      const pictureIndex = state.pictures.findIndex(
        (picture) => picture.picture_id === action.payload.picture_id
      );

      if (pictureIndex !== -1) {
        if (!state.pictures[pictureIndex].comments) {
          state.pictures[pictureIndex].comments = [];
        }

        state.pictures[pictureIndex].comments?.push(action.payload);
      }
    })
    .addCase(postComments.rejected, (state, action) => {
      state.error = "Nous n'avons pas pu envoyer votre commentaire";
      console.log(state.error);
    })
    .addCase(deleteComments.fulfilled, (state, action) => {
      const { pictureId, commentId } = action.payload;
      const pictureIndex = state.pictures.findIndex(
        (picture) => picture.picture_id === pictureId
      );

      if (pictureIndex !== -1 && state.pictures[pictureIndex].comments) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.pictures[pictureIndex].comments = state.pictures[
          pictureIndex
        ].comments!.filter((comment) => comment.comment_id !== commentId);
      }
    })
    .addCase(deleteComments.rejected, (state, action) => {
      state.error = "Nous n'avons pas pu supprimer votre commentaire";
      console.log(state.error);
    })
    .addCase(clearErrorPictures, (state) => {
      state.error = null;
    })
    .addCase(logoutPicture, (state) => {
      state.pictures = [];
    });
});

export default pictureReducer;
