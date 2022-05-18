import { useAuth, withRouter } from "../hooks/index";


const IsAuthorized = props => useAuth(props) && props.children;

export default withRouter(IsAuthorized);