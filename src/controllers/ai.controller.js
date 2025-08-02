const aiService = require("../services/ai.service")

module.exports.getReview = async (req, res, next) => {
    try {
        const { code } = req.body;

        // Input validation
        if (!code || typeof code !== 'string') {
            return res.status(400).json({
                error: "Code is required and must be a string",
                field: "code"
            });
        }

        if (code.trim().length === 0) {
            return res.status(400).json({
                error: "Code cannot be empty",
                field: "code"
            });
        }

        if (code.length > 10000) {
            return res.status(400).json({
                error: "Code is too long. Maximum 10,000 characters allowed",
                field: "code"
            });
        }

        // Call AI service
        const response = await aiService(code);

        // Return successful response
        res.json({
            success: true,
            review: response,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in getReview:', error);
        
        // Pass error to global error handler
        next(error);
    }
}