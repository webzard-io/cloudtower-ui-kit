import { ROLE_ACTION } from "@tower/utils";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";

export type Actions =
  | ROLE_ACTION
  | { oneOf: ROLE_ACTION[] }
  | { allOf: ROLE_ACTION[] };

export const UserPrivilege: React.FC<{
  fallback?: React.ReactNode;
}> = (props) => {
  const { fallback = null } = props;
  const { hasPermission, loading, error } = useUserPermissions();

  if (loading || error || !hasPermission) {
    return <>{fallback}</>;
  }

  if (hasPermission) {
    return <>{props.children}</>;
  }

  return <>{fallback}</>;
};

export default UserPrivilege;

const userPrivilegeContext = createContext<{
  hasPermission: boolean;
  loading: boolean;
  error: Error;
} | null>(null);

const useUserPermissions = () => {
  const data = useContext(userPrivilegeContext);
  if (data == null) {
    throw new Error("UserPrivilege need wrap by UserPrivilegeProvider");
  }
  return data;
};

export const UserPrivilegeProvider = (
  props: PropsWithChildren<{
    hasPermission: boolean;
    loading: boolean;
    error: Error;
  }>
) => {
  const { children, hasPermission, loading, error } = props;

  const value = useMemo(
    () => ({
      hasPermission,
      loading,
      error,
    }),
    [error, hasPermission, loading]
  );

  return (
    <userPrivilegeContext.Provider value={value}>
      {children}
    </userPrivilegeContext.Provider>
  );
};
