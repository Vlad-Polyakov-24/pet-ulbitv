import { isOnlyDigits } from '@shared/lib/isOnlyDigits';
import { isValidUrl } from '@shared/lib/isValidUrl';
import { type IProfile, ValidateProfileErrors, ValidateProfileErrorsMap } from '../../types/Profile.types';

export const validateProfileData = (profile?: IProfile): ValidateProfileErrorsMap => {
	if (!profile) return { global: [ValidateProfileErrors.NO_DATA] };

	const { firstname, lastname, username, age, country, city, currency, avatar } = profile;
	const errors: ValidateProfileErrorsMap = {};
	const ageNum = Number(age);

	const pushError = (field: keyof IProfile | 'global', error: ValidateProfileErrors) => {
		if (!errors[field]) {
			errors[field] = [];
		}
		errors[field]!.push(error);
	};

	if (!firstname) pushError('firstname', ValidateProfileErrors.EMPTY_FIELD);
	if (!lastname) pushError('lastname', ValidateProfileErrors.EMPTY_FIELD);
	if (!age) pushError('age', ValidateProfileErrors.EMPTY_FIELD);
	if (!country) pushError('country', ValidateProfileErrors.EMPTY_FIELD);
	if (!currency) pushError('currency', ValidateProfileErrors.EMPTY_FIELD);

	if (isOnlyDigits(firstname)) pushError('firstname', ValidateProfileErrors.INVALID_FIELD);
	if (isOnlyDigits(lastname)) pushError('lastname', ValidateProfileErrors.INVALID_FIELD);
	if (isOnlyDigits(username)) pushError('username', ValidateProfileErrors.INVALID_FIELD);
	if (isOnlyDigits(city)) pushError('city', ValidateProfileErrors.INVALID_FIELD);

	if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
		pushError('age', ValidateProfileErrors.INVALID_AGE);
	}

	if (avatar && !isValidUrl(avatar)) {
		pushError('avatar', ValidateProfileErrors.INVALID_AVATAR);
	}

	return errors;
};