import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../../hooks/useDebounce";
import { InputChangeEvent } from "../../../models/types";
import { searchText } from "../../../redux/slices/nav/nav.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { PageContent } from "../../../ui_kits/global/PageContent.styles";
import { Form, FormElement, FormSearchInput } from "../../../ui_kits/Form";
import {
  setSearchDrawHidden,
  setSearchText,
} from "../../../redux/slices/nav/nav.slice";

export const SearchForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchValue = useAppSelector(searchText);
  const debouncedSearchTerm = useDebounce<string>(searchValue || "", 1000);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      navigate("/search", {
        state: { name: debouncedSearchTerm },
      });
      dispatch(setSearchDrawHidden(true));
    }
  }, [debouncedSearchTerm, dispatch, navigate]);

  return (
    <PageContent spacingTight>
      <Form>
        <FormElement>
          <FormSearchInput
            label="Search"
            placeholder="Search..."
            value={searchValue || ""}
            onChange={(e: InputChangeEvent) =>
              dispatch(setSearchText(e.target.value))
            }
          />
        </FormElement>
      </Form>
    </PageContent>
  );
};
