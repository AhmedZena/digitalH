import { useTranslation } from "react-i18next";
import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "../button";

export const createSortableHeader = (
  translationKey: string,
  headerName: string,
  sort: string,
  setSort: (sort: string) => void
) => {
  const { t } = useTranslation();
  return () => {
    let sortIcon = <ChevronsUpDown className="h-4 w-4" />;
    if (sort === `${headerName} ASC`) {
      sortIcon = <ChevronUp className="h-4 w-4" />;
    } else if (sort === `${headerName} DESC`) {
      sortIcon = <ChevronDown className="h-4 w-4" />;
    }

    // Function to cycle through sorting states
    const handleSortChange = () => {
      if (sort === `${headerName} ASC`) {
        setSort(`${headerName} DESC`); 
      } else if (sort === `${headerName} DESC`) {
        setSort("");
      } else {
        setSort(`${headerName} ASC`); 
      }
    };

    return (
      <Button
        variant="ghost"
        onClick={handleSortChange}
        icon={sortIcon}
        className="hover:bg-transparent"
      >
        {t(translationKey)}
      </Button>
    );
  };
};
