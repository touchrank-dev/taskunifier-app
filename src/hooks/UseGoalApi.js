import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, deleteGoal, duplicateGoal, updateGoal } from 'actions/GoalActions';
import { getGoalsFilteredByNonArchived, getGoalsFilteredByVisibleState } from 'selectors/GoalSelectors';

export function useGoalApi() {
    const dispatch = useDispatch();
    const goals = useSelector(getGoalsFilteredByVisibleState);
    const nonArchivedGoals = useSelector(getGoalsFilteredByNonArchived);

    const addGoalCallback = useCallback(
        goal => dispatch(addGoal(goal)),
        [dispatch]
    );

    const duplicateGoalCallback = useCallback(
        goal => dispatch(duplicateGoal(goal)),
        [dispatch]
    );

    const updateGoalCallback = useCallback(
        goal => dispatch(updateGoal(goal)),
        [dispatch]
    );

    const deleteGoalCallback = useCallback(
        goalId => dispatch(deleteGoal(goalId)),
        [dispatch]
    );

    return {
        goals,
        nonArchivedGoals,
        addGoal: addGoalCallback,
        duplicateGoal: duplicateGoalCallback,
        updateGoal: updateGoalCallback,
        deleteGoal: deleteGoalCallback
    };
}