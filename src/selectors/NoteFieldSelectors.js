import { createSelector } from 'reselect';
import { getDefaultNoteFields } from 'data/DataNoteFields';
import { getSettings } from 'selectors/SettingSelectors';
import { filterByVisibleState } from 'utils/CategoryUtils';
import { compareStrings } from 'utils/CompareUtils';

export const getNoteFields = state => state.noteFields;

export const getNoteFieldsFilteredByVisibleState = createSelector(
    getNoteFields,
    (noteFields) => {
        return filterByVisibleState(noteFields).sort((a, b) => compareStrings(a.title, b.title));
    }
);

export const getNoteFieldsIncludingDefaults = createSelector(
    getNoteFields,
    getSettings,
    (noteFields, settings) => {
        return getDefaultNoteFields(settings).concat(filterByVisibleState(noteFields)).sort((a, b) => compareStrings(a.title, b.title));
    }
);

export const getVisibleNoteFieldSelector = () => createSelector(
    getNoteFieldsIncludingDefaults,
    (state, id) => id,
    (noteFields, id) => {
        return noteFields.find(noteField => noteField.id === id);
    }
);