export const checkIfAdmin = currentUser => {
    if(!currentUser || !Array.isArray(currentUser.userRole)) {
        return false;
    }
    const { userRole } = currentUser;
    console.log(userRole)
    if(userRole.includes('admin')) {
        return true 
    }
    return false;
}