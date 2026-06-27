import { useMemo, useState } from "react";

export function useGroupManagement(
  groups: any[]
) {

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const filteredGroups =
    useMemo(() => {

      const search =
        searchTerm
          .trim()
          .toLowerCase();

      if (!search)
        return groups;

      return groups.filter(
        (group: any) => {

          return (

            group.name
              ?.toLowerCase()
              .includes(search)

            ||

            group.coordinator?.full_name
              ?.toLowerCase()
              .includes(search)

          );

        }
      );

    }, [
      groups,
      searchTerm,
    ]);

  return {

    searchTerm,

    setSearchTerm,

    filteredGroups,

  };

}