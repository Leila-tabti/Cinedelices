import jsonwebtoken from 'jsonwebtoken';

// Middleware function for JWT authentication
export const cookiejwtAuth = (req, res, next) => {
    console.log('Middleware d\'authentification atteint'); // Log when the middleware is reached
    const token = req.cookies.token;// Retrieve the JWT from cookies

    if(!token) {
        return res.status(401).json({message: "Accès refusé. Utilisateur non authentifié"});
    }
    
    try {
        // Verify the JWT using the secret key
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('Authentificationn verifié');
        next();
    } catch (error) {
        console.error("Erreur de validation du token JWT:", error);
        return res.status(401).json({message: "token invalide"});
    
    };

}

