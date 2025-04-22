export { default as ProfileCard } from './ui/ProfileCard/ProfileCard';

export { profileReducer, profileActions } from './model/slice/profileSlice';

export { fetchProfileData } from './model/services/fetchProfileData/fetchProfileData';

export type { IProfile, IProfileSchema } from './model/types/Profile.types';