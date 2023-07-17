import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import classes from './DropDown.module.scss';
import { useLocation, useNavigate } from "react-router-dom";

export const DropDown = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const prevPerPage = +(searchParams.get('per_page') || 6);
  const menuList = ['6', '10', '25', '50'];

  const handleChangePer = (perPage: string) => {
    searchParams.set('per_page', perPage);
    navigate({ search: searchParams.toString() });
  };

  return (
    <DropdownButton variant="secondary" className={classes.dropdown} title={prevPerPage.toString()}>
      {menuList.map(perElem => (
        <DropdownItem key={perElem} onClick={() => handleChangePer(perElem)}>
          {perElem}
        </DropdownItem>
      ))}
    </DropdownButton>
  );
};
