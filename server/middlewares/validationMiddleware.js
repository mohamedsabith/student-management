const validationMiddleware = (schema, property) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property]);

        if (error) {
            return res.status(422).json({
                status: false,
                error: error.details[0].message.replace(/"/g, ''),
            });
        }

        next();
    };
};

export default validationMiddleware;
