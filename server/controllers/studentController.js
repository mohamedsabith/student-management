
export const studentAdd = (req,res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.log(chalk.red(error.message));
        return res.status(404).json({ error: error.message });
    }
}