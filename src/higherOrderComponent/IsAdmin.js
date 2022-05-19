import { useAdmin } from './../hooks/index';

const IsAdmin = props => useAdmin(props) && props.children;

export default IsAdmin;
