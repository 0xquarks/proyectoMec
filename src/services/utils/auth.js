export const isAdminMiddleware = (req, res, next) => {
    const isAdmin = req.cookies.isAdmin === 'true';

    if (isAdmin) {
        return next(); // Es admin, puede pasar
    } else {
        return res.redirect('/login'); 
    }
};
