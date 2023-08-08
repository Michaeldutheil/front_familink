import {
  Dispatch,
  SetStateAction,
  ReactFragment,
  ReactPortal,
  ReactNode,
} from 'react';

// Interfaces pour les différentes modales

export interface ModalSignUpProps {
  setOpenSignUpModal: (value: boolean) => void;
  openSignUpModal: boolean;
  setAlertMessageAccueil: (value: boolean) => void;
  setOpenLoginModal: (value: boolean) => void;
  openLoginModal: boolean;
}

export interface ModalSignUpPropsParent {
  setOpenSignUpModalParent: (value: boolean) => void;
  openSignUpModalParent: boolean;
}

export interface ModalWarningFamilyProps {
  setOpenModalWarningFamily: (value: boolean) => void;
  openModalWarningFamily: boolean;
  setEmail: (value: string) => void;
  setPseudo: (value: string) => void;
  email: string;
  pseudo: string;
  personne: string;
}

export interface ModalDeleteFamilyProps {
  setOpenModalDeleteFamily: (value: boolean) => void;
  openModalDeleteFamily: boolean;
  handleDelete: () => void;
}

export interface ModalSignUpPropsEnfant {
  setOpenSignUpModalEnfant: (value: boolean) => void;
  openSignUpModalEnfant: boolean;
}

export interface ModalResetPasswordProps {
  setOpenModalResetPassword: (value: boolean) => void;
  openModalResetPassword: boolean;
}

export interface ModalLoginProps {
  setOpenLoginModal: (value: boolean) => void;
  openLoginModal: boolean;
  setOpenSignUpModal: (value: boolean) => void;
  openSignUpModal: boolean;
  setOpenModalResetPassword: (value: boolean) => void;
  openModalResetPassword: boolean;
}

export interface ModalDeleteListProps {
  setOpenDeleteModalList: (value: boolean) => void;
  openDeleteModalList: boolean;
  listId: number | null;
}

export interface ModalDeleteTaskProps {
  setOpenDeleteModalTask: (value: boolean) => void;
  openDeleteModalTask: boolean;
  listId: number | null;
  taskId: number | null;
}

export interface ModalListProps {
  setOpenListModal: Dispatch<SetStateAction<boolean>>;
  openListModal: boolean;
}

export interface ModalUserProps {
  setOpenUserModal: Dispatch<SetStateAction<boolean>>;
  openUserModal: boolean;
}

export interface ModalFamilyProps {
  setOpenFamilyModal: Dispatch<SetStateAction<boolean>>;
  openFamilyModal: boolean;
}

export interface ModalTaskProps {
  setOpenTaskModal: (value: boolean) => void;
  openTaskModal: boolean;
  listId: number | null;
}

// Interfaces pour les listes et tâches

export interface ListObject {
  id: number;
  title: string;
  category: string;
  tasks: string[];
}

export interface TaskObject {
  id: number;
  newTask: string;
}

// État utilisateur

export interface UserState {
  logged: boolean;
  pseudo: string | null;
  role: number | null;
  email: string | null;
  family: string | null;
  firstName: string | null;
  lastName: string | null;
  familyId: number | null;
  userId: number | null;
  alert: Alert | null;
  loading: boolean;
  refreshToken: string | null;
  accessToken: string | null;
}

// Interface pour toutes les listes

export interface AllLists {
  list_id: null | undefined;
  category_id: number;
  list_title:
    | string
    | number
    | boolean
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
  task: any[]; // Remplacez "any" par le type approprié
}

// Interface pour un élément de liste

export interface ListItem {
  list_id: number;
  list_title: string;
  user_id: number;
  category_id: number;
  list_user_id: number;
  task: any[]; // Remplacez "any" par le type approprié
}

// État des listes

export interface ListState {
  list: ListItem[];
  task: any[]; // Remplacez "any" par le type approprié
  alert: Alert | null;
  category: CategoryItem[]; // Remplacez CategoryItem par le type approprié
}

// État des catégories

export interface CategoryItem {
  id: number;
  name: string;
}

// État des images

export interface PictureState {
  picture_url: string;
  picture_title: ReactNode;
  picture_id: number;
  comments: Comment[] | null;
  pictures: Picture[];
}

// Props pour les images

export interface PicturesProps {
  picture_id: string;
  picture_title: string;
  picture_url: string;
  comments: Comment[];
}

// État des commentaires

export interface CommentState {
  comments: Comment[];
}

// Props pour les commentaires

export interface CommentProps {
  comment_id: string;
  comment_content: string;
  author: string;
}

// Interface pour une image

export interface Picture {
  picture_title: ReactNode;
  picture_id: number;
  picture_url: string;
  comments: Comment[] | null;
}

// Interface pour un commentaire

export interface Comment {
  comment_id: string;
  comment_content: string;
}

// Données de création d'une image

export interface PicturePostData {
  title: string;
  url: string;
  user_id: number;
}

// Données de création d'un commentaire

export interface CommentPostData {
  picture_id: number;
  content: string;
  user_id: number;
}

// État d'une famille

export interface FamilyItem {
  name: string;
  familyId: number;
  alertFamily: Alert | null;
}

// Interface pour une alerte

export interface Alert {
  type: 'success' | 'error' | 'warning' | 'loading' | '' | 'idk';
  message: string;
  status: 'error';
}

// Actualisation utilisateur

export interface UserRefresh {
  pseudo: string;
  email: string;
  role: number;
  userId: number;
  familyId: number;
  firstName: string;
  lastName: string;
}
