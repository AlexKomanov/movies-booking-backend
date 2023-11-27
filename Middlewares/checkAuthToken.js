const jwt = require('jsonwebtoken');

function checkAuthToken(req, res, next) {

    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;

    // auth and refresh tokens are expired -> user is not logged in
    if (!authToken || !refreshToken) {
        return res.status(401).json({ message: 'Authentication failed: Both tokens are expired...', ok: false });
    }

    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        // auth token was expired
        if (err) {

                // check refresh token 
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (refreshErr, refreshDecoded) => {
                    if (refreshErr) {
                        // Both tokens are invalid, send an error message and prompt for login
                        return res.status(401).json({ message: 'Authentication failed: Both tokens are expired', ok: false });
                    }
                    else {
                        // New Tokens and cookies
                        const newAuthToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
                        const newRefreshToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30m' });
                        res.cookie('authToken', newAuthToken, { httpOnly: true, secure: true, sameSite: 'None' });
                        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None' });
    
                        req.userId = refreshDecoded.userId;
                        req.ok = true;
                        next();
                    }
                })
        }

        else {
            req.userId = decoded.userId;
            next();
        }
    })

}

module.exports = checkAuthToken;