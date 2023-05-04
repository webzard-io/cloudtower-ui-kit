import React from "react";
import {
  useMyQuery,
  UserRole,
  UserRolePreset,
} from "@tower/codegen-component"; /** ../generated/react-hooks */
import { ROLE_ACTION } from "@tower/utils";
import _ from "lodash";

export const useReadOnly = () => {
  const { data, loading, error } = useMyQuery();

  return {
    readOnly:
      !data?.my ||
      data?.my.user.role === UserRole.ReadOnly ||
      (data?.my.user.roles?.length === 1 &&
        data?.my.user.roles[0].preset === UserRolePreset.ReadOnly),
    loading,
    error,
  };
};

/**
 * get all actions of current user
 */
export const useUserActions = () => {
  const { data, loading, error } = useMyQuery();
  let userActions = (data?.my?.user?.roles || []).reduce<ROLE_ACTION[]>(
    (arr, role) => {
      arr = arr.concat(role.actions as ROLE_ACTION[]);
      return arr;
    },
    []
  );
  let setOfUserActions = new Set(userActions);

  // if user has root permission, he will have all permissions
  if (setOfUserActions.has(ROLE_ACTION.ROOT_ACTION)) {
    userActions = Object.values(ROLE_ACTION);
    setOfUserActions = new Set(Object.values(ROLE_ACTION));
  }

  return {
    actions: userActions,
    loading,
    error,
  };
};

type Actions =
  | ROLE_ACTION
  | { oneOf: ROLE_ACTION[] }
  | { allOf: ROLE_ACTION[] };
/**
 * check current user's permissions for required actions
 * @param actions required actions
 */
export const useUserPermissions = (actions: Actions) => {
  const { actions: userActions, loading, error } = useUserActions();
  const setOfUserActions = new Set(userActions);

  // fallback to no permission when no actions are required
  let hasPermission = false;
  if (_.isString(actions)) {
    hasPermission = setOfUserActions.has(actions);
  } else if ("allOf" in actions) {
    hasPermission = actions.allOf.every((action) =>
      setOfUserActions.has(action)
    );
  } else if ("oneOf" in actions) {
    hasPermission = actions.oneOf.some((action) =>
      setOfUserActions.has(action)
    );
  }

  return {
    hasPermission,
    loading,
    error,
  };
};

export const UserPrivilege: React.FC<{
  actions: Actions;
  fallback?: React.ReactNode;
}> = (props) => {
  const { actions, fallback = null } = props;
  const { hasPermission, loading, error } = useUserPermissions(actions);

  if (loading || error || !hasPermission) {
    return <>{fallback}</>;
  }

  if (hasPermission) {
    return <>{props.children}</>;
  }

  return <>{fallback}</>;
};
