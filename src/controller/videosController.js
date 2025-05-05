const videosController = {
    getVideos: (req, res) => {
        res.send("getVideos")
    },
    getWatch: (req, res) => {
        const { id } = req.params;
        if (isNaN(id)) {
            return res.status(400).send("Invalid video ID");
        }
        res.send(`getWatch ${id}`)
    },
    getSearch: (req, res) => {
        const { keyword } = req.query;
        res.send(`getSearch ${keyword}`)
    },
    postUpload: (req, res) => {
        res.send("postUpload")
    },
    postEdit: (req, res) => {
        const { id } = req.params;
        res.send(`postEdit ${id}`)
    },
    postDelete: (req, res) => {
        const { id } = req.params;
        res.send(`postDelete ${id}`)
    },
    postComments: (req, res) => {
        const { id } = req.params;
        res.send(`postComments ${id}`)
    },
    postCommentsDelete: (req, res) => {
        const { id } = req.params;
        res.send(`postCommentsDelete ${id}`)
    }

}

export default videosController;